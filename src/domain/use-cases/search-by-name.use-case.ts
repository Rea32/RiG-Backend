
import { updateGameDocuments } from "../../support/updateGameDocuments";
import { SearchByNameDto } from "../dtos/search-by-name.dto";
import { CustomError } from "../errors/custom.error";


export class SearchByName {
    constructor() {}
    async search ( model:any, searchByNameDto: SearchByNameDto ): Promise<any>{

        const { nombre } = searchByNameDto;

        try {
            const nombres = await model.find({ nombre: { $regex: nombre, $options: 'i' } })

            if ( nombres.length == 0 ) throw CustomError.badRequest('El nombre que has buscado no existe');
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