const {Router} = require ('express');
const {check} = require ('express-validator');

const { esAlumnoRole, esProfesorRole} = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    cursoGet,
    cursoGetId,
    cursoDelete,
    cursoPut,
    cursosPorProfesor
    } = require("../controllers/curso.controller");

const router = Router();

router.get("/", validarJWT, esProfesorRole, cursosPorProfesor);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
    ], cursoGetId
)

router.delete(
    "/:id",
    [
        validarJWT,
        esProfesorRole,
        check('id', 'No es un id válido').isMongoId(),
    ], cursoDelete)

router.put(
    "/:id",
    [   
        validarJWT,
        esProfesorRole,
        check('id', 'No es un id válido').isMongoId(),
    ], cursoPut)

module.exports = router;


