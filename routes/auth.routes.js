const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/',
    [
        check('correo', "Este no es un correo válido").isEmail(),
        check('password', "la contraseña es obligatoria").not().isEmpty(),
        validarCampos
    ], login);

module.exports = router;