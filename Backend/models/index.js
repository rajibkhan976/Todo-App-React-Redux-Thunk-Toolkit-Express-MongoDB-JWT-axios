const mongoose = require("mongoose");

const Todos = require("./todoModel");

const uri = process.env.DATABASE_URL || "mongodb://localhost:27017/todo_server";

const connectDb = () => {
    return mongoose.connect(uri, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = {
    connectDb, 
    models: { Todos }
}