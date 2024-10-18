
import { AddMassiveDto } from "../../dtos/add-massive.dto";
import { CustomError } from "../../errors/custom.error";



export class AddMassive {
    constructor(){}

    async add ( model: any, addMassiveDto: Array<AddMassiveDto> ): Promise<any> {
        const massiveArrayPromises:any = addMassiveDto.map( async (element:AddMassiveDto) => {

            const { id, nombre, slug } = element;
            try {
                const exist = await model.findOne( {
                    $or: [{ nombre }, { id }]
                    });
                if ( exist ) throw CustomError.badRequest('El elemento ya existe en RiG DB');

                const element = await model.create({
                    id: id,
                    nombre: nombre,
                    slug: slug
                });
                return element;
                
            } catch (error) {
                console.log(error);
                if ( error instanceof CustomError ){
                    throw error;
                }
                throw CustomError.internalServer();
            }
            
        })

        const elementArray = await Promise.all(massiveArrayPromises);
        return elementArray;
      
    }
}
