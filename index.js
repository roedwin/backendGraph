const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// app.use(cors({
//     origin: true,
//     credentials:true
// }));

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server,{cors:{origin:true}});

require('./sockets/socket');

// path publica
const publicPath = path.resolve( __dirname, 'public' );


app.use(express.static(publicPath));

server.listen( process.env.PORT, (err)=>{
    if (err) throw new Error(err);

    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});