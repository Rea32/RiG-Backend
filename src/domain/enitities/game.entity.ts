import { desarrolladora, editora, etiquetas, genero, plataformas, tiendas } from "../../interfaces";


export class GameEntity {

    constructor(
        public id: number,
        public titulo: string,
        public lanzamiento: string,
        public plataformas: Array<plataformas>,
        public generos: genero[],
        public desarrolladoras: desarrolladora[],
        public editoras: editora[],
        public etiquetas?: etiquetas[],
        public tiendas?: tiendas[],
        public backgroundImage? :string,

    ){}
}