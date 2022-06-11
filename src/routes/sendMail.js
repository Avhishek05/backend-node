const Router = require('express').Router;
const { check } = require('express-validator')
const User = require('../controllers/user')
const validate = require('../middlewares/validator')

const router = new Router();

router.post('/send', validate, User.sendMail);

module.exports = router;