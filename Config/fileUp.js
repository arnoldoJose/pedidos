const multer = require('multer');
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
  destination: path.join(__dirname,'../Storage/Images'),
  filename: function (req,file,cb) {
    let extencion = file.mimetype.split("/")[1];
    cb(null, `${shortid.generate()}.${extencion}`)
  }
});


const upload = multer({storage});

module.exports = upload;