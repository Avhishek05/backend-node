const User = require('../models/user');
const Utils = require('../utils/index');
const firebase = require('../config/firebase');
var gravatar = require('gravatar');
const nodeMailer = require('nodemailer');
const { error } = require('winston');
const passss = "Qwerty@123A"

exports.update = async function (req, res) {
    try {
        const update = req.body;
        // const id = req.params.id;
        const userId = req.user._id;

        // if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});

        const user = await User.findByIdAndUpdate(userId, { $set: update }, { new: true });

        if (!req.file) return res.status(200).json({ user, message: 'User has been updated' });
        const result = await Utils.uploader(req.file.buffer);
        const user_ = await User.findByIdAndUpdate(userId, { $set: { profileImage: result.url } }, { new: true });
        return res.status(200).json({ user: user_, message: 'User has been updated' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  

exports.findUser = async function (req, res) {

    let searchText = req.params.searchText;
    try {
        const users = await User.find({ $or: [{ username: `${searchText}` }, { firstName: `${searchText}` }, { lastName: `${searchText}` }] });
        return res.status(200).json({ user: users, message: 'User found successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.connectUser = async function (req, res) {
    try {
        let userId = req.body.id;
        let _user = await User.findById(userId);
        console.log(_user)
        var db = firebase.admin.database();
        var ref = db.ref("channels1");

        ref.set({
            [userId]: {
                createdBy: req.user._id,
                description: "",
                members: {
                    [userId]: {
                        name: _user.firstName + _user.lastName,
                        pic: gravatar.url(userId)
                    }
                }
            }
        })

        // ref.once("value", function (snapshot) {
        //     console.log(snapshot.val());
        //     return res.status(200).json({ user: snapshot.val(), message: 'User has been updated1' });

        // });
        // create a new table in firebase db with default msg.
        // return res.status(200).json({ user: {}, message: 'User has been updated1' });

    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

exports.sendMail = async function (req, res) {
    try {
        let transport = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
              user: "yadavabhishek260@gmail.com",
              pass: passss,
            },
          });

          let mailDetails = {
            from: 'xyz@gmail.com',
            to: 'abhishek.yadav@dsilo.io',
            subject: 'Test mail',
            text: 'Node.js testing mail for GeeksforGeeks'
        };
          
        transport.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs', err);
            } else {
                console.log('Email sent successfully');
            }
        });


        return res.status(200).json({ message: 'User has been updated' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};