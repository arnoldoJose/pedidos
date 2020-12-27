const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null, `${__dirname}/Upload`)
  },
  filename: function (req,file,cb) {
    cb(null, `${file.fieldname}-${Date.now()}`)
  }
});

const upload = multer({storage});

module.exports = upload;