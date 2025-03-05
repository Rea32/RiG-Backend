

export class ComprobeGenreDto{
    private constructor(
        public id: number,
    ){}


    static query ( object: {[key:string]: any} ): [string?, ComprobeGenreDto?]{

        const { id } = object;
        // console.log(object);
        if ( !id ) return ['Missing Id'];
        return [
            undefined,
            new ComprobeGenreDto( id )
        ]
    }

}