const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const connectDb = async () => {
  mongoose
    .connect(
      `mongodb+srv://${database}:${password}@cluster0.uw2zabe.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connexion à mongoose reussie"))
    .catch((error) => console.log("connexion à mongose echouée", error));
};

module.exports = connectDb;
