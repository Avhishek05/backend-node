const User = require('../models/user');
const Utils = require('../utils/index');

exports.update = async function (req, res) {
    try {
        const update = req.body;
        // const id = req.params.id;
        const userId = req.user._id;

        // if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});

        const user = await User.findByIdAndUpdate(userId, {$set: update}, {new: true});
        if (!req.file) return res.status(200).json({user, message: 'User has been updated'});
        const result = await Utils.uploader(req.file.buffer);
        const user_ = await User.findByIdAndUpdate(userId, {$set: {profileImage: result.url}}, {new: true});
        return res.status(200).json({user: user_, message: 'User has been updated'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};