const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const route = require("./connection/Users.js");
const routers = require("./connection/cmunication.js")
const bodyParser = require('body-parser');
const socket=require("socket.io")
const port = 4000
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors())


var corsOptions = {
    origin: 'http://localhost:3000/register',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use("/", routers)
app.use("/data", route)
mongoose.connect("mongodb://localhost:27017/chat")
const server= app.listen(port, () => {
    console.log(`server is running at port:${port}`)
})


const io = socket(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  
  io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (UserId) => {
      onlineUsers.set(UserId, socket.id);
    });
  
    socket.on('send-msg', (data) => {
        console.log(data)
      const sendUserSocket = onlineUsers.get(data.ReceivedBy);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit('msg-receive', {
          SendBy: data.SendBy,
          ReceivedBy: data.ReceivedBy,
          message: data.message,
        });
      }
    });
  });





// const io=socket(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         credentials:true
//     },
// })

// global.onlineUsers=new Map();

// io.on("connection",(socket)=>{
//     global.chatSocket=socket;
//     socket.on("add-User",(UserId)=>{
//         onlineUsers.set(UserId,socket.id);
//     });
//    socket.on("send-msg",(data)=>{
//     const sendUserSocket=onlineUsers.get(data.to);
//     if(sendUserSocket){
//         socket.to(sendUserSocket).emit("msg-receive",data.msgs)
//     }
//    })

// })