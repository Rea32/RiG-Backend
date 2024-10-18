export class FilterGameDto{
    private constructor(
        public generos: Array<string>,
        public mecanicas: Array<string>,
        public plataformas: Array<string>,
    ){}


    static query ( object: {[key:string]: any} ): [string?, FilterGameDto?]{

        const { generos, mecanicas, plataformas } = object;
        if ( !generos ) return ['Missing Genero'];
        if ( !mecanicas ) return ['Missing Mecanicas'];
        if ( !plataformas ) return ['Missing Plataformas'];
        return [
            undefined,
            new FilterGameDto( generos, mecanicas, plataformas)
        ]
    }

}