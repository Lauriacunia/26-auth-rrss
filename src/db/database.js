import mongoose from "mongoose";
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.cyfup.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
    