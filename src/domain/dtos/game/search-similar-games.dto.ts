import { ObjectId } from "mongoose";
import {  etiquetas_id, generos_id, mecanicas, plataformas } from "../../../interfaces";


export class SearchSimilarGamesDto{
    private constructor(
        public _id: ObjectId,
        public generos?: Array<generos_id>,
        public mecanicas?: Array<mecanicas>,
        public plataformas?: Array<plataformas>,
        public etiquetas?: Array<etiquetas_id>,
        public page?: number,
        public limit?: number,
        
    ){}


    static query ( object: {[key:string]: any} ): [string?, SearchSimilarGamesDto?]{

        const {  _id, generos, mecanicas, plataformas, etiquetas } = object;
        let { page, limit } = object;
   
        // console.log(object);
        // if ( !titulo ) return ['Missing Titulo'];
        return [
            undefined,
            new SearchSimilarGamesDto( _id, generos, mecanicas, plataformas, etiquetas, page, limit )
        ]
    }

}