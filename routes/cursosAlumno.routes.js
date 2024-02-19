const {Router} = require ('express');
const {check} = require ('express-validator');

const { esAlumnoRole} = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos, validarCursos} = require('../middlewares/validar-campos');

const {
    cursosPorAlumno,
    asignacionAlumno
    } = require('../controllers/curso.controller');

const router = Router();

router.get("/", validarJWT, esAlumnoRole, cursosPorAlumno);

router.post(
    "/",
    [
        validarJWT,
        esAlumnoRole,
        validarCursos,
        check("cursoId").notEmpty(),
        validarCampos
    ], asignacionAlumno)

module.exports = router;