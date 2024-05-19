const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  //console.log("Headers:", req.headers);
  //console.log("Body:", req.body);
  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string
const dbURI =
  "mongodb+srv://dummyUser:Alkatraz1@cluster0.0ynvoxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Item Schema
const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

// List Schema
const userSchema = new mongoose.Schema({
  name: String,
  rights: String,
});

const User = mongoose.model("User", userSchema);

// List Schema
const listSchema = new mongoose.Schema({
  name: String,
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      count: Number,
    },
  ],
});

const List = mongoose.model("List", listSchema);

// Routes to create and retrieve Items
app.post("/item", async (req, res) => {
  const { name } = req.body;
  const newItem = new Item({ name });
  await newItem.save();
  res.send(newItem);
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Routes to create and retrieve Lists
app.post("/list", async (req, res) => {
  const { name, items } = req.body;
  const newList = new List({ name, items });
  await newList.save();
  res.send(newList);
});

app.get("/lists", async (req, res) => {
  const lists = await List.find().populate("items.item");
  res.json(lists);
});

app.get("/lists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findById(id).populate("items.item");
    if (!list) {
      return res.status(404).send("List not found");
    }
    res.json(list);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.post("/list/:id", async (req, res) => {
  const { id } = req.params;
  const { items } = req.body;
  try {
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).send("List not found");
    }
    list.items = items;
    await list.save();
    res.send(list);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Correct delete route for an item in a list
app.delete("/list/:listId/item/:itemId", async (req, res) => {
  const { listId, itemId } = req.params;
  console.log(
    `DELETE request received for listId: ${listId} and itemId: ${itemId}`
  );

  try {
    const list = await List.findById(listId).populate("items.item");
    if (!list) {
      console.log(`List ${listId} not found`);
      return res.status(404).send("List not found");
    }

    console.log(`List before deletion: ${JSON.stringify(list.items)}`);
    list.items = list.items.filter(
      (item) => item.item._id.toString() !== itemId
    );
    console.log(`List after deletion: ${JSON.stringify(list.items)}`);
    await list.save();
    res.send(list);
  } catch (err) {
    console.error(`Error processing DELETE request: ${err.message}`);
    res.status(500).send("Server error");
  }
});

//route to create and fetch users
app.post("/user", async (req, res) => {
  const { name, rights } = req.body;
  const newUser = new User({ name, rights });
  await newUser.save();
  res.send(newUser);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
