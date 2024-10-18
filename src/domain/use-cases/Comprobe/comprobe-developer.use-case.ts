import { Types } from "mongoose";

import { ComprobeBasicDto } from "../../dtos/comprobe-basic.dto";
import { DeveloperModel } from "../../../data/mongodb/models/developer.model";
import { CustomError } from "../../errors/custom.error";


export class ComprobeDeveloper {
    constructor(){}

    async query ( comprobeBasicDto: ComprobeBasicDto ): Promise<Types.ObjectId>{
        const { id } = comprobeBasicDto;
        try {
            const dev = await DeveloperModel.findOne( { id });
            if ( !dev ) throw CustomError.badRequest("La desarrolladora no existe en la RiGDB");
            return dev._id;
        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }

    }
}