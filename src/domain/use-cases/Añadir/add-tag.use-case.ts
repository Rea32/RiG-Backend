import { Model } from 'mongoose';

import { CustomError } from '../../errors/custom.error';
import { AddTagDto } from '../../dtos';


export class AddTagUseCase {
    constructor() {}

    async add (model: Model<any>, addTagDto: Array<AddTagDto>): Promise<any> {
        const tagArrayPromises:any = addTagDto.map(async (element:AddTagDto) => {

            const { nombre, name, tipo } = element;
            try {
                const exist = await model.findOne({ nombre: nombre } );
                if ( exist ) throw CustomError.badRequest('La etiqueta ya existe en RiG DB');

                const tag = await model.create({
                    nombre: nombre,
                    name: name,
                    tipo:tipo
                });
                return tag;
                
            } catch (error) {
                console.log(error);
                if ( error instanceof CustomError ){
                    throw error;
                }
                throw CustomError.internalServer();
            }
            
        })

        const tagArray = await Promise.all(tagArrayPromises);
        return tagArray;
      
    }
}