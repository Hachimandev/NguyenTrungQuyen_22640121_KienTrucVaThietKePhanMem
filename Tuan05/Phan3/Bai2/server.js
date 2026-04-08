const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect("mongodb://mongo:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Schema mẫu
const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", ItemSchema);

// Routes
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
