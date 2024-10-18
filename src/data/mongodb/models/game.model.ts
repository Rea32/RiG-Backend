import { Schema, Types } from "mongoose";


const mongoose = require('mongoose');

const plataformasSchema = new Schema({
    _id: mongoose.ObjectId,
    id: Number,
    name: {
        type: String,
        alias: 'nombre'
    },
});
// const sagaSchema = new Schema({
//     _id: Types.ObjectId,
//     id: Number,
//     nombre: String,
//     key_name: String,
//     generos_principales: [],
//     juegos_principales: [],
//     spin_offs: [],
//     backgroundImage: String,

// });

const gameSchema = new Schema({

    titulo: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    saga: {
        type: Types.ObjectId || String,
        ref: 'Saga'
    },
    lanzamiento: {
        type: Date,
        required: [true, 'El lanzamiento es necesario']
    },
    plataformas: [{
        type: Types.ObjectId,
        ref: 'Plataformas',
        required: [true, 'Es necesario al menos una plataforma']
    }],
    generos: [{
        type: Types.ObjectId,
        ref: 'Genero',
        required: [true, 'Es necesario al menos un genero']
    }],

    desarrolladoras: [{
        type: Types.ObjectId,
        ref: 'Desarrolladoras',
        required: [true, 'Es necesario al menos una desarrolladora']
    }],
    editoras: [{
        type: Types.ObjectId,
        ref: 'Editoras',
        required: [true, 'Es necesario al menos una editora']
    }],
    tiendas: {
        type: Array
    },
    etiquetas: {
        type: [Types.ObjectId],
        ref: 'Tag'
    },
    backgroundImage: {
        type: String,
    },
    spinOff: {
        type: Boolean,
    },
    remasterOf: {
        type: [Types.ObjectId],
        ref: 'Game'
    },
    hasRemaster: {
        type: [Types.ObjectId],
        ref: 'Game'
    },
    remakeOf: {
        type: [Types.ObjectId],
        ref: 'Game'
    },
    hasRemake: {
        type: [Types.ObjectId],
        ref: 'Game'
    },
    dlcs: {
        type: Array,
    },
    isDlcOf: {
        type: Array
    },
    mecanicas: [{
        type: Types.ObjectId,
        ref: 'Mecanicas',
    }]
})

export const GameModel = mongoose.model('Game', gameSchema);