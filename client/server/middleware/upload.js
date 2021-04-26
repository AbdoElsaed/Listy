const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(cb);
//     cb(null, path.join(__dirname, '../uploads/'));
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, file.originalname);
//   }
// });

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "listy-users",
    metadata (req, file, cb) {
      console.log(file);
      cb(null, { fieldName: file.fieldname });
    },
    key (req, file, cb) {
      file.region = process.env.AWS_REGION;
      cb(null, `${Date.now().toString()} - ${file.originalname}`);
    }
  })
});

const publicUpload = multer({
  storage: multerS3({
    s3,
    bucket: "listy-users",
    acl: 'public-read',
    metadata (req, file, cb) {
      console.log(file);
      cb(null, { fieldName: file.fieldname });
    },
    key (req, file, cb) {
      file.region = process.env.AWS_REGION;
      cb(null, `${Date.now().toString()} - ${file.originalname}`);
    }
  })
});

module.exports = { upload, publicUpload };