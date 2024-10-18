import mongoose, { Schema } from 'mongoose';

const publisherSchema = new Schema({
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

export const PublisherModel = mongoose.model('Editoras', publisherSchema);