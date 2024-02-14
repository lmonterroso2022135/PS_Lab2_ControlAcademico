const {Router} = require ('express');
const {check} = require ('express-validator');

const {
    cursoPost,
    cursoGet,
    cursoGetId,
    cursoDelete,
    cursoPut
    } = require("../controllers/curso.controller");

const router = Router();

router.get("/", cursoGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id'),  
    ], cursoGetId
)

router.post(
    "/",
    [
        check("nombreCurso", "Especificar el nombre del curso").not().isEmpty(),
        check("descripcion", "Agregue una descripcion").not().isEmpty(),
        check("bimestres", "Especificar el numero de bimestres").not().isEmpty(),
        check("profesor", "El apartado de maestro no puede estar vacío").not().isEmpty(),
    ], cursoPost);

router.delete(
    "/",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id'), 
    ], cursoDelete)

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id'),
    ], cursoPut)

module.exports = router;


