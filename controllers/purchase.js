const Razorpay = require("razorpay");
const Order = require("../models/order");
const mongoose = require("mongoose");
const User = require("../models/user")

exports.purchasePremium = async (req, res) => {
  // console.log("req user => ", req.user)
  try {
    let rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 100;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }

      const userId = req.user._id;

      const createdOrder = await Order.create({
        userId,
        orderId: order.id,
        status: "PENDING",
      });

      // await req.user.createOrder({ orderId: order.id, status: "PENDING" });
      return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .json({
        message: "Something went wrong in premium purchase",
        error: error,
      });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const currentOrder = await Order.findOne( { orderId: order_id } );

    const promise1 = currentOrder.updateOne({
      paymentId: payment_id,
      status: "SUCCESSFUL",
    });

    const promise2 = User.updateOne({_id : req.user._id }, { isPremium: true });

    await Promise.all([promise1, promise2]); // as promise1 and promise2 are parallel they are resolved parallelly instead of writing await separately for both.

    return res
      .status(202)
      .json({ success: true, message: "Transaction successful" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Something went wrong in update status", error: error });
  }
};
