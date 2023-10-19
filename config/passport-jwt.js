const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/User');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'shubham'
}

passport.use(new JwtStrategy(opts, async (payLoad, done) => {
    try {
        const user = await User.findById(payLoad._id);
        if (user) {
            return done(null, user);
        } else { return done(null, false) }
    } catch (err) {
        console.log("There is Error With Fetching User Record", err);
        return;
    }
}));

module.exports=passport;