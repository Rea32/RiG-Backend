import { Model } from 'mongoose';

import { AddBasicDto } from '../../dtos/add-basic.dto';
import { CustomError } from '../../errors/custom.error';


export class AddBasicUseCase {
    constructor() {}

    async add (model: Model<any>, addBasicDto: Array<AddBasicDto>): Promise<any> {
        const basicArrayPromises:any = addBasicDto.map(async (element:AddBasicDto) => {

            const { nombre, slug } = element;
            try {
                const exist = await model.findOne({ nombre: nombre } );
                if ( exist ) throw CustomError.badRequest('El elemento ya existe en RiG DB');

                const basicElement = await model.create({
                    nombre: nombre,
                    slug: slug
                });
                return basicElement;
                
            } catch (error) {
                console.log(error);
                if ( error instanceof CustomError ){
                    throw error;
                }
                throw CustomError.internalServer();
            }
            
        })

        const basicArray = await Promise.all(basicArrayPromises);
        return basicArray;
      
    }
}