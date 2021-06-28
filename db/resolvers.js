const Categoria = require('../models/Categoria');
const Meme = require('../models/Meme');
const Comentario = require('../models/Comentario');
const Autorizado = require('../models/Autorizados');
require('dotenv').config({path: 'variables.env'});
const jwt = require('jsonwebtoken');
const crearToken = (codigo, secreta, expiresIn) => {
    console.log(codigo);
    console.log(secreta);
    console.log(expiresIn);
    const {id} = codigo;
    return jwt.sign({id}, secreta, {expiresIn})
}



const resolvers = {
    Query: {
    obtenerCategorias: async () => {
        try {
            const categorias = await Categoria.find({});
            return categorias
        } catch (error) {
            console.log(error);
        }
    },
    obtenerCategoria: async (_, {id}) => {
        const categoria = await Categoria.findById({_id: id});
        if(!categoria){
            throw new Error('Categoria no encontrada');
        };
        return categoria
    },
    obtenerMemes: async () => {
        try {
            const memes = await Meme.find({});
            return memes;
        } catch (error) {
            console.log(error);
        }
    },
    obtenerMeme: async (_, {id}) => { 
        const meme = await Meme.findById({_id: id});
        if(!meme){
            throw new Error('ese meme no existe');
        }
        return meme;
    },
    obtenerMemesPorCategoria: async (_, {input}) => {
        const {categoria} = input;
        try {
            const memes = await Meme.find({ categoria });
            return memes
        } catch (error) {
            
        }
    },
    obtenerComentario: async (_, {id}) => {
        const comentario = await Comentario.findById({_id: id});
        if(!comentario) {
            throw new Error('no existe ese comentario');
        }
        return comentario;
    },
    obtenerComentariosPorMeme: async (_, {input}) => {
        const {meme} = input;
        try {
            const comentarios = await Comentario.find({ meme});
            return comentarios
        } catch (error) {
            console.log(error)
        }
    },
    memesMasComentados: async () => {
        const memes= await Comentario.aggregate([
            {$group: {
                _id: "$meme",
                total: {$sum: 1}
            }},
            {
                $lookup: {
                    from: 'memes',
                    localField: '_id',
                    foreignField: '_id',
                    as: "meme"
                }
            },
            { 
                $unwind: {
                  path: "$fullMatches",
                  preserveNullAndEmptyArrays: true
                }
              },
            {
                $sort: {total: -1}
            },
            {
                $limit: 3
            }
        ]);
        return memes;
    }

},
    Mutation: {
       
        nuevaCategoria: async (_, { input }) => {
            try {
                const categoria = new Categoria(input);
                const resultado = await categoria.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarCategoria: async (_, {id, input}) => {
            let categoria = await Categoria.findById(id);
            if(!categoria){
                throw new Error('Categoria no encontrada');
            }
             categoria = await Categoria.findOneAndUpdate( {_id: id}, input, {new: true});

            return categoria;

        },
        eliminarCategoria: async(_, {id}) => {
            let categoria = await Categoria.findById(id);
            if(!categoria){
                throw new Error('Categoria no encontrada');
            }

            await Categoria.findByIdAndDelete({_id: id});
            return "Categoria Eliminada"
        },
        nuevoMeme: async (_, {input}) =>{
            const {categoria} = input;

            let categoriadisponible = await Categoria.findById(categoria);

            if(!categoriadisponible) {
                throw new Error('No existe esta categoria para crear memes');
            }


            const memeCreado = new Meme(input);

            const resultado = await memeCreado.save();

            return resultado
        },
        actualizarMeme: async (_, {id, input}) => {
            let meme = await Meme.findById(id);

            if(!meme){
                throw new Error('Meme no encontrado')
            }
            meme = await Meme.findByIdAndUpdate({_id: id}, input, {new: true});

            return meme;
        },
        eliminarMeme: async (_, {id}) => {
            let meme = await Meme.findById(id);

            if(!meme){
                throw new Error('Meme no encontrado')
            }

            meme = await Meme.findByIdAndDelete({_id:id});
            return('Meme Eliminado');
        },
        nuevoComentario: async (_, {input}) => {
            const {meme} = input;

            let memedisponible = await Meme.findById(meme);

            if(!memedisponible) {
                throw new Error('No existe este meme para comentar o lo eliminaron');
            }
            const ComentarioCreado = new Comentario(input);

            const resultado = await ComentarioCreado.save();

            return resultado;
        },
        actualizarComentario: async (_, {id, input}) => {
            let comentario = await Comentario.findById(id);

            if(!comentario){
                throw new Error('Comentario no encontrado')
            }
            comentario = await Comentario.findByIdAndUpdate({_id: id}, input, {new: true});

            return comentario;
        },
        eliminarComentario: async (_, {id}) => {
            let comentario = await Comentario.findById(id);

            if(!comentario){
                throw new Error('Comentario no encontrado')
            }

            comentario = await Comentario.findByIdAndDelete({_id:id});
            return('Comentario Eliminado');
        },
        nuevoAutorizado: async (_, {input}) => {
            const AutorizadoCreado = new Autorizado(input);

            const resultado = await AutorizadoCreado.save();

            return resultado;
        },
        autenticarAutorizado: async(_, {input}) => {
            const {codigoAutorizacion} = input;

            const existeCodigo = await Autorizado.findOne({codigoAutorizacion});
            if(!existeCodigo) {
                throw new Error('Codigo Incorrecto')
            }

            return{
                token: crearToken(existeCodigo, process.env.SECRETA, '24h')
            }
        }
    }
}

module.exports = resolvers;