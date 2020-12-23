


let consultRol = (req,res,next) => {

  let {rol} = req.usuario;

  if (rol === "ADMIN_ROLE") {
    next();
  } else {
    res.json({ message: "No eres administardor",rol: rol });
  }

}

module.exports = consultRol;