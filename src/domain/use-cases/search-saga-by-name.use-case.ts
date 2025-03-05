
import path from "path";
import { updateGameDocuments } from "../../support/updateGameDocuments";
import { SearchByNameDto } from "../dtos/search-by-name.dto";
import { CustomError } from "../errors/custom.error";


export class SearchSagaByName {
    constructor() {}
    async search ( model:any, searchByNameDto: SearchByNameDto ): Promise<any>{

        const { nombre } = searchByNameDto;

        try {
            const nombres = await model.find({ nombre: { $regex: nombre, $options: 'i' } })
            .populate('generos_principales')
            .populate({
                path: 'juegos_principales', 
                populate: [{path: 'generos'}, {path:'mecanicas'}, {path:'plataformas'}, {path:'editoras'},{path:'desarrolladoras'}, {path:'saga'}]
            })
            .populate({
                path: 'spin_offs', 
                populate: [{path: 'generos'}, {path:'mecanicas'}, {path:'plataformas'}, {path:'editoras'},{path:'desarrolladoras'}, {path:'saga'}]
            })


            if ( nombres.length == 0 ) throw CustomError.badRequest('El nombre de la saga que has buscado no existe');
            // console.log(nombres);

            return nombres;

        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }   

    }
}