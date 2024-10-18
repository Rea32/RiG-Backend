const mongoose = require('mongoose');


export class UpdateRemakeAndRemasterDto{
    private constructor(
        public gameId: String,
        public remakeOf: String[], 
        public remasterOf: String[]
    ){}


    static query (object: {[key:string]: any}): [string?, UpdateRemakeAndRemasterDto?]{

        const  { gameId, remakeOf, remasterOf }  = object;

        if ( !gameId ) return ['Missing GameId'];
        if (!mongoose.Types.ObjectId.isValid(gameId)) return ['Invalid ID format'];
        if ( !remakeOf ) return ['Missing remakeOf Info'];
        if ( !remasterOf ) return ['Missing remasterOf Info'];
        return [
            undefined,
            new UpdateRemakeAndRemasterDto( gameId, remakeOf, remasterOf )
        ]
    }

}