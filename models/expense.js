const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isIncome: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Expenses = sequelize.define('expenses', {
//     id : {
//         type : Sequelize.INTEGER,
//         autoIncrement : true,
//         allowNull : false,
//         primaryKey : true
//     },
//     amount : {
//         type : Sequelize.INTEGER,
//         allowNull : false
//     },
//     description : {
//         type : Sequelize.STRING
//     },
//     category : {
//         type : Sequelize.STRING,
//         allowNull : false
//     },
//     date : {
//         type : Sequelize.DATEONLY,
//         allowNull : false
//     },
//     isIncome : {
//         type : Sequelize.BOOLEAN,
//         defaultValue : false
//     }
// })

// module.exports = Expenses;
