const Router = require('express').Router;
const {check} = require('express-validator')
const User = require('../controllers/user')

const router = new Router();
const multer = require('multer');
const upload = multer().single('file');

router.put('/', upload, User.update);

module.exports = router;