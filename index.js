//index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
//app.use(cors());
app.use(cors({
  origin: "https://ranjanifruitsandvegetables.netlify.app/",
  methods: "GET,POST,PUT,DELETE",
}));

// Connect to MongoDB
const MONGO_URL = `mongodb+srv://ranjanirithu206:KS0pwc1jwcIxmZu0@cluster0.8mgcr.mongodb.net/MEAN?retryWrites=true&w=majority`;

//mongoose
 // .connect(MONGO_URL)
  mongoose.connect(MONGO_URL, {

    //mongoose.connect("mongodb://localhost:27017/real_estate", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
  //.then(() => {
    console.log("Connected to MongoDB");
    seedProductsData();
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

const productsSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  type: String,
  image: String,
});
const ProductsModel = mongoose.model("Products", productsSchema);

async function seedProductsData() {
  await ProductsModel.deleteMany({});

  const productsData = [
    {
      name: "Apple",
      type: "Fruit",
      description: "Fresh and crispy",
      price: 150,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142542/apple.jpg",
    },
    {
      name: "Banana",
      type: "Fruit",
      description: "Rich in potassium",
      price: 75,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142554/banana.jpg",
    },
    {
      name: "Orange",
      type: "Fruit",
      description: "Packed with vitamin C",
      price: 200,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142641/orange.jpg",
    },
    {
      name: "Carrot",
      type: "Vegetable",
      description: "Healthy and crunchy",
      price: 100,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142613/carrot.jpg",
    },
    {
      name: "Broccoli",
      type: "Vegetable",
      description: "Nutrient-rich greens",
      price: 175,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142601/brocoli.jpg",
    },
    {
      name: "Grapes",
      type: "Fruit",
      description: "Sweet and juicy",
      price: 250,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142629/grapes.jpg",
    },
    {
      name: "Strawberry",
      type: "Fruit",
      description: "Delicious red berries",
      price: 300,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142657/strawberry.jpg",
    },
    {
      name: "Lettuce",
      type: "Vegetable",
      description: "Crisp and fresh",
      price: 120,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142635/lettue.jpg",
    },
    {
      name: "Tomato",
      type: "Vegetable",
      description: "Versatile and flavorful",
      price: 180,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142704/tomato.jpg",
    },
    {
      name: "Cucumber",
      type: "Vegetable",
      description: "Cool and hydrating",
      price: 130,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240104142621/cocumber.jpg",
    },
  ];

  await ProductsModel.insertMany(productsData);
  console.log("Products data seeded successfully!");
}

app.get("/api/products", async (req, res) => {
  try {
    const products = await ProductsModel.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});