import express from "express";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const route = express.Router();

route.post("/login", async (req, res) => {
  try {
    const body = await req.body;
    const { username, password } = body;

    if (!username || username.length < 3 || !password || password.length < 6) {
      return res.send({
        success: false,
        msg: "Enter a valid username or password",
      });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "Enter a valid username or password",
      });
    }

    const verified = bcrypt.compare(password, user.password);

    if (!verified) {
      return res.status(403).send({
        success: false,
        msg: "Enter a valid username or password",
      });
    }
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("auth-token", authToken, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      // sameSite: "None", // Required for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    return res.send({
      success: true,
      user,
      token: authToken,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

route.post("/register", async (req, res) => {
  try {
    const body = await req.body;
    const { username, password } = body;
    if (!username || username.length < 3 || !password || password.length < 6) {
      return res.status(400).send({
        success: false,
        msg: "Enter a valid username or password",
      });
    }

    const secPass = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      password: secPass,
    });

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("auth-token", authToken, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "None", // Required for cross-site cookies
    });

    return res.status(201).send({
      success: true,
      user,
      token: authToken,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

export default route;
