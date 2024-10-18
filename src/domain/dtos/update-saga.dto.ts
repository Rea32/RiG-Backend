import { SagaEntity } from "../enitities/saga.entity";

const mongoose = require('mongoose');


export class UpdateSagaDto{
    private constructor(
        public _id: string,
        public sagaInfo: SagaEntity
    ){}


    static query ( _id: string, object: {[key:string]: any} ): [string?, UpdateSagaDto?]{

        const  { sagaInfo }  = object;
        // console.log(sagaInfo);
        if ( !_id ) return ['Missing Id'];
        if (!mongoose.Types.ObjectId.isValid(_id)) return ['Invalid ID format: ' + _id];
        if ( !sagaInfo ) return ['Missing Saga Info']
        return [
            undefined,
            new UpdateSagaDto( _id, sagaInfo )
        ]
    }

}