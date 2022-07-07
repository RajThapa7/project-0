//dependencies
const express = require("express");
const app = express();
const cors = require('cors')
require("dotenv").config();
const cookieparser = require("cookie-parser");

//imports
const port = process.env.PORT || 5000;
const authRouter = require("./routes/auth");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const clientAuthentication = require("./middleware/clientAuthentication");
const technicianAuthentication = require("./middleware/technicianAuthentication");
const notFoundMiddleware = require("./middleware/not-found");
const jobRouter = require("./routes/jobs");
const cloudinaryRouter = require("./routes/cloudinary");
const wrapper = require('./errorWrapper')
//middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(errorHandlerMiddleware);
app.use(cookieparser());
app.use(cors());
// app.use(notFoundMiddleware)

//routes
app.use("/", authRouter);
app.use("/jobs", clientAuthentication, jobRouter);
app.use("/", cloudinaryRouter);

//connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
