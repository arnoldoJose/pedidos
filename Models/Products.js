const mongoose = require('mongoose'); // Erase if already required
require('../Config/config');
var productSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true,
    },
    precio: {
      type: String,
      required: true,
    },
    categoria:{
      type: String,
      required: true
    },
    img:{
      type: String,
      required: false
    }
});


module.exports = mongoose.model("Product", productSchema);