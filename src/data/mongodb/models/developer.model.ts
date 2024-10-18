import mongoose, { Schema } from 'mongoose';

const developerSchema = new Schema({
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
}) 

export const DeveloperModel = mongoose.model('Desarrolladoras', developerSchema);