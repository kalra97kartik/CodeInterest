const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-models');
passport.use(new GoogleStrategy({
  //options for the  google strategy
  callbackURL:'/auth/google/redirect',
  clientID:keys.google.clientID,
  clientSecret:keys.google.clientSecret
  },(accessToken,refreshToken,profile,done)=>{
    //passport call back function
           
            console.log('passport callback function fired ');
            console.log(profile);

    //check if user already exist in our database
    User.find({googleId:profile.Id}).then((currentUser)=>{
      console.log(currentUser,11111)
        if(currentUser){
          //already have the user
          console.log('user is'+ currentUser)

        }
        else{
              //if not create user in our db
              new User({
                username:profile.displayName,
                googleId:profile.id
              }).save().then((newUser) =>
            {
              console.log('new user created:'+  newUser);  
            });
        }
    })
   
  })
)    