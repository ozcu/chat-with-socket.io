const { ESRCH } = require('constants')
const express = require ('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)


io.on('connection',(socket)=>{

    console.log('user connected')
   

    socket.on('private message',(message) =>{
        socket.emit("chat message", message)
    })

    socket.on('global message',(message) =>{
        io.emit("chat message", message)
    })

    socket.on('broadcast message',(message) =>{
        socket.broadcast.emit("chat message", message)
    })
})


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")

})

server.listen(5000,()=>{

    console.log('server is up and running on port 5000')
})