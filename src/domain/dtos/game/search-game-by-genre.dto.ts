export class SearchGameByGenreDto{
    private constructor(
        public genero_id: string,
        public mecanicas_id: Array<string>,
    ){}


    static query ( object: {[key:string]: any} ): [string?, SearchGameByGenreDto?]{

        const { genero_id, mecanicas_id } = object;
        if ( !genero_id ) return ['Missing Genero'];
        if ( !mecanicas_id ) return ['Missing Mecanicas'];
        return [
            undefined,
            new SearchGameByGenreDto( genero_id, mecanicas_id)
        ]
    }

}