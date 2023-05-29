const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  SendBy: {
    type: String,
    required: true,

  },
  ReceivedBy: {
    type: String,
    required: true
  },
  message:{
    type:String,
  },
  time: {
    type: Date,
    default: Date.now 
  }
});

const Messages = mongoose.model("Messages", UserSchema);

module.exports = Messages;