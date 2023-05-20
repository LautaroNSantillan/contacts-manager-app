const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectToDB = require('./config/dbConncection');
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use(errorHandler);


//LISTEN TO THE SERVER
app.listen(port, ()=>{
    console.log( `Listening on port : ${port} `);
});

//CONNECT TO DB
connectToDB();