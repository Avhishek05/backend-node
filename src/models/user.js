const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Token = require('./token');

// @ts-ignore
let UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Your email is required',
        // @ts-ignore
        trim: true
    },
    // @ts-ignore
    username: {
        type: String,
        unique: true,
        required: 'Your username is required',
    },
    // @ts-ignore
    password: {
        type: String,
        required: 'Your password is required',
        max: 100
    },

    // @ts-ignore
    firstName: {
        type: String,
        required: 'First Name is required',
        max: 100
    },

    // @ts-ignore
    lastName: {
        type: String,
        required: 'Last Name is required',
        max: 100
    },
    profileImage: {
        type: String,
        required: false,
        max: 255
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },
    
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});


UserSchema.pre('save',  function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(error, hash) {
            if (error) return next(error);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
};

UserSchema.methods.generateVerificationToken = function() {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};

UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};


module.exports = mongoose.model('Users', UserSchema);
