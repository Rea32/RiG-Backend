

export class GetGenreDto{
    private constructor(
        public name: string
    ){}


    static query ( object: {[key:string]: any} ): [string?, GetGenreDto?]{

        const { name } = object;
        console.log(`El nombre recibido ${name}`);
        if ( !name ) return ['Missing Nombre'];

        return [
            undefined,
            new GetGenreDto( name )
        ]
    }

}