const cors = require('cors');
const express = require('express');
const app = express();
// const { init } = require('./dbconfig')

const userRouter = require('./routes/userRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(userRouter);

app.listen(8080, () => {
    // init();
    console.log('Initial server . . .');
});