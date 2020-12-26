
 const jwt = require("jsonwebtoken");
 require('../Config/config');

module.exports = (req,res,next) => {
  
  // return console.log(req);
  const HeaderToken = req.get("Authorization");

  if(!HeaderToken){
    const error = new Error("no header");
    error.statusCode = 401;
    throw error;
  }
  let token = HeaderToken.split(" ")[1];

  let tokenReview;

  try {
    tokenReview = jwt.verify(token, process.env.KEY);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if(!tokenReview){
    const error = new Error("no token");
    error.statusCode = 401;
    throw error;
  }

  req.usuario = tokenReview.usuario
  // console.log(tokenReview.usuario);
  next();
  // console.log(token);
}


