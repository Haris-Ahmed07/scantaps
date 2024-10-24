require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router.js");
const contactRoute = require("./router/contact-router.js");
const detailRoute = require("./router/detail-router");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");

const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/data", detailRoute);

app.use(errorMiddleware);

const PORT = 3500;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
