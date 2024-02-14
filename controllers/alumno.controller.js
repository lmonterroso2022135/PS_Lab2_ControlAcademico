const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const { response } = require('express');

const alumnosGet = async (req, res = responde) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, alumnos] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumnos
    });
}

const alumnoGetId = async (req, res) => {
    const {id} = req.params;
    const alumno = await Alumno.findOne({_id: id});

    res.status(200).json({
        alumno
    });
}

const alumnoPost  = async (req, res) => {
    const {nombre, correo, password, grado} = req.body;
    const alumno = new Alumno({nombre, correo, password, grado});

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    res.status(202).json({
        alumno
    });
}

const alumnoDelete = async (req, res) =>{
    const {id} = req.params;
    const alumno = await Alumno.findByIdAndUpdate(id, {estado: false});
    const alumnoAutenticado = req.alumno;

    res.status(200).json({
        msg: 'Alumno a eliminar',
        alumno,
        alumnoAutenticado
    });
}

const alumnoPut = async (req, res = response) =>{
    const {id} = req.params;
    const {_id, password, correo, ...resto} = req.body;
    
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const alumno = await Alumno.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Usuario Actualizado Exitosamente!!!',
        alumno
    });

}

module.exports = {
    alumnoPost,
    alumnosGet,
    alumnoGetId,
    alumnoDelete,
    alumnoPut
}