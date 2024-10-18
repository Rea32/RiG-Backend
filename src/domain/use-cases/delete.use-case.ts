import { DeleteDto } from "../dtos";
import { CustomError } from "../errors/custom.error";

export class Delete {
    
    constructor() {}
    
    async delete ( model:any, deleteDto: DeleteDto ): Promise<any>{

        const { _id } = deleteDto;

        try {
            const deletedElement = await model.findByIdAndDelete(_id);

            if ( !deletedElement ) throw CustomError.badRequest('El _id indicado no existe en la RiGDB');

            return deletedElement;

        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }   

    }
}