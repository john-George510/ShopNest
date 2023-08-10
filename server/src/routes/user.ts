import express from "express";
import {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} from "./verifyToken";
import { AES } from "crypto-js";
import User from "../models/User";

const userRoute = express.Router();

userRoute.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  if (req.body.password) {
    req.body.password = AES.encrypt(
      req.body.password,
      process.env.PASSKEY || ""
    ).toString();
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json("updated user");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

userRoute.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

userRoute.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

userRoute.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

userRoute.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  console.log(lastYear);
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default userRoute;
