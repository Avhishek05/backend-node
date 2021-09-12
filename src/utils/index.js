const path = require('path');
const cloudinary = require('../config/cloudinary');
const sgMail = require('@sendgrid/mail');

class Utils {

    static uploader1(req) {
        return new Promise((resolve, reject) => {
            let data = "data:base64" + Buffer.from(req.file.buffer).toString('base64').replace(/(\r\n|\n|\r)/gm,"");
            cloudinary.uploader.upload(data, (err, url) => {
                if (err) return reject(err);
                return resolve(url);
            })
        });
    }
    static uploader(fileBuffer) {
        return new Promise((resolve, reject) => {
          // Sadly, this method does not support async/await
          cloudinary.uploader.upload_stream({ public_id: 'my_picture' }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }).end(fileBuffer);
        });
      }

    static sendEmail(mailOptions) {
        console.log(mailOptions)
        return new Promise((resolve, reject) => {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            sgMail.send(mailOptions, (error, result) => {
                console.log(error)
                if (error) return reject(error);
                return resolve(result);
            });
        });
    }

}

module.exports = Utils;