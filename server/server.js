require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Client = require("./models/client-model.js");
const authRoute = require("./router/auth-router.js");
const detailRoute = require("./router/detail-router");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
const path = require("path");

const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

const _dirname = path.resolve();

app.use(cors(corsOptions));  // Enabling CORS with the updated configuration
app.use(express.json());
app.use("/api/auth", authRoute);  // Auth route
app.use("/api/data", detailRoute);  // Details route

// Visit count endpoint
app.post("/api/visit/:clientId", async (req, res) => {
  const clientId = req.params.clientId;

  // Check if clientId is valid
  if (!clientId) {
    return res.status(400).json({ message: "Client ID is required" });
  }

  try {
    let client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Increment visit count
    client.visitCount += 1;
    await client.save();

    res.json({ count: client.visitCount });
  } catch (error) {
    console.error("Error updating visit count:", error);
    res.status(500).json({ message: "Error updating visit count" });
  }
});

// Error middleware
app.use(errorMiddleware);

// Serving static files for the frontend
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
console.log(`Static files served from: ${path.join(__dirname, "..", "client", "dist")}`);

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
});

// Connect to the database and start the server
connectDb().then(() => {
  app.listen(process.env.PORT || 3500, () => {
    console.log(`Server is running on port: ${process.env.PORT || 3500}`);
  });
});
