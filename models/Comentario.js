const mongoose = require('mongoose');


const ComentarioSchema = mongoose.Schema({
    texto:{
    type: String,
        required: true,
        trim: true
    },
    meme: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Meme'
    },
    creado: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Comentario', ComentarioSchema);