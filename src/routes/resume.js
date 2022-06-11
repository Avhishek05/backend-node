const Router = require('express').Router;
const { check } = require('express-validator')
const Resume = require('../controllers/resume')
const validate = require('../middlewares/validator')

const router = new Router();

router.post('/', [
    check('name').not().isEmpty().withMessage('Your first name is required'),
], validate, Resume.add);

router.get('/:id', validate, Resume.getById);
router.get('/', validate, Resume.getAllOfCurrentUser);
router.post('/download', Resume.download)

module.exports = router;