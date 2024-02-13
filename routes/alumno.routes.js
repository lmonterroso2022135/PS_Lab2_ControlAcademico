const {Router} = require ('express');
const {check} = require ('express-validator');

const {
    alumnoPost,
    alumnosGet
    } = require("../controllers/alumno.controller");

const router = Router();

router.get("/", alumnosGet);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("correo", "Este no es un correo valido").isEmail(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("grado", "El grado no puede estar vacio").not().isEmpty(),        
    ], alumnoPost);

module.exports = router;