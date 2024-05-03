import { CustomError, GameEntity, GenreEntity } from "../../domain";


export class GenreMapper{

    static genreEntityFromObject( object: { [key: string]: any }){
        // console.log(object)
        const{_id, id, name } = object;
        
        if ( !_id || !id ) throw CustomError.badRequest('Missing id');


        return new GenreEntity(
         id | _id,
         name,
        )
    }   
}