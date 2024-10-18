

export class GetGenreDto{
    private constructor(
        public name: string
    ){}


    static query ( object: {[key:string]: any} ): [string?, GetGenreDto?]{

        const { name } = object;
        if ( !name ) return ['Missing Nombre'];

        return [
            undefined,
            new GetGenreDto( name )
        ]
    }

}