const {request, response} = require("express");
const Alumno = require("../models/alumno");
const Profesor = require("../models/profesor");
const bycryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) =>{
    const {correo, password} = req.body;

    try {
        const usuario = await Alumno.findOne({correo});
        if (!usuario) {
            usuario = await Profesor.findOne({ correo });
            if (!usuario) {
                return res.status(400).json({
                    msg: "Credenciales incorrectas, correo no existe en la base de datos."
                });
            };
        };

        if(!usuario.estado){
            return res.status(400).json({
                msg:"El correo no existe en  la base de datos."
            });
        };

        const validarPassword = bycryptjs.compareSync(password, usuario.password);
        if(!validarPassword){
            return req.status(400).json({
                msg: "La contraseña es incorrecta"
            })
        }

        const token = await generarJWT(usuario.id);
        
        res.status(200).json({
            msg: "Bienvenido "+usuario.role,
            usuario,
            token
        })


    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    };
}

module.exports = {
    login
}