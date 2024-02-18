const { response } = require("express");


const esProfesorRole = (req, res, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: "Se requiere iniciar sesion para hacer esta accion"
        });
    }

    
    const {role, nombre} =  req.usuario;


    if(role !== "TEACHER_ROLE"){
        return res.status(401).json({
            msg: `${nombre} No tiene acceso porque no es un Profesor`
        });
    };
    next();
}
const esAlumnoRole = (req, res, next) => {
    if(!req.usuario){
        return res.status(500).json({
            msg: "Se requiere iniciar sesion para hacer esta accion"
        });
    }

    const { role, nombre } =  req.usuario;

    if(role !== "STUDENT_ROLE"){
        return res.status(401).json({
            msg: `${nombre} No tiene acceso porque no es un Alumno`
        });
    };
    next();
}

module.exports ={
    esAlumnoRole,
    esProfesorRole

}