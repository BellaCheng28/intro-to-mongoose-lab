// models/Customer.js
const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
// /customer.js
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
