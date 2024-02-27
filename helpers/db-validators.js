const Alumno = require ('../models/alumno');
const Profesor = require ('../models/profesor');
const Curso = require('../models/curso')

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
const existenteCurso = async (nombreC = '') =>{
    const existeCurso = await Curso.findOne({nombreCurso: nombreC});
    if(existeCurso){
        console.log('SI EXISTE CURSO')
        throw new Error('Ya existe un curso con este nombre');
    }
}
const existeAlumnoById = async (id = '') => {
    const existeUsuario = await Alumno.findOne({id});
    if(existeUsuario){
        throw new Error(`El alumno no existe`)
    }
}
const existeProfeById = async (id = '') => {
    const existeUsuario = await Profesor.findOne({id});
    if(existeUsuario){
        throw new Error(`El profesor no existe`)
    }
}

module.exports = {
    existenteEmailAlumno,
    existenteEmailProfe,
    existeAlumnoById,
    existeProfeById,
    existenteCurso
}