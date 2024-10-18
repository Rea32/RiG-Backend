

import { PublisherModel } from "../../../data/mongodb/models/publisher.model";
import { TagModel } from "../../../data/mongodb/models/tag.model";
import { GetAllDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";
import { GenreRepository } from "../../repositories/genre.repository";


export class GetAllPublishers {
    constructor(

    ){}

    async execute ( getAllDto:GetAllDto ): Promise<any>{
        try {
            const { page, limit } = getAllDto;
            const skip = (page - 1) * limit;
            const totalItems = await PublisherModel.countDocuments({});
            const editoras = await PublisherModel.find({}, 'nombre')
            .skip(skip)
            .limit(limit);
    
            if ( !editoras ) throw CustomError.badRequest('No existe ninguna editora'); 
            const totalPages = Math.ceil(totalItems / limit);

            return{
                element: editoras,
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