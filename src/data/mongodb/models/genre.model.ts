import { Schema, Types } from "mongoose";

const mongoose = require('mongoose');



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
    importants_games: [{
        type: Types.ObjectId,
        ref: 'Game'
    }],
    last_games: [{
        type: Types.ObjectId,
        ref: 'Game'
    }],
    sub_genres:[{
        type: Types.ObjectId,
        ref: 'Genero',
    }],
    description:{
        type: String
    },
    image_background:{
        type: String,
    }
})

export const GenreModel = mongoose.model('Genero', genreSchema);