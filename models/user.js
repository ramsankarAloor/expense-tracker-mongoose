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

