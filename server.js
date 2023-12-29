const app = require('./app')
const dotenv = require('dotenv')
const connectToMongo = require('./config/database')
const cloudinary = require('cloudinary')


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//   // Config
//   if (process.env.NODE_ENV !== "PRODUCTION") {
//     require("dotenv").config({ path: "backend/config/config.env" });
//   }


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Config 
dotenv.config({ path: "config/config.env" })

// connecting to database 
connectToMongo()


const server = app.listen(4000, () => {
  console.log(`Example app listening at http://localhost:4000`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});