import { desarrolladora, editora, etiquetas, generos, plataformas, tiendas } from "../../interfaces";
import { SagaEntity } from "./saga.entity";



export class GameEntity {

    constructor(
        public id: number,
        public titulo: string,
        public saga: SagaEntity,
        public lanzamiento: string,
        public plataformas: plataformas[],
        public generos: generos[],
        public desarrolladoras: desarrolladora[],
        public editoras: editora[],
        public spinOff: boolean,
        public etiquetas: etiquetas[],
        public mecanicas?: [],
        public remakeOf?: [],
        public remasterOf?: [],
        public hasRemake?:[],
        public hasRemaster?: [],
        public dlcs?: [],
        public isDlcOf?: [],
        public coverImage? :string,
        public screenshotsImages? :[url:string],
        public tiendas?: tiendas[],
    ){}
}