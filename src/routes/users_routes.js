const {Router} = require('express');
const router = Router();

const {logOut,renderSigninForm,renderSignupForm,signIn,signUp} = require('../controllers/users_controller');

router.get('/users/signup', renderSignupForm);

router.post('/users/signup', signUp);

router.get('/users/signin', renderSigninForm);

router.post('/users/signin', signIn);

router.get('/users/logout', logOut);


module.exports = router;