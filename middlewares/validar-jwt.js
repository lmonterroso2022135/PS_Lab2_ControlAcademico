const jwt = require ('jsonwebtoken');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const {request, response} = require ('express');

const validarJWT = async (req = request, res = response, next) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try {
        const {uid} = jwt.verefy(token, process.env.CUCHURRUMIN);

        const usuario = await Alumno.findById(uid);

        if (!usuario){
            usuario = await Profesor.findById(uid);
            
            if(!usuario){
                return res.status(401).json({
                    msg: "Usuario no existe en la base de datos"
                });
            }
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no válido, usuario con estado false"
            });
        }

        req.usuario = usuario;
        next();

    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
}

module.exports = {
    validarJWT
}