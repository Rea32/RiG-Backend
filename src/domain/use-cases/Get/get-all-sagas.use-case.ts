

import { SagaModel } from "../../../data/mongodb/models/saga.model";
import { GetAllDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";



export class GetAllSagas {
    constructor(){}

    async execute ( getAllDto:GetAllDto ): Promise<any>{
        try {
            const { page, limit } = getAllDto;
            const skip = (page - 1) * limit;
            const totalItems = await SagaModel.countDocuments({});

            const sagas = await SagaModel.find({})
            .skip(skip)
            .limit(limit)
            .populate('generos_principales')
            .populate({
                path: 'juegos_principales', 
                populate: [{path: 'generos'}, {path:'mecanicas'}, {path:'plataformas'}, {path:'editoras'},{path:'desarrolladoras'}, {path:'saga'}]
            })
            .populate({
                path: 'spin_offs', 
                populate: [{path: 'generos'}, {path:'mecanicas'}, {path:'plataformas'}, {path:'editoras'},{path:'desarrolladoras'}, {path:'saga'}]
            });
    
            if ( !sagas ) throw CustomError.badRequest('No existe ninguna saga con ese nombre'); 
            const totalPages = Math.ceil(totalItems / limit);

            return{
                element: sagas,
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