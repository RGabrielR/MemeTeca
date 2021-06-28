const mongoose = require('mongoose');


const MemeSchema = mongoose.Schema({
    imagen:{
        type: String,
            required: true,
            trim: true
        },
    nombre:{
    type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Categoria'
    },
    creado: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Meme', MemeSchema);