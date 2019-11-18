var Product=require('../product');//fetching
//this seeder fle is not be runned all the time so it needs to be runned fro
//here only so fetch and run
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser:true});

var products=[
  new Product({
  //javascript object
  imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
  title:'Gothic video Game',
  description:'awesome game!!!',
  price:10
}),

  new Product({
    //javascript object
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic video Game',
    description:'awesome game!!!',
    price:20
}),
  new Product({
    //javascript object
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic video Game',
    description:'awesome game!!!',
    price:15
}),
  new Product({
    //javascript object
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic video Game',
    description:'awesome game!!!',
    price:50
})
];
//store these data in database
var done=0;
for(var i=0;i<products.length;i++){
  products[i].save(function(err,result){
    done++;
    if(done===products.length){
      exit();
    }
  });//saving in database
}
  function exit(){
    mongoose.disconnect();
  }


