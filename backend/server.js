const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const axios = require("axios");
const Order = require("./src/orders/orders.model"); // Adjust path as needed

const port = process.env.PORT || 4000;
const merchant_id = process.env.MERCHANT_ID;
const salt_key = process.env.SALT_KEY;

//middleware setup
app.use(express.json({ limit: "25mb" }));
//app.use((express.urlencoded({limit: "25mb"})));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://sambhaar.com",
    credentials: true,
  })
);

// image upload
const uploadImage = require("./src/utils/uploadImage"); 

// all routes
const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");
const orderRoutes = require("./src/orders/orders.route");
const statsRoutes = require('./src/stats/stats.route');
const reviewRoutes = require('./src/reviews/reviews.router');
const categoryRoutes = require('./src/category/categories.route');
const milkRoutes = require('./src/milkOptions/milks.route');


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/stats', statsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/milks",milkRoutes);

main()
  .then(() => console.log("mongodb is successfully connected."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("Sambhaar Server is running!");
  });



  {
    /*
    app.post("/order", async (req, res) => {
    try {
      let { user, MUID, GrandTotal, products, selectedItems, transaction } = req.body;
  
      const data = {
        merchantId: merchant_id,
        merchantTransactionId: transaction,
        user: user,
        product: products,
        selectedItems: selectedItems,
        amount: GrandTotal * 100,
        redirectUrl: `http://localhost:5000/status?id=${transaction}`,
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
  
      // Save the order to MongoDB
      const newOrder = new Order({
        orderId: transaction,
        products: products.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        amount: GrandTotal,
        email: user.email,
        status: "pending",
        payment: "phonepe",
      });
  
      await newOrder.save();
  
      res.json(phonePeResponse.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/orders/:userId", async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.id });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post("/status", async (req, res) => {
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

      await axios(options).then((response) => {
        if (response.data.success == true) {
          const url = "http://localhost:5173/order-success";
          return res.redirect(url);
        } else {
          const url = "http://localhost:5173/failure";
          return res.redirect(url);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
  
  */
  }
}

// Routes
app.post("/uploadImage", (req, res) => {
  const { image } = req.body;  // Get the base64 image from the frontend
  uploadImage(image)
      .then((url) => {
          res.send(url);  // Send back the image URL
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send({ error: "Failed to upload image" });
      });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
