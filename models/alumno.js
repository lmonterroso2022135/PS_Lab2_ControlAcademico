const {Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es un campo obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'El correo es un campo obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'La contraseña es un campo obligatorio']
    },
    role:{
        type: String,
        default: "STUDENT_ROLE"
    },
    grado:{
        type: String,
        require: [true, 'El grado es un campo obligatorio']
    },
    cursos:{
        type: [String],
        default: []
    },
    estado:{
        type: Boolean,
        default: true
    }
});

AlumnoSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
};

module.exports = model('Alumno', AlumnoSchema);