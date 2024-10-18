export class SearchGameDto{
    private constructor(
        public titulo: string,
    ){}


    static query ( object: {[key:string]: any} ): [string?, SearchGameDto?]{

        const { titulo } = object;
        console.log(object);
        if ( !titulo ) return ['Missing Titulo'];
        return [
            undefined,
            new SearchGameDto( titulo )
        ]
    }

}