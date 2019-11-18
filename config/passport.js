var passport=require('passport');
var user=require('../public/stylesheets/models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  user.findById(id,function(err,user){
    done(err,user);
  });
});

passport.use('local.signup',new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback:true
},function(req,email,passport,done){
  
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  user.findOne({'email':email},function(err,user){
    // if there are any errors, return the error
    if(err){
      return done(err);
    }
    // check to see if theres already a user with that email
    if(user){
      return done(null,flase,{message:'Email is already in use'});
    }
    // if there is no user with that email
    // create the user
    var newUser= new user();
    // set the user's local credentials
    newUser.email=email;
    newUser.passport=newUser.encryptPassword(passport);
    // save the user
    newUser.save(function(err,result){
      if(err){
        return done(err);
      }
      return done(null,newUser);
    });
  });
}));



