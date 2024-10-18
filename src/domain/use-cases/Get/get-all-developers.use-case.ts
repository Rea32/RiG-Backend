

import { DeveloperModel } from "../../../data/mongodb/models/developer.model";
import { GetAllDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";



export class GetAllDevelopers {
    constructor(

    ){}

    async execute ( getAllDto:GetAllDto ): Promise<any>{
        try {
            const { page, limit } = getAllDto;
            const skip = (page - 1) * limit;
            const totalItems = await DeveloperModel.countDocuments({});

            const desarrolladoras = await DeveloperModel.find({}, 'nombre')
            .skip(skip)
            .limit(limit);
    
            if ( !desarrolladoras ) throw CustomError.badRequest('No existe ninguna desarrolladora'); 
            const totalPages = Math.ceil(totalItems / limit);

            return{
                element: desarrolladoras,
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