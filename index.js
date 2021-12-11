const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path:'./config.env'})

let port = process.env.PORT;


const app = express();



app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))

app.use('/',require('./routes/main'));

app.listen(port,()=>{
    console.log(`connected to port ${port}`);
})