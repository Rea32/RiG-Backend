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
        type: Date || String,
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
    coverImage: {
        type: String,
    },
    screenshotsImages: {
        type: Array,
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
});
// Método para obtener juegos similares basados en géneros o mecánicas
gameSchema.methods.getSimilarGames = async function () {
    try {
        // Paso 1: Juegos que cumplen todos los valores de los tres atributos
        const nivel1 = await mongoose.model('Game').find({
            _id: { $ne: this._id }, // Excluimos el juego actual
            $and: [
                { generos: { $all: this.generos } },
                { mecanicas: { $all: this.mecanicas } },
                { etiquetas: { $all: this.etiquetas } },
            ],
        });

        // Paso 2: Juegos que cumplen todas las mecánicas y algunas etiquetas
        const nivel2 = await mongoose.model('Game').find({
            $and: [
                { mecanicas: { $all: this.mecanicas } },
                { etiquetas: { $in: this.etiquetas } },
            ],
            generos: { $in: this.generos },
        }).exec();

        // Paso 3: Juegos que cumplen algunos valores de cada categoría
        const nivel3 = await mongoose.model('Game').find({
            $or: [
                { generos: { $in: this.generos } },
                { mecanicas: { $in: this.mecanicas } },
                { etiquetas: { $in: this.etiquetas } },
            ],
        }).exec();

        // Combinar y devolver los resultados
        const similarGames = [...nivel1, ...nivel2, ...nivel3];

        return similarGames;
    } catch (error) {
        console.error('Error al buscar juegos:', error);
        throw error;
    }

};

export const GameModel = mongoose.model('Game', gameSchema);