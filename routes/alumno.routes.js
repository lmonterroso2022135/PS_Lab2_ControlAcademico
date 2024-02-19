const {Router} = require ('express');
const {check} = require ('express-validator');
const {existenteEmailAlumno, existeAlumnoById} = require ('../helpers/db-validators') 
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos} = require('../middlewares/validar-campos');
const {
    alumnoPost,
    alumnosGet,
    alumnoGetId,
    alumnoDelete,
    alumnoPut
    } = require("../controllers/alumno.controller");

const router = Router();

router.get("/", alumnosGet);

router.post(
    "/registrarse",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmailAlumno),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("grado", "El grado no puede estar vacio").not().isEmpty(), 
        validarCampos       
    ], alumnoPost);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeAlumnoById) 
    ], alumnoGetId);

router.delete(
    "/perfil",
    [   
        validarJWT,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeAlumnoById) 
    ], alumnoDelete);

router.put(
    "/perfil",
    [
        validarJWT,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeAlumnoById)
    ], alumnoPut);

module.exports = router;