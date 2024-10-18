
export class AddPlatformDto{
    private constructor(
        public id: number,
        public nombre: string,
        public año_lanzamiento: number,
        public slug?: string,
    )
    {
        this.slug = this.nombre.toLowerCase().replace(' ','-')
    }

    static create ( object: {[key:string]: any} ): [string?, AddPlatformDto?]{

        const { id, nombre, año_lanzamiento, slug } = object;
        if ( !id ) return ['Missing id'];
        if ( !nombre ) return ['Missing nombre'];
        if ( !año_lanzamiento ) return ['Missing año_lanzamiento'];
        return [
            undefined,
            new AddPlatformDto ( id, nombre, año_lanzamiento, slug )
        ]
        
    }
}