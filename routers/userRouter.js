const express = require('express');
const userController = require('../controller/userController');
const passport = require('passport')
const router = express.Router();
router.post('/save', userController.saveUser);
// router.get('/getAll',passport.cheakAuthentication,userController.getUser);
// router.get('/getAll', passport.authenticate('jwt', { session: false }), userController.getUser);
router.get('/getAll',userController.getUser);

router.get('/delete/:id', userController.deleteUser);
router.post('/update/:id', userController.updateUser);
router.post('/login', passport.authenticate('local'), userController.login);
router.get('/logout', userController.logout);
router.post('/loginjwt', userController.jwtLogin)
router.get('/home', userController.home);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/fail' }), (req, res) => {
    return res.json({
        Message: "User Login By Google"
    })
});

router.get('/fail', (req, res) => { return res.json({ Message: "There is Error With Google Login" }) })


module.exports = router;