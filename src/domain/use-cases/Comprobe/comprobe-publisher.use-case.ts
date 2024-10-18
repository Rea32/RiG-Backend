import { Types } from "mongoose";

import { ComprobeBasicDto } from "../../dtos/comprobe-basic.dto";
import { CustomError } from "../../errors/custom.error";
import { PublisherModel } from "../../../data/mongodb/models/publisher.model";


export class ComprobePublisher {
    constructor(){}

    async query ( comprobeBasicDto: ComprobeBasicDto ): Promise<Types.ObjectId>{
        const { id, nombre } = comprobeBasicDto;
        try {
            let dev = await PublisherModel.findOne( { id });
            if ( !dev ){
                try {
                    const publisher = await PublisherModel.create({
                        id: id,
                        nombre: nombre,
                    });
                    console.log(publisher.nombre)
                } catch (error) {
                    if ( error instanceof CustomError ){
                        console.log(error);
                        throw error;
                    }
                    throw CustomError.internalServer(); 
                }
            }
            dev = await PublisherModel.findOne( { id });
            if (!dev) throw CustomError.badRequest("La desarrolladora no existe en la RiGDB");
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