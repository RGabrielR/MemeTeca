const mongoose = require('mongoose');


const AutorizadoSchema = mongoose.Schema({
    codigoAutorizacion:{
    type: String,
        required: true,
        trim: true
    },
   

});

module.exports = mongoose.model('Autorizado', AutorizadoSchema);