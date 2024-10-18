import { Schema, Types } from "mongoose";

const mongoose = require('mongoose');


const sagaSchema = new Schema({
    id:{
        type: Number,
        required:[ true,'El id es necesario']
    },
    nombre:{
        type: String,
        required:[ true,'El nombre es necesario']
    },
    generos_principales:{
        type: [Types.ObjectId],
        ref: 'Genero'
    },
    juegos_principales:{
        type: [Types.ObjectId],
        ref: 'Game'
    },
    spin_offs:{
        type: [Types.ObjectId],
        ref: 'Game'
    },
    backgroundImage:{
        type: String,
    },
    key_name:{
        type: String,
    }
})

export const SagaModel = mongoose.model('Saga', sagaSchema);