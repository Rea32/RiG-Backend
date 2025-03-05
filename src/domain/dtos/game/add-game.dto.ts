
import { desarrolladora, editora, etiquetas, generos, plataformas, basicInterface, tiendas } from "../../../interfaces";

export class AddGameDto{
    private constructor(
        public titulo: string,
        public saga: string,
        public lanzamiento: string,
        public plataformas: plataformas[],
        public generos: generos[],
        public desarrolladoras: desarrolladora[],
        public editoras: editora[],
        public tiendas?: tiendas[],
        public remakeOf?: basicInterface[],
        public remasterOf?: basicInterface[],
        public hasRemake?: basicInterface[],
        public hasRemaster?: basicInterface[],
        public mecanicas?: [],
        public etiquetas?: etiquetas[],
        public coverImage?: string,
        public screenshotsImages?: [{url:string}],
        public spinOff?: boolean,
    ){}


    static create ( object: {[key:string]: any} ): [string?, AddGameDto?]{

        const { titulo, remakeOf, remasterOf, hasRemake, hasRemaster, saga, lanzamiento, plataformas, generos, mecanicas, desarrolladoras, editoras, tiendas, etiquetas, coverImage, screenshotsImages, spinOff} = object;
        // console.log(object);
        if ( !titulo ) return ['Missing Titulo'];
        if ( !lanzamiento ) return ['Missing Lanzamiento'];
        if ( !plataformas ) return ['Missing Plataformas'];
        if ( !generos ) return ['Missing Generos'];
        if ( !desarrolladoras ) return ['Missing Desarrolladoras'];
        if ( !editoras ) return ['Missing Editora'];

        return [
            undefined,
            new AddGameDto( 
                titulo, 
                saga, 
                lanzamiento, 
                plataformas,
                generos, 
                desarrolladoras, 
                editoras, 
                tiendas, 
                remakeOf, 
                remasterOf, 
                hasRemake, 
                hasRemaster, 
                mecanicas, 
                etiquetas, 
                coverImage, 
                screenshotsImages,
                spinOff 
            )
        ]
    }

}