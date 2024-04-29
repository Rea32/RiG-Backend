import { AddGameDto } from "../dtos/add-game.dto";
import { GameEntity } from "../enitities/game.entity";


export abstract class GameRepository{
    
    abstract addGame( addGameDto: AddGameDto ): Promise<GameEntity>
}