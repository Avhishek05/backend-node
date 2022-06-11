const Resume = require('../models/resume');
const ObjectId = require('mongodb').ObjectId;
const ResumeParser = require('resume-parser');
const excel = require("exceljs");

exports.add = async function (req, res) {
    try {
        const userId = req.user._id;
        let _resume = new Resume({ ...req.body, userId });
        const resume = await _resume.save();
        return res.status(200).json({ user: resume, message: 'Saved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getById = async function (req, res) {
    try {
        let resume = await Resume.findOne({ _id: new ObjectId(req.params.id) })
        return res.status(200).json({ resume, message: 'Successfully fetched' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllOfCurrentUser = async function (req, res) {

    //     ResumeParser.parseResumeFile('./files/resume.doc', './files/compiled') // input file, output dir
    //   .then(file => {
    //     console.log("Yay! " + file);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    // await ResumeParser.parseResumeUrl('https://resume-resource.com/before-after/ba-ex04.pdf') // url
    //     .then(data => {
    //         console.log('Yay! ', data);
    //         return res.status(200).json({ message: data });

    //     })
    //     .catch(error => {
    //         console.error(error);
    //         return res.status(200).json({ error: error });

    //     });
    // return res.status(200).json({ error: 'error' });
    console.log(req.user)

    try {
       let resumes = await Resume.find({userId: req.user._id})
        return res.status(200).json({resumes, message: 'Successfully fetched'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.download = async function (req, res){
    let workbook = new excel.Workbook();
    let filename = 'sheet.xlsx';
    const data = [{name: 'Abhishek', age: 25}]
    let worksheet = workbook.addWorksheet('Tab-1');
    worksheet.columns = [{ header: "Name", key: "name", width: 100 },{ header: "Age", key: "age", width: 80 },];
    worksheet.addRows(data);
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + filename
    );
    return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
    });
}