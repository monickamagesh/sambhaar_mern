const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const axios = require("axios");
const Order = require("./orders.model"); // Ensure you have the updated Order model

const merchant_id = process.env.MERCHANT_ID;
const salt_key = process.env.SALT_KEY;

// Create PhonePe checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    let { user, MUID, GrandTotal, products, selectedItems, transaction } =
      req.body;

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transaction,
      userId: user._id,
      product: products,
      selectedItems: selectedItems,
      amount: GrandTotal * 100,
      redirectUrl: `http://localhost:5000/api/orders/status?id=${transaction}`,
      redirectMode: "POST",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");

    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + 1;

    const options = {
      method: "POST",
      url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-VERIFY": checksum,
      },
      data: { request: payloadMain },
    };

    const phonePeResponse = await axios(options);

    // Check if payment initiation was successful
    if (phonePeResponse.data.success) {
      const newOrder = new Order({
        userId: user._id,
        orderId: transaction,
        products: products.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        amount: GrandTotal,
        email: user.email,
        orderStatus: "Pending",
        paymentMethod: "phonepe",
        paymentStatus: "pending",
      });

      await newOrder.save();

      res.json({
        message: "Payment initiated successfully",
        data: {
          instrumentResponse:
            phonePeResponse.data.data.instrumentResponse || {},
        },
      });
    } else {
      res.status(400).json({ error: "Payment initiation failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Route for Cash on Delivery order
router.post("/create-cod-order", async (req, res) => {
  try {
    const { user, MUID, GrandTotal, products, selectedItems, transaction } =
      req.body;


    const newOrder = new Order({
      userId: user._id,
      orderId: transaction,
      products: products.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      amount: GrandTotal,
      email: user.email,
      orderStatus: "Ordered",
      paymentMethod: "cod",
      paymentStatus: "pending", // Will change once the order is delivered
    });

    await newOrder.save();

    // Send a response with the success status and a custom URL for frontend redirection
    return res.json({
      message: "COD Order placed successfully",
      redirectUrl: `http://localhost:5173/order-success?id=${transaction}`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Route to handle PhonePe payment status callback
router.post("/status", async (req, res) => {
  try {
    const merchantTransactionId = req.query.id;
    const merchantId = merchant_id;

    const keyIndex = 1;
    const string =
      `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    };

    const response = await axios(options);
    const isPaymentSuccessful = response.data.success;

    if (isPaymentSuccessful) {
      await Order.findOneAndUpdate(
        { orderId: merchantTransactionId },
        { orderStatus: "Ordered", paymentStatus: "success" }
      );
      return res.redirect(`http://localhost:5173/order-success/?id=${merchantTransactionId}`);
    } else {
      await Order.findOneAndUpdate(
        { orderId: merchantTransactionId },
        { orderStatus: "Ordered", paymentStatus: "pending" }
      );
      return res.redirect("http://localhost:5173/failure");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/ordered-products/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Order success endpoint to fetch order by orderId
router.get("/order-success/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    if (order) {
      res.json({ order });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
