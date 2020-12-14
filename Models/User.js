const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
      
    },
    email:{
        type:String,
        required:true,
        
    },
    mobile:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    rol:{
        type: String,
        required: false
    }
});

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model('User', userSchema);