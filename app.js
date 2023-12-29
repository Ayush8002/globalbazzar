const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require('./middleware/error');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const path = require("path");

// middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes 
app.use('/api/v1', require('./routes/ProductRoutes'));
app.use('/api/v1', require('./routes/UserRoutes'));
app.use('/api/v1', require('./routes/OrderRoutes'));
app.use('/api', require('./routes/PaymentRoutes'));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

// middleware for errors
app.use(errorMiddleware)

module.exports = app;