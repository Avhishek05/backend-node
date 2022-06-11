const Router = require('express').Router;
const { check } = require('express-validator')
const User = require('../controllers/user')
const validate = require('../middlewares/validator')

const router = new Router();

router.get('search/:searchText', validate, User.findUser);
router.post('/connect', validate, User.connectUser);

module.exports = router;