const User = require("../models/user");

exports.goToLeaderboard = async (req, res) => {
  try {
    const leaderboardArray = await User.find()
      .select("_id name totalExpense")
      .sort({ totalExpense: -1 });
    console.log(leaderboardArray);
    res.status(200).json(leaderboardArray);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
