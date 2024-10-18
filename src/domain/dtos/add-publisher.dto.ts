
export class AddPublisherDto{
    private constructor(
        public id: number,
        public nombre: string,
        public slug?: string,
    )
    {
        this.slug = this.nombre.toLowerCase().replace(' ','-')
    }

    static create ( array: Array<AddPublisherDto> ): [string?, any?]{
        if (!array.length) return ['Not array'];
        const publisherDtoArray = array.map((object:{[key:string]: any})=>{
            const { id, nombre, slug } = object;
            if ( !id ) return ['Missing id'];
            if ( !nombre ) return ['Missing nombre'];
            return object;
        })


        return [
            undefined,
            publisherDtoArray
        ]
        
    }
}