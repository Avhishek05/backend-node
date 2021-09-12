const auth = require('./auth');
const user = require('./user');

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
};
