// import User from "../models/Register";
const User = require("../models/Register.js");
// const Login=require("../models/Login.js")
const express = require("express");
const multer = require('multer');
const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.file)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.send({ success: false, error: 'Username or email already exists' });
    }


    const newUser = new User({
      username,
      email,
      password,

    });

    await newUser.save();

    res.send({ success: true, user: newUser });


  } catch (error) {
    res.send({
      success: false,
      error,
    })
  }
})
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database based on the provided username and password
    const user = await User.findOne({ username, password });

    if (user) {
      res.send({ success: true, user });
    } else {
      res.send({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const all = await User.find({});
    res.send({
      success: true,
      all
    })
  } catch (error) {
    res.send(error)
  }
})
router.post("/set-profile" , async(req,res)=>{
  try {
    const { username, image } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: { image } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router