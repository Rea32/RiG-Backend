import { GameModel } from "../data/mongodb/models/game.model";
import { GenreModel } from "../data/mongodb/models/genre.model";
import { PlatformModel } from "../data/mongodb/models/platform.model";


export const updateGameDocuments = async () => {
    try {
        // Encuentra todos los documentos de Game
        const games = await GameModel.find({});

        // Recorre cada documento y actualiza los arrays de generos y plataformas
        for (const game of games) {
            // Actualiza generos
            const updatedGeneros = [];
            console.log(game)
            for (const generoId of game.generos) {
                const genero = await GenreModel.findOne({ id: generoId });
                if (genero) {
                    updatedGeneros.push(genero._id);
                }
            }

            // Actualiza plataformas
            const updatedPlataformas = [];
            for (const plataformaId of game.plataformas) {
                const plataforma = await PlatformModel.findOne({ id: plataformaId });
                if (plataforma) {
                    updatedPlataformas.push(plataforma._id);
                }
            }

            // Actualiza el documento de Game con los _id actualizados
            await GameModel.updateOne(
                { _id: game._id },
                { $set: { generos: updatedGeneros, plataformas: updatedPlataformas } }
            );

            console.log(`Updated game with ID: ${game._id}`);
        }

        console.log('All game documents updated successfully');
        process.exit(0); // Finaliza el proceso de Node.js
    } catch (error) {
        console.error('Error updating game documents:', error);
        process.exit(1); // Finaliza el proceso de Node.js con error
    }
};
