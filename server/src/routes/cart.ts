import express from "express";
import {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} from "./verifyToken";
import { AES } from "crypto-js";
import Cart from "../models/Cart";

const cartRoute = express.Router();

cartRoute.post("/", verifyToken, async (req, res) => {
  const newcart = new Cart(req.body);
  try {
    const savedcart = await newcart.save();
    res.status(200).json(savedcart);
  } catch (err) {
    res.status(500).json(err);
  }
});

cartRoute.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const updatedcart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedcart);
  } catch (err) {
    res.status(500).json(err);
  }
});

cartRoute.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

cartRoute.get(
  "/find/:userId",
  verifyTokenAndAuthorisation,
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

cartRoute.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default cartRoute;
