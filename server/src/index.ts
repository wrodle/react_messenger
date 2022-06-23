import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
import './core/db';
import cors from 'cors'
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

import {createSocket} from './core/socket'
createSocket(io)
import {createRouter} from './router';
createRouter(app, io)

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})