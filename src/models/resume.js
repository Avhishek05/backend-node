const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

let ResumeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bio: {
        type: String,
    },
    contacts: [],
    education: [{
        schoolName: String,
        degreeType: String,
        result: String,
        period: String,

    }],
    experience: [{
        companyName: String,
        role: String,
        period: String,
        jobDescription: [String]

    }],
    projects: [{
        title: String,
        technologiesUsed: [String],
        details: [String],
        link: String,
        repo: String
    }],
    aboutMe: String,
    achievements: [String],
    hobbiesOrInterests: [String],
    skills: {
        primarySkills: [String],
        secondarySkills: [String],
        tools: [String]
    }
})

module.exports = mongoose.model('Resume', ResumeSchema)