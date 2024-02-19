const {Router} = require ('express');
const {check} = require ('express-validator');

const { esAlumnoRole, esProfesorRole} = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos, validarCursos} = require('../middlewares/validar-campos');

const {
    cursoPost,
    cursosGet,
    cursoDelete,
    cursoPut,
    cursosPorProfesor,
    cursosPorAlumno,
    asignacionAlumno
    } = require("../controllers/curso.controller");


const router = Router();

router.get("/", cursosGet);
router.get("/administrar", validarJWT, esProfesorRole, cursosPorProfesor);
router.get("/misCursos", validarJWT, esAlumnoRole, cursosPorAlumno);

    // CREA UN CURSO Y LE ASIGNA EL ID DEL PROFESOR LOGUEADO
router.post(
    "/administrar",
    [   
        validarJWT,
        esProfesorRole,
        check("nombreCurso", "Especificar el nombre del curso").not().isEmpty(),
        check("descripcion", "Agregue una descripcion").not().isEmpty(),
        check("bimestres", "Especificar el numero de bimestres").not().isEmpty(),
    ], cursoPost);

    // ELIMINA EL CURSO, LE CAMBIA EL ESTADO A FALSE
router.delete(
    "/administrar/:id",
    [
        validarJWT,
        esProfesorRole,
        check('id', 'No es un id válido').isMongoId(),
    ], cursoDelete)

    // ACTUALIZAR CURSO
router.put(
    "/administrar/:id",
    [   
        validarJWT,
        esProfesorRole,
        check('id', 'No es un id válido').isMongoId(),
    ], cursoPut)

    // ASIGNA EL USUARIO LOGUEADO A UN CURSO
router.post(
    "/misCursos",
    [
        validarJWT,
        esAlumnoRole,
        validarCursos,
        check("cursoId").notEmpty(),
        validarCampos 
    ], asignacionAlumno);

module.exports = router;


