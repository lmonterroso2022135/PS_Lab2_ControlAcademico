const Alumno = require ('../models/alumno');
const Profesor = require ('../models/profesor');

const existenteEmailAlumno = async (correo = '') => {
    const existeEmail = await Alumno.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}
const existenteEmailProfe = async (correo = '') => {
    const existeEmail = await Profesor.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}
const existeAlumnoById = async (id = '') => {
    const existeUsuario = await Alumno.findOne({id});
    if(existeUsuario){
        throw new Error(`El alumno con el ${ id } no existe`)
    }
}
const existeProfeById = async (id = '') => {
    const existeUsuario = await Profesor.findOne({id});
    if(existeUsuario){
        throw new Error(`El profesor con el ${ id } no existe`)
    }
}

module.exports = {
    existenteEmailAlumno,
    existenteEmailProfe,
    existeAlumnoById,
    existeProfeById
}