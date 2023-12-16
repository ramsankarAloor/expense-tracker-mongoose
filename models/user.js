const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  totalExpense: {
    type: Number,
    default: 0
  },
  totalIncome: {
    type: Number,
    default: 0
  }
});

userSchema.methods.editTotalExpense = function(totalExpense){
  this.totalExpense = totalExpense
  return this.save();
}

userSchema.methods.editTotalIncome = function(totalIncome){
  this.totalIncome = totalIncome
  return this.save();
}

module.exports = mongoose.model("User", userSchema);

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const Users = sequelize.define('users', {
//     id : {
//         type : Sequelize.INTEGER,
//         autoIncrement : true,
//         allowNull : false,
//         primaryKey : true
//     },
//     name : {
//         type : Sequelize.STRING,
//         allowNull : false
//     },
//     email : {
//         type : Sequelize.STRING,
//         allowNull : false,
//         unique : true
//     },
//     password : {
//         type : Sequelize.STRING,
//         allowNull : false
//     },
//     isPremium : {
//         type : Sequelize.BOOLEAN,
//         defaultValue : false
//     },
//     totalExpense : {
//         type : Sequelize.INTEGER,
//         defaultValue : 0
//     },
//     totalIncome : {
//         type : Sequelize.INTEGER,
//         defaultValue : 0
//     }
// }, {
//     timestamps : false
// });

// module.exports = Users;
