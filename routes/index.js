var express = require('express');
var router = express.Router();
var passport=require('passport');
var csrf=require('csurf');//for signup
var Product =require('../public/stylesheets/models/product');

var csrfProtection=csrf();//for signup
router.use(csrfProtection);//telling express that all the routes stored in route must be protected by csrfprotection

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,docs){//docs is item received from index.hbs
    var productchunks=[];//empty array
    var chunksize=3;
    for(var i=0;i< docs.length;i+=chunksize){
      productchunks.push(docs.slice(i,i+chunksize));//from 0-2,3-5 1st array 3 elements and 2nd has 2 elements
    }
    res.render('shop/index', { title: 'shopping cart',products:productchunks });
  });
});

//for signup
router.get('/user/signup',function(req,res,next){
  res.render('user/signup',{csrfToken:req.csrfToken()});
});
router.post('/user/signup', passport.authenticate('local.signup',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signup',
  failureFlash:true
}));

router.get('/profile',function(req,res,next){
 res.render('user/profile');
});
module.exports = router;

 