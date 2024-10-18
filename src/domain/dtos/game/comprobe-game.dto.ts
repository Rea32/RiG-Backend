export class ComprobeGameDto{
    private constructor(
        public titulo: string,
    ){}


    static query ( object: {[key:string]: any} ): [string?, ComprobeGameDto?]{

        const { titulo } = object;
        console.log(object);
        if ( !titulo ) return ['Missing Titulo'];
        return [
            undefined,
            new ComprobeGameDto( titulo )
        ]
    }

}