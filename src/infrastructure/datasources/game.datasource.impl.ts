import { error } from "console";
import { GameModel } from "../../data/mongodb/models/game.model";
import { AddGameDto, ComprobeGameDto, CustomError, GameDatasource, GameEntity } from "../../domain";
import { GameMapper } from "../mappers/game.mapper";


export class GameDatasourceImpl implements GameDatasource{
    constructor(){}
    
    async addGame(addGameDto: AddGameDto): Promise<GameEntity> {
        const { titulo, lanzamiento, plataformas, generos, desarrolladoras, editoras, tiendas, etiquetas, backgroundImage } = addGameDto;

        try {
            const exist = await GameModel.findOne( { titulo });
            if ( exist ) throw CustomError.badRequest('El titulo del juego ya existe'); 
            const game = await GameModel.create({
                titulo: titulo,
                lanzamiento: lanzamiento,
                plataformas: plataformas,
                generos: generos,
                desarrolladoras: desarrolladoras,
                editoras: editoras,
                tiendas: tiendas,
                etiquetas: etiquetas,
                backgroundImage: backgroundImage
            });
            // console.log(game);

            game.save()
                .then (() => {console.log(`El registro ${game.titulo} se ha guardado correctamente` )})
                .catch ( (err:any) => {console.log(err)} );

            return GameMapper.gameEntityFromObject(game);

        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
           
            
        }
    }
    
    async comprobeGame(comprobeGameDto: ComprobeGameDto): Promise<Boolean> {

        const { titulo } = comprobeGameDto;

        try {
            const exist = await GameModel.findOne( { titulo });
            if ( !exist ) return false;
            return true;
        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }

        
    }
}