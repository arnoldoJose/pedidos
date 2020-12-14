const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var compraSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    precio:{
      type: String,
      required: true
    },
    img:{
      type: String,
      required: true
    }
});

//Export the model
module.exports = mongoose.model("Compras", compraSchema);