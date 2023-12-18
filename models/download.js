const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const downloadSchema = new Schema({
  dateTime: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  reportOfMonth: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("Download", downloadSchema);

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const Downloads = sequelize.define('downloads', {
//     id : {
//         type : Sequelize.INTEGER,
//         autoIncrement : true,
//         allowNull : false,
//         primaryKey : true
//     },
//     dateTime : {
//         type : Sequelize.DATE,
//         allowNull: false
//     },
//     link : {
//         type : Sequelize.STRING,
//         allowNull:false
//     },
//     reportOfMonth : {
//         type : Sequelize.STRING,
//         allowNull:false
//     }
// }, {
//     timestamps : false
// })

// module.exports = Downloads;
