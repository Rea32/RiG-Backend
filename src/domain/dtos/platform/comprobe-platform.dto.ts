import { ObjectId } from "mongoose";

export class ComprobePlatformDto{
    private constructor(
        public id: number,
    ){}


    static query ( object: {[key:string]: any} ): [string?, ComprobePlatformDto?]{

        const { id } = object;
        console.log(object);
        if ( !id ) return ['Missing Id'];
        return [
            undefined,
            new ComprobePlatformDto( id )
        ]
    }

}