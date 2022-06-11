require('./config/loadEnv')
require('./config/firebase')
const express = require('express');
const { logger } = require('./shared/logger');
const mongoUtils = require('./shared/mongoUtils');
const app = express();
const port = process.env.PORT
const auth = require('./routes/auth');
const user = require('./routes/user');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { NotFoundError } = require('./ErrorHandling/notFound-errors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(passport.initialize());

app.all('*', async (req, res)=>{
    throw new NotFoundError();
})

require("./middlewares/jwt")(passport);

require('./routes/index')(app);

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1); // mandatory (as per the Node.js docs)
  });
  

mongoUtils.connectToServer((err, client)=>{
    if (err) console.log(err);
    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    })
})


