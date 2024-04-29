import { CustomError, GameEntity } from "../../domain";


export class GameMapper{

    static gameEntityFromObject( object: { [key: string]: any }){
        const{_id, id, titulo, lanzamiento, plataformas, generos, desarrolladoras, editoras } = object;
        // console.log(object)
        if ( !_id || !id ) throw CustomError.badRequest('Missing id');
        if ( !titulo ) throw CustomError.badRequest('Missing titulo');
        if ( !lanzamiento ) throw CustomError.badRequest('Missing lanzamiento');
        if ( !plataformas ) throw CustomError.badRequest('Missing plataformas');
        if ( !generos ) throw CustomError.badRequest('Missing generos');
        if ( !desarrolladoras ) throw CustomError.badRequest('Missing desarrolladoras');
        if ( !editoras ) throw CustomError.badRequest('Missing editoras');

        return new GameEntity(
            _id || id,
            titulo,
            lanzamiento,
            plataformas,
            generos,
            desarrolladoras,
            editoras
        )
    }   
}