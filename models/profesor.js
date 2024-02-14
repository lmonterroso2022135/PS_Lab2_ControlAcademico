const {Schema, model} = require('mongoose');

const ProfesorSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es un campo obligatorio']
    },
    telefono:{
        type: Number,
        require: [true, 'El telefono es un campo obligatorio']
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
        default: "TEACHER_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    }
})

ProfesorSchema.methods.toJSON = function(){
    const{__v, password, _id, ...profesor} = this.toObject();
    profesor.uid = _id;
    return profesor;
};

module.exports = model('Profesor', ProfesorSchema);

