const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/database");

// Define schema
const userSchema = new mongoose.Schema({
  image: String,
  email: String,
  name: String
});

// Export model
module.exports = mongoose.model("User", userSchema);
