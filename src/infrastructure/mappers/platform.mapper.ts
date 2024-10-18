import { CustomError, PlatformEntity } from "../../domain";



export class PlatformMapper{

    static platformEntityFromObject( object: { [key: string]: any }){
        const{_id, id, nombre, año_lanzamiento, slug} = object;
        // console.log(object)
        if ( !_id || !id ) throw CustomError.badRequest('Missing id');
        if ( !nombre ) throw CustomError.badRequest('Missing nombre');
        if ( !año_lanzamiento ) throw CustomError.badRequest('Missing año_lanzamiento');

        return new PlatformEntity(
            _id || id,
            nombre,
            slug,
            año_lanzamiento
        )
    }   
}