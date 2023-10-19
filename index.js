const express = require('express');
const db = require('./config/Db')
const parser = require('body-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const cookie = require('cookie-parser');
const connectMongo = require('connect-mongo')
const session = require('express-session')
const passport_jwt = require('./config/passport-jwt')
const ejs = require('ejs');
const path = require('path')
const passportGoogle = require('./config/passport-google')
const dotenv = require('dotenv');
const cluster = require('cluster');
const os = require('os')

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
}
else {
  const app = express();
  dotenv.config();
  const PORT = process.env.PORT
  // app.use((req, res, next) => {
  //   const userAgent = req.get('User-Agent');

  //   if (userAgent && userAgent.includes('Chrome') && !userAgent.includes('Thunder Client')) {
  //     next();
  //   } else {
  //     res.status(403).json({ Message: "Access Denie", UsingTool: userAgent })
  //   }
  // });
  app.use(parser.json())
  app.use(cookie())
  app.use(session({
    name: 'Shubham',
    secret: "shubhamCodial",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: (1000 * 60 * 100)
    }

  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/', require('./routers/HomeRoute'))
  app.set('view engine', 'ejs');
  app.set('views', './views')
  app.listen(PORT, (err) => {
    if (err) {
      console.log("there is Error!!!!!");
      return;
    }
    console.log("App Running at port:- ", PORT);
  })
}
