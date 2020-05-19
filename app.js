const express = require('express');
const app = express();
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const produtoRoutes = require('./api/routes/produtos');

mongoose.connect('mongodb+srv://unidesc:unidesc@unidesc-pw-weuller-bk1zv.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
var corsOptions={
    origin:'http://localhost:3000/produtos',
    optionsSuccessStatus:200
}

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method == "OPTIONS"){
        req.header("Access-Control-Allow-Methods", "PUT, POST, PATH, GET, DELETE");
        return res.status(200).json({});
    }
    next();
});



app.use('/produtos', produtoRoutes);


app.use((req, res, next)=>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(erro.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;