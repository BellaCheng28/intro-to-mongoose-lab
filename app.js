const prompt = require("prompt-sync")();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Customer = require("./customer.js");

console.log("Welcome to the CRM");

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();
};

const runQueries = async () => {
  console.log("Queries running.");

  await choiceoption();
  // The functions calls to run queries in our db will go here as we write them.
};

connect();

const createCustomer = async () => {
  let customerName = prompt("Number is the customer name");
  let customerAge = prompt("Number is the customer age");
  const customerData = {
    name: customerName,
    age: customerAge,
  };
  const customer = await Customer.create(customerData);
};

const viewcutstomers = async () => {
  const customers = await Customer.find({});
  console.log("All customers", customers);
};

const updateCustomer = async () => {
  await viewcutstomers();
  const customerId = prompt(
    "Copy and paste the id of the customer you would like to update here"
  );
  const customerName = prompt("What is the customers new name?");
  const customerAge = prompt("What is the customers new age?");
  const customers = await Customer.findByIdAndUpdate(customerId, {
    name: customerName,
    age: customerAge,
  });
};

const DeleteCustomer = async () => {
  await viewcutstomers();
  const customerId = prompt(
    "Copy and paste the id of the customer you would like to delete here"
  );
  const customers = await Customer.findByIdAndDelete(customerId);
};

const quit = async () => {
  await setTimeout(() => {
    mongoose.disconnect();
  }, 2000);
  mongoose.connection.on("close", () => {
    console.log("exiting...");
  });
};

const choiceoption = async () => {
  console.log("1.Create a customer");
  console.log("2.View all customers");
  console.log("3.Update a customer");
  console.log("4.Delete a customer");
  console.log("5.Quit");

  let methodNum = prompt("what would you like to do?");
  console.log(methodNum);
  if (methodNum == 1) {
    createCustomer();
  } else if (methodNum == 2) {
    viewcutstomers();
  } else if (methodNum == 3) {
    updateCustomer();
  } else if (methodNum == 4) {
    DeleteCustomer();
  } else {
    quit();
  }
};
