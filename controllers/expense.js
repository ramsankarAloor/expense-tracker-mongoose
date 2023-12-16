const Expense = require("../models/expense");
const User = require("../models/user");

exports.isUserPremium = async (req, res) => {
  const user = await Users.findOne({ where: { id: req.user.id } });
  res.json(user.isPremium);
};

exports.getExpenses = async (req, res) => {
  if (req.body.isIncome === false) {
    const expenses = await Expense.find({
      userId: req.user._id,
      date: req.body.date,
      isIncome: false,
    });

    res.json(expenses);
  } else {
    const incomes = await Expense.find({
      userId: req.user.id,
      date: req.body.date,
      isIncome: true,
    });

    res.json(incomes);
  }
};

exports.postNewExpense = async (req, res) => {
  try {
    if (!req.body.amount) {
      throw new Error("Amount field is mandatory..!");
    }
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const date = req.body.date;
    const isIncome = req.body.isIncome;

    const expense = new Expense({
      amount,
      description,
      category,
      date,
      isIncome,
      userId: req.user._id,
    });

    if (isIncome === false) {
      const totalExpense = Number(req.user.totalExpense) + Number(amount);
      req.user.editTotalExpense(totalExpense);
    } else {
      const totalIncome = Number(req.user.totalIncome) + Number(amount);
      req.user.editTotalIncome(totalIncome);
    }

    const newEntry = await expense.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occured while creating an expense",
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const result = await Expense.findOneAndDelete({ _id: expenseId });
    const amount = result.amount

    const totalExpense = Number(req.user.totalExpense) - Number(amount);
    req.user.editTotalExpense(totalExpense);
  
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in delete expense " });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const result = await Expense.findOneAndDelete({ _id: incomeId });
    const amount = result.amount
    
    const totalIncome = Number(req.user.totalIncome) - Number(amount);
    req.user.editTotalIncome(totalIncome);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in delete income " });
  }
};
