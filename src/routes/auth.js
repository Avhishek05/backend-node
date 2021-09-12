const Router = require('express').Router;
const {check} = require('express-validator')
const router = new Router();
const validate = require('../middlewares/validator')
const Auth = require('../controllers/auth')

router.post("/login", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], validate, Auth.login);


router.post("/register", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('firstName').not().isEmpty().withMessage('Your first name is required'),
    check('lastName').not().isEmpty().withMessage('Your last name is required')
], validate, Auth.register);

router.get('/verify/:token', Auth.verify);
// router.post('/resend', Auth.resendToken);

router.post('/recover', [
    check('email').isEmail().withMessage('Enter a valid email address'),
], validate, Auth.recover);

router.get('/reset/:token', Auth.reset);

router.post('/reset/:token', [
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
], validate, Auth.resetPassword);


module.exports = router;