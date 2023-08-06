const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "asf23rjkafass35";

const User = require("../models/UserModel");

module.exports.registerUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error" });
    console.log(error);
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1m",
    });

    res.status(200).json({ status: "ok", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error" });
  }
};

module.exports.getUserData = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET, {
      ignoreExpiration: true,
    });

    const user = await User.findOne({ email: decodedToken.email });
    //console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User Not found" });
    }

    res.status(200).json({ status: "ok", data: user });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ status: "error" });
  }
};
