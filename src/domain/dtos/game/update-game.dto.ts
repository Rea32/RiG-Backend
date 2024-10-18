const mongoose = require('mongoose');
import { GameEntity } from "../../enitities/game.entity";

export class UpdateGameDto{
    private constructor(
        public _id: string,
        public gameInfo: GameEntity
    ){}


    static query ( _id: string, object: {[key:string]: any} ): [string?, UpdateGameDto?]{

        const  { gameInfo }  = object;
        if ( !_id ) return ['Missing Id'];
        if (!mongoose.Types.ObjectId.isValid(_id)) return ['Invalid ID format'];
        if ( !gameInfo ) return ['Missing Game Info']
        return [
            undefined,
            new UpdateGameDto( _id, gameInfo )
        ]
    }

}