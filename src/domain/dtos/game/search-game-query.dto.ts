import { generos_id, mecanicas, plataformas } from "../../../interfaces";


export class SearchGameQueryDto{
    private constructor(
        public titulo?: string,
        public generos?: Array<generos_id>,
        public mecanicas?: Array<mecanicas>,
        public plataformas?: Array<plataformas>,
        public page?: number,
        public limit?: number,
        
    ){}


    static query ( object: {[key:string]: any} ): [string?, SearchGameQueryDto?]{

        const { titulo, generos, mecanicas, plataformas} = object;
        let { page, limit } = object;
   
        console.log(object);
        // if ( !titulo ) return ['Missing Titulo'];
        return [
            undefined,
            new SearchGameQueryDto( titulo, generos, mecanicas, plataformas, page, limit )
        ]
    }

}