const auth = require('./auth');
const user = require('./user');
const resume = require('./resume');
const find  = require('./find');

const authenticate = require('../middlewares/authenticate');
const sendMail = require('./sendMail');

module.exports = app => {
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/resume',authenticate, resume);
    app.use('/api/user', find);
    app.use('/api/mail', sendMail);
};
