import { ObjectId } from "mongoose";

export class GetGameDto{
    private constructor(
        public _id: number
    ){}


    static query ( object: {[key:string]: any} ): [string?, GetGameDto?]{

        const { _id } = object;
        console.log(object);
        if ( !_id ) return ['Missing Id'];
        return [
            undefined,
            new GetGameDto( _id )
        ]
    }

}