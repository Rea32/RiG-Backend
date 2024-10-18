
export class AddTagDto{
    private constructor(
        public name: string,
        public nombre: string,
        public tipo?: string,
    ){}


    static create ( array: Array<AddTagDto> ): [string?, any?]{
        if (!array.length) return ['Not array'];
        const tagDtoArray = array.map((object:{[key:string]: any})=>{
            const { name, nombre } = object;
            if ( !name ) return ['Missing id'];
            if ( !nombre ) return ['Missing nombre'];
            return object;
        })


        return [
            undefined,
            tagDtoArray
        ]
        
    }
}