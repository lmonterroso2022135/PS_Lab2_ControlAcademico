const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');
const { response } = require('express');
const alumno = require('../models/alumno');

const profesoresGet = async (req, res = responde) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, profesores] = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        profesores 
    })
}

const profesorGetId = async (req, res) => {
    const {id} = req.params;
    const profesor = await Profesor.findOne({_id: id});

    res.status(200).json({
        profesor
    });
}

const profesorPost = async (req, res) => {
    const {nombre, telefono, correo, password} = req.body;
    const profesor = new Profesor({nombre, telefono, correo, password});

    const salt = bcryptjs.genSaltSync();
    profesor.password = bcryptjs.hashSync(password, salt);

    await profesor.save();
    res.status(202).json({
        profesor
    });
}

const profesorDelete = async (req, res) =>{
    const {id} = req.params;
    const profesor = await Profesor.findByIdAndUpdate(id, {estado: false}); 
    const profesorAutenticado = req.alumno;

    res.status(200).json({
        msg: 'Profesor a eliminar',
        profesor,
        profesorAutenticado
    });
}

const profesorPut = async (req, res = response) => {
    const {id} = req.params;
    const {_id, password, correo, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const profesor = await Profesor.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Profesor Actualizado',
        profesor
    })
}


module.exports = {
    profesorPost,
    profesoresGet,
    profesorGetId,
    profesorDelete,
    profesorPut
}





