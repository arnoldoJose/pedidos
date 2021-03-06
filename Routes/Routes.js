const { Router } = require("express");
const route = Router();
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Products = require("../Models/Products");
const Compra = require('../Models/Compras');
const  rol = require('../Middleware/Rules');
const verificaToken = require('../Middleware/AUTH');
const upload = require('../Config/fileUp');
const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
require('dotenv').config({path: 'variables.env'});
require("../Config/config");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

route.get("/", (req, res) => {
  res.json({ message: "token invalido" });
});

route.post("/user-register", (req, res) => {
  let { name, email, mobile, password } = req.body;

  const user = new User();
  user.name = name;
  user.email = email;
  user.mobile = mobile;
  user.password = user.encryptPassword(password);

  user.save();

  res.json({ user });
  //hacer lo mismo del login y crear el token aqui tambien
});

route.post("/user-login", (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email: email }).exec((err, userDB) => {
    if (err) {
      res.status(400).json({ message: "hubo un error" });
    }

    if (!userDB) {
      res.status(401).json({
        err: true,
        message: "el usuario  no existe",
      });
      return;
    }

    if (!userDB.validatePassword(password)) {
      res.status(401).json({
        err: true,
        message: "el password no existe",
      });
      return;
    } else {
      let token = jwt.sign(
        {
         usuario: userDB,
        },
        process.env.KEY,
        { expiresIn: process.env.EXPIRATE }
      );

     
      res.status(200).json({
        token: token,
        user: userDB,
      });
    }
  });
});

route.post("/new-product",(req, res) => {
  let { body: prod } = req;

  let product = new Products(prod);

  product.save();

  res.json(product);
});

route.get("/product/all", async (req, res) => {
  let categoria = req.query.categoria;

  let data = await Products.find({ categoria: categoria });

  res.json(data);
});

route.get("/obtener/orden", async (req, res) => {
  let {name,categoria} = req.query;

  let data = await Products.find({ name: name,categoria: categoria});
  
  if(data.length === 0){
    res.json({message: "producto no encontrado"})
  }else{
    res.json(data);
  }
    // let data = datos.filter(prod => prod.categoria === categoria);
});

route.get("/obtener/producto/:id", async(req,res)=>{
  let {id} = req.params;
  let data = await Products.findById(id);

  res.json(data);
})


route.post("/add-product", [verificaToken,rol],upload.single("image"), async(req, res) => {
  
  let path = req.file.path;

  let data = await cloudinary.uploader.upload(path);

  let { name, precio, categoria } = req.body;

  let product = new Products({name,precio,categoria,img: data.url,});
 
  product.save();

  fs.unlinkSync(path);

  res.json({message: 'nuevo producto agregado'})

});


route.post("/compra", (req, res) => {
  let { name, precio, img } = req.body;

  let newCompra = new Compra({ name: name, precio: precio, img: img });

  newCompra.save();
});

route.get("/miscompras",(req,res) => {

      Compra.find().exec((err,data) => {
        if(err){
          res.json({message: "hubo un error"});
        }
        res.status(200).json(data);
      });
});

route.delete("/eliminar/pedio/:id", (req,res) => {
  let id = req.params.id;
   Compra.findByIdAndDelete(id, err => {
     if(err){
       res.status(401).json({message: 'hubo un error'})
     }else{
       res.status(200).json({message: 'compra eliminada'});
     }
   });
 
})

module.exports = route;
