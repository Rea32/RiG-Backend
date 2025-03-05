
export class AddPlatformDto{
    private constructor(
        public id: number,
        public nombre: string,
        public generacion: number,
        public slug?: string,
        public abreviacion?: string,
    )
    {
        this.slug = this.nombre.toLowerCase().replace(' ','-')
    }

    static create ( object: {[key:string]: any} ): [string?, AddPlatformDto?]{

        const { id, nombre, generacion, slug, abreviacion } = object;
        if ( !id ) return ['Missing id'];
        if ( !nombre ) return ['Missing nombre'];
        if ( !generacion ) return ['Missing generacion'];
        return [
            undefined,
            new AddPlatformDto ( id, nombre, generacion, slug, abreviacion )
        ]
        
    }
}