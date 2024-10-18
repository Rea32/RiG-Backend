export class SearchByTituloDto{
    private constructor(
        public titulo: string,
    ){}


    static query ( object: {[key:string]: any} ): [string?, SearchByTituloDto?]{

        const { titulo } = object;

        if ( !titulo ) return ['Missing titulo'];
        return [
            undefined,
            new SearchByTituloDto( titulo )
        ]
    }

}