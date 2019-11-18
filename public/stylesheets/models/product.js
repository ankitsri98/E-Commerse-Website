//define model of the product
//importing mongoose
var mongoose = require('mongoose');
var Schema= mongoose.Schema;//creating object

var schema= new Schema({
  //javascript obj. defining schema description
  //img name description and price
  imagePath:{type:String,required:true},
  title:{type:String,required:true},
  description:{type:String,required:true},
  price:{type:String,required:true},
}); 
//As mentioned above, exports is an object. So it exposes whatever you assigned to it as a module
// When you use mongoose.model(), your model will use the default mongoose connection
//only models will use the custom mongoose
module.exports=mongoose.model('Product',schema);



