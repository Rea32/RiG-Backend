

import { MecanicaModel } from "../../../data/mongodb/models/mecanica.model";
import { GetAllDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";



export class GetAllMecanicas {
    constructor(

    ){}

    async execute ( getAllDto:GetAllDto ): Promise<any>{
        try {
            const { page, limit, sort} = getAllDto;
            const sortOrder = sort === 1 ? 1 : -1
            const skip = (page - 1) * limit;
            const totalItems = await MecanicaModel.countDocuments({});
            const mecanicas = await MecanicaModel.find({}, 'nombre')
            .skip(skip)
            .limit(limit)
            .sort(({ nombre:  sortOrder})); // Aqui no me deja poner la variable sort??
    
            if ( !mecanicas ) throw CustomError.badRequest('No existe ninguna mecánica'); 
            const totalPages = Math.ceil(totalItems / limit);

            return{
                element: mecanicas,
                currentPage: page,
                totalPages,
                totalItems
            }
    
        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
           
            
        }
   

    }

}