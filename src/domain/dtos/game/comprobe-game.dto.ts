export class ComprobeGameDto{
    private constructor(
        public _id: string,
    ){}


    static query ( object: {[key:string]: any} ): [string?, ComprobeGameDto?]{

        const { _id } = object;
        // console.log(object);
        if ( !_id ) return ['Missing Id'];
        return [
            undefined,
            new ComprobeGameDto( _id )
        ]
    }

}