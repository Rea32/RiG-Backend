import { PublisherModel } from "../../../data/mongodb/models/publisher.model";
import { ComprobeBasicDto } from "../../dtos";
import { AddPublisherDto } from "../../dtos/add-publisher.dto";
import { CustomError } from "../../errors/custom.error";



export class AddPublisher {
    constructor(){}
// EN CASO DE AÑADIR VARIOS EN MASSIVO
    // async add (addPublisherDto: Array<AddPublisherDto>): Promise<any> {
    //     const publisherArrayPromises:any = addPublisherDto.map(async (publisher:AddPublisherDto) => {

    //         const { id, nombre, slug } = publisher;
    //         try {
    //             const exist = await PublisherModel.findOne( {
    //                 $or: [{ nombre }, { id }]
    //                 });
    //             if ( exist ) throw CustomError.badRequest('La editora ya existe en RiG DB');

    //             const publisher = await PublisherModel.create({
    //                 id: id,
    //                 nombre: nombre,
    //                 slug: slug
    //             });
    //             return publisher;
                
    //         } catch (error) {
    //             console.log(error);
    //             if ( error instanceof CustomError ){
    //                 throw error;
    //             }
    //             throw CustomError.internalServer();
    //         }
            
    //     })

    //     const publisherArray = await Promise.all(publisherArrayPromises);
    //     return publisherArray;
      
    // }
        async add (addPublisherDto: ComprobeBasicDto): Promise<any> {


            const { id, nombre } = addPublisherDto;
            try {
                const exist = await PublisherModel.findOne( {
                    $or: [{ nombre }, { id }]
                    });
                if ( exist ) throw CustomError.badRequest('La editora ya existe en RiG DB');

                const publisher = await PublisherModel.create({
                    id: id,
                    nombre: nombre,
                });
                console.log("_id" + publisher._id)
                return publisher;
                
            } catch (error) {
                console.log(error);
                if ( error instanceof CustomError ){
                    throw error;
                }
                throw CustomError.internalServer();
            }
      
    }
}
