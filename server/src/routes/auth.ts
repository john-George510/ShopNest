import express from "express";
import User from "../models/User";
import { AES, enc } from "crypto-js";
import jwt from "jsonwebtoken";

const authRoute = express.Router();

authRoute.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: AES.encrypt(
      req.body.password,
      process.env.CRYPTO_KEY || ""
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.sendStatus(500).json(err);
  }
});

authRoute.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send("username doesnt exist");
    const orginalPassword = user
      ? AES.decrypt(user.password, process.env.CRYPTO_KEY || "").toString(
          enc.Utf8
        )
      : "doesnt exist";
    if (orginalPassword != req.body.password)
      return res.status(401).send("wrong credentials");
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY || "",
      { expiresIn: "3d" }
    );
    // const { password, ...others } = user ? user._doc : "doesnt exist";
    res.status(200).json({ ...user, accessToken }); //password esists in this should be removed
  } catch (err) {
    res.send(err);
  }
});

export default authRoute;
