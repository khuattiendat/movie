const express = require('express');
const app = express();
const PORT = 8080;
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const {connect} = require('./src/Configs/connect');
const Router = require('./src/Router');
//
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser());
//
app.get('/', (req, res) => {
    res.send('Hello World');
})
//
Router(app);
connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
})

