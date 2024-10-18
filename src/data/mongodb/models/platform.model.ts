import mongoose, { Schema } from 'mongoose';

const platformSchema = new Schema({
    id:{
        type: Number,
        required:[ true,'El id es necesario']
    },
    nombre:{
        type: String,
        required:[ true, "El nombre es necesario"]
    },
    slug:{
        type: String,
    },
    año_lanzamiento:{
        type: Number,
    }

}) 

export const PlatformModel = mongoose.model('Plataformas', platformSchema);