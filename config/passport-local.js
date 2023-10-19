const passport = require('passport');
const passportLocal= require('passport-local').Strategy;
const User= require('../model/User');

passport.use(new passportLocal({
    usernameField: 'email'
},async (email,password,done)=>{
     try{
        const user= await User.findOne({email: email});
        if(!user || user.password != password){
            console.log("Invalide Credential");
            return done(null,false);
        }
        return done(null,user);
     }catch(err){
        console.log("there is problem With Fetching User",err);
        return;
     }
}
));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    try{
         const user= await User.findById(id);
         return done(null,user);
    }catch(err){
        console.log("there is Error With Deserialize User",err);
        return;
    }
})

passport.cheakAuthentication= (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
       return res.json({
            Error: "User Not Authenticatd"
        })
    }
}

passport.setAuthenticatedUser=(req,res)=>{
   if(req.isAuthenticated()){
    res.locals.user= req.user;
   }
}