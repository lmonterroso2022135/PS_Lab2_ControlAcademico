const Curso =  require('../models/curso');
const {response} = require('express');

const cursoGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

const cursoGetId = async (req, res) =>{
    const{id} = req.params;
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        curso
    });
}

const cursoPost = async(req, res) => {
    const {nombreCurso, descripcion, bimestres, profesor} = req.body;
    const curso = new Curso({nombreCurso, descripcion, bimestres, profesor});
    
    await curso.save();
    res.status(202).json({
        curso
    });
}

const cursoDelete  = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findByIdAndUpdate(id, {estado: false});
    const cursoAutenticado = req.curso;

    res.status(200).json({
        mdg: 'Curso a eliminar',
        curso,
        cursoAutenticado
    });
}

const cursoPut = async (req, res = response) =>{
    const {id} =req.params;
    const {_id, ...resto} = req.body;

    const curso = await Curso.findByIdAndUpdate(id, resto);

    res.status(200).json({
        mdg: 'Curso actualizado',
        curso
    });
}

module.exports ={
    cursoPost,
    cursoGet,
    cursoGetId,
    cursoDelete,
    cursoPut
}