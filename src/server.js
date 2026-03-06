require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");   // Prisma connection
const authRoutes = require("./routes/authRoutes");   // NEW
const authMiddleware = require("./middleware/authMiddleware"); // NEW
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/*
Middlewares
*/
app.use(cors());
app.use(express.json());

/*
Auth Routes
*/
app.use("/auth", authRoutes);   // NEW
app.use("/tasks", taskRoutes);
app.use("/admin", adminRoutes);

/*
Test Route
*/
app.get("/", (req, res) => {
  res.json({
    message: "Task Tracker API Running Successfully 🚀"
  });
});

/*
Database Test Route
*/
app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database connection failed"
    });
  }
});

/*
Protected Profile Route
*/
app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      }
    });

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile"
    });
  }
});

/*
Server Port
*/
const PORT = process.env.PORT || 5000;

/*
Start Server (disabled during tests)
*/
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

/*
Export app for testing
*/
module.exports = app;