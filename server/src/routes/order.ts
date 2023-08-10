import express from "express";
import {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} from "./verifyToken";
import { AES } from "crypto-js";
import Order from "../models/Order";

const orderRoute = express.Router();

orderRoute.post("/", verifyToken, async (req, res) => {
  const neworder = new Order(req.body);
  try {
    console.log(neworder);
    const savedorder = await neworder.save(); //orders with same userid not bwing added
    res.status(200).json(savedorder);
  } catch (err) {
    res.status(500).json(err);
  }
});

orderRoute.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedorder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedorder);
  } catch (err) {
    res.status(500).json(err);
  }
});

orderRoute.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

orderRoute.get(
  "/find/:userId",
  verifyTokenAndAuthorisation,
  async (req, res) => {
    try {
      const order = await Order.find({ userId: req.params.userId });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

orderRoute.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

orderRoute.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default orderRoute;
