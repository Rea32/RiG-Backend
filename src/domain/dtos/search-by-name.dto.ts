export class SearchByNameDto{
    private constructor(
        public nombre: string,
    ){}


    static query ( object: {[key:string]: any} ): [string?, SearchByNameDto?]{

        const { nombre } = object;

        if ( !nombre ) return ['Missing nombre'];
        return [
            undefined,
            new SearchByNameDto( nombre )
        ]
    }

}