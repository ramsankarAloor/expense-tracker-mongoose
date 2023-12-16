const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // && condition is kept to avoid error adikkal.. otherwise authHeader illenki pottum.
        const tokenVerified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({_id : tokenVerified.userId});
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({success:false, msg: "failure in authentication"});
    }
}