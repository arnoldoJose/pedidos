


let consultRol = (req,res,next) => {

  let {rol} = req.usuario;

  if (rol === "ADMIN_ROLE") {
    next();
  } else {
    res.json({ message: "No eres administardor",});
  }

}

module.exports = consultRol;