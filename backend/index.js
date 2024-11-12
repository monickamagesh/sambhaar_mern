const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const crypto = require('crypto');
const axios = require('axios');


const port = process.env.PORT || 5000;
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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// all routes
const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

main()
  .then(() => console.log("mongodb is successfully connected."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("Sambhaar Server is running!");
  });

  app.post("/order", async (req, res) => {
    try {
      let { user, MUID, GrandTotal, products, selectedItems, transaction } =
        req.body;
      console.log(MUID, transaction, GrandTotal, selectedItems, products,  user )

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

      const keyIndex = 1

      const payload = JSON.stringify(data);
      const payloadMain = Buffer.from(payload).toString('base64');

      const string = payloadMain + "/pg/v1/pay" + salt_key;

      const sha256 = crypto.createHash('sha256').update(string).digest('hex');
      const checksum = sha256 + '###' + 1 ;

      const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

      const options = {
        method: "POST",
        url: prod_URL,
        headers: {
          'accept': "application/json",
          "content-type": "application/json" ,
          "X-VERIFY": checksum
        },
        data: {
          request: payloadMain
        }
      }
      
      await axios(options).then(response => {
        res.json(response.data)
      }).catch(error => {
        console.log(error.message);
        res.status(500).json({error: error.message})
      })

    } catch (error) {
      console.log(error);
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

      await axios(options).then(response => {
        if(response.data.success == true){
          const url = 'http://localhost:5173'
          return res.redirect(url)
        } else{
          const url = 'http://localhost:5173/failure'
          return res.redirect(url)
        }
      })
    } catch (error) {
      console.log(error);
    }
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
