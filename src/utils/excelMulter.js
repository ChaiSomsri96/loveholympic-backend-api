const multer = require('multer');

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('spreadsheetml')
  ) {
    cb(null, true);
  } else {
    // throw new Error(JSON.stringify({
    //   message: i18n.__('Please upload an excel file!'),
    // }));
    cb('Please upload only excel file.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-festfive-${file.originalname}`);
  },
});

const uploadFile = multer({ storage, fileFilter: excelFilter });
module.exports = uploadFile;
