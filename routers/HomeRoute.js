const express= require('express');
const { route } = require('./userRouter');
const router=express.Router();
 console.log("Router Loadded!!!!")
 router.use('/user',require('./userRouter'))

module.exports=router;