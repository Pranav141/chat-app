const  express  = require("express");
const {Server}=require('socket.io')
const http=require('http');
const cors=require('cors')
const app=express();
// app.use(cors);
const server=http.createServer(app)
app.get('/',(req,res)=>{
    res.send("hello");
})
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    console.log("User is connected to:-",socket.id);

    socket.on("join_room",(room)=>{
        socket.join(room);
        console.log(`User has joinned: ${socket.id} and room id is ${room}`);
    })
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
    })
    socket.on("disconnect",()=>{ 
        console.log("user disconnected",socket.id);
    })
})
server.listen(3003,()=>{
    console.log("server running on http://localhost:3200");
})
