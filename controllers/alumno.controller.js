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



module.exports = {
    alumnoPost,
    alumnosGet
}