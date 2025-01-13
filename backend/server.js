import 'dotenv/config';
import http from 'http';
import {Server} from 'socket.io';
import app from './app.js';


const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    
    socket.on('event', data => {});
    socket.on('disconnect', () => {});
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
})