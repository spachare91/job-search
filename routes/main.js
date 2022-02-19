const express = require('express');
const axios=require('axios');
const dotenv=require('dotenv');
const { response } = require('express');
const { append } = require('express/lib/response');
const router= express.Router();

dotenv.config({path:'./config.env'})


// home route...displays 5 job records for backend developer
router.get('/',async(req, res) => {

    try {

  
        const ans='https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=9e7a233e&app_key=4904e43930836cc2735e549d77eef526&results_per_page=5&what_or=full%20stack%20backend%20developer&salary_min=5000&salary_max=2000000&sort_by=date';
        var respon= await axios.get(ans)
        
    } catch (error) {
        console.log("some error")
        
        
    }

    res.render('index',{jobs:respon.data.results});

})


// search route to show jobs posting in last 60 days....
router.post('/search',async(req, res) => {

    let name=req.body.jobtitle;
    let xname=name  
    name=name.replace(" ","%20");
    let place=req.body.place;
    let pagenum=req.body.pagenum;
    let sortbyy=req.body.sortbyy;
    let salarymin=req.body.minsalary;
    let salarymax=req.body.maxsalary;
    var filterapplied=req.body.filterapplied;

      try {

  
        const ans='https://api.adzuna.com/v1/api/jobs/in/search/'+pagenum+'?'+'app_id='+process.env.APP_ID+'&app_key='+process.env.APP_KEY+'&results_per_page=20&what='+name+'&where='+place+'&max_days_old=60&sort_by='+sortbyy+'&salary_min='+salarymin+'&salary_max='+salarymax+'';
        var respon= await axios.get(ans)
        
    } catch (error) {
        console.log("some error")
        
        
    }

    var totaljobs=respon.data.count;
    var totalpages=totaljobs/20;
    totalpages=Math.ceil(totalpages);

    res.render('job_listing', {sortbyy:sortbyy,salarymax:salarymax,salarymin:salarymin,name:xname,place:place,jobs:respon.data.results,count:respon.data.count,pagenum:pagenum,totalpages:totalpages,filterapplied:filterapplied})
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


// route for rendering contact page
router.get('/contact',(req, res)=>{
    res.render('contact')
})


// route for rendering about page
router.get('/about',(req, res)=>{
    res.render('about')
})

// route to handle route errors
router.get('/err',(req,res)=>{
    res.render('404')
})

router.get('*',(req,res)=>{
    res.render('404')
})


// exporting router object
module.exports = router;