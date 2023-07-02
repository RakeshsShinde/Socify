const express = require('express');
const app = express();
const errormiddleware = require('./middleware/errormiddleware');
const userRouter = require('./Routes/userRoute');
const postRouter = require('./Routes/postRoute');
const connectDB = require('./config/connectDB');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path')

dotenv.config({ path: path.resolve(__dirname + '/config/.env') })
connectDB();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieparser())
app.use(express.static('upload'))

app.use('/user', userRouter);
app.use('/post', postRouter);



app.use(errormiddleware)

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})