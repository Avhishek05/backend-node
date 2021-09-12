require('./config/loadEnv')
const express = require('express');
const { logger } = require('./shared/logger');
const mongoUtils = require('./shared/mongoUtils');
const app = express();
const port = process.env.PORT
const auth = require('./routes/auth');
const user = require('./routes/user');
const cookieParser = require('cookie-parser');
const passport = require('passport');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(passport.initialize());
require("./middlewares/jwt")(passport);

require('./routes/index')(app);


mongoUtils.connectToServer((err, client)=>{
    if (err) console.log(err);
    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    })
})


