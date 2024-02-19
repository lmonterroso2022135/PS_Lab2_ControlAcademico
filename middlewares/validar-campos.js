const { validationResult } = require("express-validator");


const validarCampos = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }

  next();
};

const validarCursos = async(req, res, next) =>{
  try {
    const alumno = req.usuario;
    const {cursoId} = req.body;
    
    if (alumno.cursos.includes(cursoId)) {
      return res.status(400).json({ msg: 'Ya estás asignado a este curso.'});
    }
    if (alumno.cursos.length >= 3) {
      return res.status(400).json({ msg: 'Ya estás asignado a tres cursos más.'});
    }
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al validar los cursos del alumno' });
  }
}



module.exports = {
  validarCampos,
  validarCursos
};