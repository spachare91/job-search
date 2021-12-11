const express = require('express');
const router= express.Router();


router.get('/',(req, res) => {
    res.render('index')

})

router.post('/search',(req, res) => {
    let name=req.body.jobtitle;
    let place=req.body.place;
    res.render('job_listing', {name:name,place:place})
})

router.get('/contact',(req, res)=>{
    res.render('contact')
})

router.get('/about',(req, res)=>{
    res.render('about')
})

module.exports = router;