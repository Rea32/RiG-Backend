import { Schema } from "mongoose";

const mongoose = require('mongoose');

const plataformasSchema = new Schema({
    _id:mongoose.ObjectId,
    id: Number,
    name: {
        type:String,
        alias: 'nombre'
    },
});

const gameSchema = new Schema({

    titulo:{
        type: String,
        required:[ true,'El titulo es necesario']
    },
    lanzamiento:{
        type: Date,
        required:[ true, 'El lanzamiento es necesario']
    },
    plataformas:{
        type: [plataformasSchema],
        required:[ true, 'Es necesario al menos una plataforma']
    },
    generos:{
        type: Array,
        required:[ true, 'Es necesario al menos un genero']
    },
    desarrolladoras:{
        type: Array,
        required:[ true, 'Es necesario al menos una desarrolladora']
    },
    editoras:{
        type: Array,
        required:[ true, 'Es necesario al menos una editora']
    },
    tiendas:{
        type: Array
    },
    etiquetas:{
        type: Array
    },
    backgroundImage:{
        type: String,
    }
})

export const GameModel = mongoose.model('Game', gameSchema);