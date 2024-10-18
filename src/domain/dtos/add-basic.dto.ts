

export class AddBasicDto{
    private constructor(
        public nombre: string,
        public slug?: string,
    )
    {
        this.slug = this.nombre.toLowerCase().replace(' ','-')
    }

    static create ( array: Array<AddBasicDto> ): [string?, Array<AddBasicDto>?]{
        if (!array.length) return ['Not array'];
        const basicDtoArray = array.map((object:{[key:string]: any})=>{
            const { nombre } = object;
            if ( !nombre ) return ['Missing nombre'];
            return new AddBasicDto(nombre);
        }).filter((item): item is AddBasicDto => item instanceof AddBasicDto);


        return [
            undefined,
            basicDtoArray
        ]
        
    }
}