const express = require('express');
const axios=require('axios');
const dotenv=require('dotenv');
const { response } = require('express');
const router= express.Router();

dotenv.config({path:'./config.env'})

router.get('/',async(req, res) => {

    try {

  
        const ans='https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=9e7a233e&app_key=4904e43930836cc2735e549d77eef526&results_per_page=5&what_or=full%20stack%20backend%20developer&salary_min=5000&sort_by=date';
        var respon= await axios.get(ans)
        
    } catch (error) {
        console.log("some error")
        
    }

    res.render('index',{jobs:respon.data.results});

})



router.post('/search',async(req, res) => {

    let name=req.body.jobtitle;
    name=name.replace(" ","%20");
    let place=req.body.place;
    let pagenum=req.body.pagenum;

      try {

  
        const ans='https://api.adzuna.com/v1/api/jobs/in/search/'+pagenum+'?'+'app_id='+process.env.APP_ID+'&app_key='+process.env.APP_KEY+'&results_per_page=20&what='+name+'&where='+place+'&max_days_old=60&sort_by=date';
        var respon= await axios.get(ans)
        
    } catch (error) {
        console.log("some error")
        
    }

    var totaljobs=respon.data.count;
    var totalpages=totaljobs/15;
    totalpages=Math.ceil(totalpages);

    res.render('job_listing', {name:name,place:place,jobs:respon.data.results,count:respon.data.count,pagenum:pagenum,totalpages:totalpages})
})

router.post('/newpage',(req,res)=>{
    var ans=req.body.jobname;
    res.send(ans);
})

// search  with page num
// router.get('/search/:current/:name/:place',async(req, res) => {
//     let current=req.params.current;
//     let name=req.params.name;
//     let place=req.params.place;
//     console.log(current,name,place)

//       try {

  
//         const ans='https://api.adzuna.com/v1/api/jobs/in/search/'+current+'?'+'app_id='+process.env.APP_ID+'&app_key='+process.env.APP_KEY+'&results_per_page=20&what='+name+'&where='+place+'&max_days_old=60&sort_by=date';
//         var respon= await axios.get(ans)
        
//     } catch (error) {
//         console.log("some error")
        
//     }

//    // res.render('job_listing', {name:name,place:place,jobs:respon.data.results,count:respon.data.count})
//    res.render('contact')
// })



router.get('/contact',(req, res)=>{
    res.render('contact')
})

router.get('/about',(req, res)=>{
    res.render('about')
})

module.exports = router;