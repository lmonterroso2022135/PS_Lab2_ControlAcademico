const {Schema, model} =  require('mongoose');

const CursoSchema = Schema({
    nombreCurso:{
        type: String,
        require: [true, 'El nombre del curso es un campo obligatorio'],
        unique: true
    },
    descripcion:{
        type: String,
        require: [true, 'Agregue una descripcion']
    },
    bimestres:{
        type: Number,
        require: [true, 'Especificar la cantidad de bimestres']
    },
    profesor:{
        type: Schema.Types.ObjectId,
        ref: 'Profesor',
        require: [true, 'El id del profesor es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

CursoSchema.methods.toJSON = function(){
    const{__v, _id, ...curso} = this.toObject();
    curso.uid = _id;
    return curso;
};

module.exports = model('Curso', CursoSchema);