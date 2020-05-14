const userCtrl = {};
const User = require('../models/User');
const passport = require('passport');


userCtrl.renderSignupForm = (req, res)=>{

    res.render('users/signup');
};

userCtrl.signUp = async (req, res)=>{
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password!=confirm_password){
        errors.push({
            text:'Passwords do not match'
        });
    }

    if(password.length < 4){
        errors.push({
            text:'Passwords must be at least 4 characteres'
        });
    }

    if(errors.length > 0){
        res.render('users/signup', {errors, name, email});
    }else{
        const emailUserDB = await User.findOne({email:email})
        if(emailUserDB){
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Registered successfully');
            res.redirect('/users/signin');

        }
    }
};


userCtrl.renderSigninForm = (req, res)=>{

    res.render('users/signin');
};

userCtrl.signIn = passport.authenticate('local',{
    failureRedirect:'/users/signin',
    successRedirect:'/notes',
    failureFlash:true
})

userCtrl.logOut = (req, res)=>{

    req.logout();
    req.flash('success_msg', 'you are logged out know');
    res.redirect('/users/signin');
};



module.exports = userCtrl;