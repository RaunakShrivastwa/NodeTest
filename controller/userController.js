const User = require('../model/User')
const mongoose = require('mongoose')
const jasonwebtoken = require('jsonwebtoken');
const { json } = require('body-parser');
const eventEmiter = require('events');
const event = new eventEmiter();
let count = 0;
event.on('run', () => {
   console.log("event Found ", count += 1)
})
module.exports.saveUser = async (req, res) => {
   try {
      const user = await User.create(req.body);
      event.emit("run")
      return res.json({
         Message: "user Added Successfully!!!",
         user: user
      });
   } catch (err) {
      console.log("There is Error with User Creation", err);
      return;
   }
}

module.exports.getUser = async (req, res) => {
   try {
       const user = await User.find({});
         event.emit("run")
         return res.status(200).json({
            message: "Your Users",
            Users: user
         })     
   } catch (err) {
      console.log("there is error with Getting All User!!", err);
      return;
   }
}

module.exports.deleteUser = async (req, res) => {
   const id = req.params.id;
   try {
      const user = await User.findByIdAndDelete(id);
      return res.status(200).json({
         isDeleted: true
      })
   } catch (err) {
      console.bind(console, "This is error while Deletion of user");
      return;
   }
}

module.exports.updateUser = async (req, res) => {
   const id = req.params.id;
   try {
      const user = await User.findByIdAndUpdate(id, req.body);
      return res.status(200).json({
         isUpdated: true
      })
   } catch (err) {
      console.log("There error while Update USer", err);
      return;
   }
}

module.exports.login = (req, res) => {
   return res.json({
      Message: "user Login"
   })
}


module.exports.logout = (req, res) => {
   req.logout(() => {
      return res.json({
         Message: "User logout!!!"
      })
   })
}


//  for the jwt login

module.exports.jwtLogin = async (req, res) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user)
      if (!user || user.password != req.body.password) {
         console.log("Invalide User!!!!");
         return json({
            message: "Invalide User"
         })
      }
      return res.json({
         token: jasonwebtoken.sign(user.toJSON(), 'shubham', { expiresIn: 100000 })
      })

   } catch (err) {
      console.log("there is error with Fetching User", err);
      return;
   }
}

module.exports.home = async (req, res) => {

   const user = await User.find({});
   return res.render('home', {
      user: user
   })

}

// app.use((req, res, next) => {
//    const userAgent = req.get('User-Agent');
//    if (userAgent && userAgent.includes('Chrome')) {
//      // Request comes from Chrome browser
//      next();
//    } else {
//      // Request does not come from Chrome browser
//      res.status(403).send('Access denied');
//    }
//  });