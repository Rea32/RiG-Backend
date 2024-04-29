import { AddGameDto, GameDatasource, GameEntity, GameRepository } from "../../domain";



export class GameRepositoryImpl implements GameRepository{

    constructor(
        private readonly gameDatasource: GameDatasource
    ){}

    addGame(addGameDto: AddGameDto): Promise<GameEntity> {
        return this.gameDatasource.addGame( addGameDto );
    }
}