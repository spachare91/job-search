const express = require('express');
const dotenv=require('dotenv');
const router= express.Router();
const {homepage,searchjobs,contact,about,handleError}= require('../controllers/maincontroller')

dotenv.config({path:'./config.env'})

// home route...displays 5 job records for backend developer
router.get('/',homepage)


// search route to show jobs posting in last 60 days....
router.post('/search',searchjobs)



// route for rendering contact page
router.get('/contact',contact)


// route for rendering about page
router.get('/about',about)


//handling error routes
router.get('*',handleError)


module.exports = router;