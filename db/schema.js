const {   gql   } = require('apollo-server');


const typeDefs = gql`


type Categoria {
    id: ID
    nombre: String
    descripcion: String
}
type Meme {
    _id: ID
    id: ID
    imagen: String
    nombre: String
    descripcion: String
    categoria: ID
    creado: String
}
type Comentario {
    id: ID
    texto: String
    meme: ID
    creado: String
}
type MasComentado {
    total: Float,
    meme: [Meme]

}
type Token {
    token: String
}
type Autorizacion {
    codigoAutorizacion: String
}
input CategoriaInput {
    nombre: String!
    descripcion: String
}
input MemeInput {
    imagen: String!
    nombre: String!
    descripcion: String!
    categoria: ID!
}
input CategoriaIDinput {
    categoria: ID!
}
input ComentarioInput {
    texto: String!
    meme: ID!
}
input MemeIdInput {
    meme: ID!
}
input AutorizacionInput {
    codigoAutorizacion: String
}
type Query {
    #Categoria
    obtenerCategorias: [Categoria]
    obtenerCategoria(id: ID!) : Categoria

    #Meme
    obtenerMemes : [Meme]
    obtenerMeme(id: ID!) : Meme
    obtenerMemesPorCategoria(input: CategoriaIDinput): [Meme]

    #Comentario
    obtenerComentario(id: ID!): Comentario
    obtenerComentariosPorMeme(input: MemeIdInput): [Comentario]

    # Busqueda Avanzada
    memesMasComentados: [MasComentado]
}
type Mutation {
   
   # Categoria
    nuevaCategoria(input: CategoriaInput) : Categoria
    actualizarCategoria( id: ID!, input: CategoriaInput) : Categoria
    eliminarCategoria(id: ID!): String

    # Meme
    nuevoMeme(input: MemeInput): Meme
    actualizarMeme(id: ID!, input: MemeInput) : Meme
    eliminarMeme(id: ID!) : String

    # Comentario
    nuevoComentario(input: ComentarioInput): Comentario
    actualizarComentario( id: ID!, input: ComentarioInput) : Comentario
    eliminarComentario(id: ID!) : String

    #Autorizacion Ingresar
    nuevoAutorizado(input: AutorizacionInput ): Autorizacion
    eliminarAutorizado(id: ID!) : String
    autenticarAutorizado(input: AutorizacionInput ): Token
}



`;

module.exports = typeDefs;