const mongoose = require('mongoose');
import { GameEntity } from "../../enitities/game.entity";
import { SagaEntity } from "../../enitities/saga.entity";

export class UpdateGameAndSagaDto{
    private constructor(
        public _idGame: string,
        public _idSaga: string,
        public gameInfo: GameEntity,
        public sagaInfo: SagaEntity

    ){}


    static query ( _idGame: string, _idSaga: string, object: {[key:string]: any} ): [string?, UpdateGameAndSagaDto?]{

        const  { gameInfo, sagaInfo }  = object;

        if ( !_idGame ) return ['Missing Id Game'];
        if ( !_idSaga ) return ['Missing Id Saga'];
        if (!mongoose.Types.ObjectId.isValid(_idGame)) return ['Invalid ID Game format'];
        if (!mongoose.Types.ObjectId.isValid(_idSaga)) return ['Invalid ID Saga format'];
        if ( !gameInfo ) return ['Missing Game Info']
        if ( !sagaInfo ) return ['Missing Saga Info']
        return [
            undefined,
            new UpdateGameAndSagaDto( _idGame, _idSaga, gameInfo, sagaInfo )
        ]
    }

}