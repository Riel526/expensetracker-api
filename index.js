// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, Model, DataTypes } = require("sequelize");

// Create sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
})

// Define models
class Expense extends Model {}

Expense.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, { sequelize, modelName: 'expense' });

sequelize.sync();

// Configuration
const port = 3000;
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Services
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Expense Tracker!" });
})

// API to return all expense items
app.get("/expenses", async (req, res) => {
    const expenses = await Expense.findAll();

    res.json(expenses);
});

// API to fetch a single expense item based on id
app.get("/expenses/:id", async(req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (expense) {
        res.json(expense);
    } else {
        res.status(404).json({ message: "not found" });
    }
})

// API to create an expense item
// { name: "Food", amount: 300.00 }
app.post("/expenses", async (req, res) => {
    const expense = await Expense.create(req.body);

    res.json(expense);
});

// Run the server application
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});