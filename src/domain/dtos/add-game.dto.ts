
import { desarrolladora, editora, etiquetas, genero, plataformas, tiendas } from "../../interfaces";

export class AddGameDto{
    private constructor(
        public titulo: string,
        public lanzamiento: string,
        public plataformas: plataformas[],
        public generos: genero[],
        public desarrolladoras: desarrolladora[],
        public editoras: editora[],
        public tiendas?: tiendas[],
        public etiquetas?: etiquetas[],
        public backgroundImage?: string,
    ){}


    static create ( object: {[key:string]: any} ): [string?, AddGameDto?]{

        const { titulo, lanzamiento, plataformas, generos, desarrolladoras, editoras, tiendas, etiquetas, backgroundImage} = object;
        console.log(object);
        if ( !titulo ) return ['Missing Titulo'];
        if ( !lanzamiento ) return ['Missing Lanzamiento'];
        if ( !plataformas ) return ['Missing Plataformas'];
        if ( !generos ) return ['Missing Generos'];
        if ( !desarrolladoras ) return ['Missing Desarrolladoras'];
        if ( !editoras ) return ['Missing Editora'];

        return [
            undefined,
            new AddGameDto( titulo, lanzamiento, plataformas, generos, desarrolladoras, editoras, tiendas, etiquetas, backgroundImage )
        ]
    }

}