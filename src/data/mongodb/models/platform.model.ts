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
    abreviacion:{
        type: String,
    },
    slug:{
        type: String,
    },
    generacion:{
        type: Number,
    }

}) 

export const PlatformModel = mongoose.model('Plataformas', platformSchema);