const {Router} = require ('express');
const {check} = require ('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos} = require('../middlewares/validar-campos');
const {
    profesorPost,
    profesoresGet,
    profesorGetId,
    profesorDelete,
    profesorPut
    } = require("../controllers/profesor.controller");
const { existenteEmailProfe, existeProfeById } = require('../helpers/db-validators');

const router = Router();

router.get("/", profesoresGet);

router.post(
    "/registrarse",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("telefono", "El numero de telefono debe ser de 8 digitos").isLength({min:8}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmailProfe),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        validarCampos
    ], profesorPost);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProfeById),
        validarCampos
    ], profesorGetId);

router.delete(
    "/perfil",
    [
        validarJWT
    ], profesorDelete);

router.put(
    "/perfil",
    [
        validarJWT,
    ], profesorPut)

module.exports = router;