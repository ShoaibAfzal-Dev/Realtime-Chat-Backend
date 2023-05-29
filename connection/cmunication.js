// import User from "../models/Register";
const Messages = require("../models/Message.js");
// const Login=require("../models/Login.js")
const express = require("express");
const multer = require('multer');
const routers = express.Router();
routers.post("/sent", async (req, res) => {
    try {
        const data = new Messages(req.body)
        const stored = await data.save();
        res.send({
            success: true,
            stored
        })
    } catch (error) {
        res.send(error)
    }
})
routers.get("/get", async (req, res) => {
    try {
        const gh = await Messages.find({})
        res.send({
            success: true,
            gh
        })
    } catch (error) {
        res.send({
            success: false,
            error
        })
    }
})
module.exports = routers