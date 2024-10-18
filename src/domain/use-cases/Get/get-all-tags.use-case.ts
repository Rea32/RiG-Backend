

import { TagModel } from "../../../data/mongodb/models/tag.model";
import { GetAllDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";



export class GetAllTags {
    constructor(

    ){}

    async execute ( getAllDto:GetAllDto ): Promise<any>{
        try {
            const { page, limit, sort } = getAllDto;
            const skip = (page - 1) * limit;
            const totalItems = await TagModel.countDocuments({});
            const etiquetas = await TagModel.find({}, 'nombre')
            .skip(skip)
            .limit(limit)
            .sort(({ nombre: sort }));
    
            if ( !etiquetas ) throw CustomError.badRequest('No existe ninguna etiqueta'); 
    
            const totalPages = Math.ceil(totalItems / limit);

            return{
                element: etiquetas,
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