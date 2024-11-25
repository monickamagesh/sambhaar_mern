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
          name: item.name,
          category: item.category,
          subcategory: item.subcategory,
          brand: item.brand,
          price: item.price,
          weight: item.weight,
          image: item.image,
        })),
        amount: GrandTotal,
        email: user.email,
        orderStatus: "Ordered",
        paymentMethod: "Phonepe",
        paymentStatus: "Pending",
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
      userId: user._id ,
      orderId: transaction,
      products: products.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        name: item.name,
        category: item.category,
        subcategory: item.subcategory,
        brand: item.brand,
        price: item.price,
        weight: item.weight,
        image: item.image,
      })),
      amount: GrandTotal,
      email: user.email,
      orderStatus: "Ordered",
      paymentMethod: "Cash",
      paymentStatus: "Pending", // Will change once the order is delivered
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
        { orderStatus: "Ordered", paymentStatus: "Success" }
      );
      return res.redirect(`http://localhost:5173/order-success/?id=${merchantTransactionId}`);
    } else {
      await Order.findOneAndUpdate(
        { orderId: merchantTransactionId },
        { orderStatus: "Ordered", paymentStatus: "Pending" }
      );
      return res.redirect("http://localhost:5173/failure");
    }
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

//get order by email address
router.get("/:email", async(req, res) => {
  const email = req.params.email;
  if(!email){
    return res.status(400).send({message: "Email is required"});
  }

  try {
    const orders = await Order.find({email: email});
    if(orders.length === 0 || !orders){
      return res.status(400).send({orders:0, message: "No order found for this email"});
    }
    res.status(200).send({orders});
  } catch (error) {
    console.log("Error fetching orders by email", error);
    res.status(500).send({message: "Failed to fetching orders by email"});
  }
})

// get order by id
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send(order);
  } catch (error) {
    console.error("Error fetching orders by user id", error);
    res.status(500).send({ message: "Failed to fetch orders by user id" });
  }
});

// get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).send({ message: "No orders found", orders: [] });
    }

    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).send({ message: "Failed to fetch all orders" });
  }
});

// update order status
router.patch("/update-order-status/:id", async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;
  if (!orderStatus) {
    return res.status(400).send({ message: "orderStatus is required" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if(!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder
    })

  } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).send({ message: "Failed to update order status" });
  }
});

// delete order
router.delete('/delete-order/:id', async( req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder
    })
    
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(500).send({ message: "Failed to delete order" });
  }
} )

module.exports = router;