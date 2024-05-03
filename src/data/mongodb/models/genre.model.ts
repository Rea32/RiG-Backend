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

const genreSchema = new Schema({
    id:{
        type: Number,
        required:[ true,'El id es necesario']
    },
    name:{
        type: String,
        required:[ true,'El name es necesario']
    },
    slug:{
        type: String
    },
    parent:{
        type: Boolean,
    },
    games_count:{
        type: Number,
    },
    important_games:{
        type: Array,
    },
    sub_genres:{
        type: Array,
    },
    description:{
        type: String
    },
    image_background:{
        type: String,
    }
})

export const GenreModel = mongoose.model('Genero', genreSchema);