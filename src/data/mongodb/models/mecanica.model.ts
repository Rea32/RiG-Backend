import mongoose, { Schema } from 'mongoose';

const mecanicaSchema = new Schema({
    nombre:{
        type: String,
        required:[ true, "El nombre es necesario"]
    },
    slug:{
        type: String,
    },
}) 

export const MecanicaModel = mongoose.model('Mecanicas', mecanicaSchema);