
import { GameModel } from "../../data/mongodb/models/game.model";
import { SagaModel } from "../../data/mongodb/models/saga.model";
import { UpdateGameAndSagaDto } from "../dtos";

import { UpdateSagaDto } from "../dtos/update-saga.dto";
import { SagaEntity } from "../enitities/saga.entity";
import { CustomError } from "../errors/custom.error";




export class UpdateGameAndSaga {
    constructor(

    ) { }

    async execute(updateGameAndSagaDto: UpdateGameAndSagaDto): Promise<any> {
        const { _idGame, _idSaga, gameInfo, sagaInfo } = updateGameAndSagaDto;
        const mongoose = require('mongoose');
        const { ObjectId } = mongoose.Types;
        let updatedGameAndSaga = {}
        try {
            const { juegos_principales: old_juegos_principales, spin_offs: old_spin_offs } = await SagaModel.findById(_idSaga, 'juegos_principales spin_offs');
            // console.log(old_juegos_principales, old_spin_offs)
            const updatedSaga = await SagaModel.findByIdAndUpdate(_idSaga, sagaInfo, { new: true });



            if (!updatedSaga) throw CustomError.badRequest('La saga no se ha actualizado');

            const new_juegos_principales = sagaInfo.juegos_principales.map((juego: any) => juego._id);
            const new_spin_offs = sagaInfo.spin_offs.map((juego: any) => juego._id);

            // Convert ids to strings to ensure comparison consistency
            const new_juegos_principales_idsStr = new_juegos_principales.map(String);
            const new_spin_offs_idsStr = new_spin_offs.map(String);

            // Find items in old_juegos_principales and spin_offs that are not in ids. Despues quita la saga y la pone en null, puesto que la hemos quitado al editar
            const nonMatchingJuegosPrincipales = old_juegos_principales.filter((juego: any) => !new_juegos_principales_idsStr.includes(String(juego._id)));
            if (nonMatchingJuegosPrincipales) nonMatchingJuegosPrincipales.forEach(async (id: any) => {
                await GameModel.findByIdAndUpdate(id, { $set: { saga: null } }, { new: true });
            });
            const nonMatchingSpinOffs = old_spin_offs.filter((juego: any) => !new_spin_offs_idsStr.includes(String(juego._id)));
            if (nonMatchingSpinOffs) nonMatchingSpinOffs.forEach(async (id: any) => {
                await GameModel.findByIdAndUpdate(id, { $set: { saga: null } }, { new: true });
            });
            //Procedemos a que todo juego que este en la saga se actualice para añadirse es saga al juego en cuestion. Si queremos diferenciar entre  principal y spin off no combinarlos
            const combinedIdsNewJuegos = new_juegos_principales_idsStr.concat(new_spin_offs_idsStr);
            if (combinedIdsNewJuegos) combinedIdsNewJuegos.forEach(async (id: any) => {
                await GameModel.findByIdAndUpdate(id, { $set: { saga: _idSaga } }, { new: true });
            });
            updatedGameAndSaga = {
                ...updatedGameAndSaga,
                saga: updatedSaga
            };
            // console.log("Termina saga")
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }


        try {
            // console.log("Empieza Game", gameInfo)
            const updatedGame = await GameModel.findByIdAndUpdate(new ObjectId(_idGame), {gameInfo}, { new: true });
            // console.log("Resultado llamamda BD: ", updatedGame);
            if (!updatedGame) throw CustomError.badRequest('El juego no se ha actualizado');

            updatedGameAndSaga = {
                ...updatedGameAndSaga,
                game: updatedGame
            };
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }



        return updatedGameAndSaga;
    }
}
