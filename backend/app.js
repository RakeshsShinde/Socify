const express = require('express');
const app = express();
const errormiddleware = require('./middleware/errormiddleware');
const userRouter = require('./Routes/userRoute');
const postRouter = require('./Routes/postRoute');
const commentRouter = require('./Routes/commentRoute');
const chatRouter = require('./Routes/chatRoute');
const messageRouter = require('./Routes/messageRoute');
const connectDB = require('./config/connectDB');
const cookieparser = require('cookie-parser');
const cloudinary = require('cloudinary');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path')

dotenv.config({ path: path.resolve(__dirname + '/config/.env') })
connectDB();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


app.use(compression())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieparser())

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

app.use(errormiddleware);

const port = process.env.SERVER_PORT || 5000;

const server = app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})


io.on('connection', (socket) => {
    console.log('connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    })

    socket.on('join room', (room) => {
        socket.join(room);
        console.log('user joined romm :' + room);
    })

    socket.on('typing', (room) => {
        socket.in(room).emit('typing')
    });

    socket.on('stop typing', (room) => {
        socket.in(room).emit('stop typing')
    });


    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if (!chat.users) return console.log('chat.users not defined !');
        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id) return;
            socket.in(user._id).emit("message received", newMessageReceived);
        })
    })

    socket.on('new like', (likedata) => {
        console.log(likedata);
        socket.to(likedata.post?.postBy?._id).emit('post like', likedata);
    })


    socket.off('setup', () => {
        console.log("user disconnectd !");
        socket.leave(userData._id);
    })
})
