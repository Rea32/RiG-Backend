
import { CustomError } from '../../errors/custom.error';

export class Get {
    constructor() {}

    async maxId( model: any ) {
        try {
            const result = await model.findOne().sort('-id');
            return result ? result.id : null; 
        } catch (error) {
            console.log(error)
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }

    }
}




// getMaxId().then(maxId => {
//     console.log('Max ID:', maxId);  ESTO VA AL ACONTROLLER
// }).catch(err => {
//     console.error(err);
// });