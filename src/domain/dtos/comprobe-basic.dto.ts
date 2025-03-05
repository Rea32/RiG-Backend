export class ComprobeBasicDto{
    private constructor(
        public id: number,
        public nombre: string,
    ){}


    static query ( object: {[key:string]: any} ): [string?, ComprobeBasicDto?]{

        const { id, nombre } = object;
        // console.log(object);
        if ( !id ) return ['Missing Id'];
        if ( !nombre ) return ['Missing Nombre'];
        return [
            undefined,
            new ComprobeBasicDto( id, nombre )
        ]
    }

}