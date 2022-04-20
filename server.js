const express = require('express');
const dotenv=require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const cookieParser=require("cookie-parser");
const path = require('path');
const jwt=require("jsonwebtoken");
const app = express();
app.use(express.json());
var connectDB=require("./server/database/connectionDB");
const { json } = require('body-parser');
dotenv.config( { path : 'config.env'} );
app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended : true}));
app.set("view engine", "ejs");
const PORTPrimary=process.env.PORTPrimary;
const PORTSecondary=process.env.PORTSecondary
app.use('/assets/css', express.static(path.resolve(__dirname, "assets/css/")));
app.use('/assets/img', express.static(path.resolve(__dirname, "assets/img/")));
app.use('/assets/js', express.static(path.resolve(__dirname, "assets/js/")));
app.use('/assets/uploads', express.static(path.resolve(__dirname, "assets/uploads/")));
app.use('/fonts', express.static(path.resolve(__dirname, "assets/fonts/")));
app.use(cookieParser());
app.use('/', require('./server/routes/router'))
app.listen(PORTPrimary||PORTSecondary, ()=> { console.log(`Server is running on http://localhost:${PORTPrimary||PORTSecondary}`)});
connectDB();
