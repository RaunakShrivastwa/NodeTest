const passport = require('passport');
const GoogleAuthStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../model/User');
const crypto = require('crypto')

try {
    passport.use(new GoogleAuthStrategy({
        clientID: '849197842335-bdmpis96skh3v7pdoo1jm2oan4d8d4su.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/user/auth/google/callback'

    }, async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ email: profile.emails[0].value });
        console.log(user)
        if (user) {
            return done(null, user);
        } else {
            let data = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            })
            return done(null,data);
        }
    }
    ))
} catch (err) {
    console.log("There is Error :",err);
    return;
}

module.exports= passport;