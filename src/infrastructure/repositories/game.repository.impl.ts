import {  GameDatasource, GameEntity, GameRepository } from "../../domain";
import { AddGameDto, ComprobeGameDto, FilterGameDto, GetAllDto, GetGameDto, SearchGameByGenreDto, SearchGameDto, SearchGameQueryDto, SearchSimilarGamesDto, UpdateGameDto, UpdateRemakeAndRemasterDto } from "../../domain/dtos";
import { PaginatedResult } from "../../interfaces/paginatedResults.interface";




export class GameRepositoryImpl implements GameRepository{

    constructor(
        private readonly gameDatasource: GameDatasource
    ){}

    addGame(addGameDto: AddGameDto): Promise<GameEntity> {
        return this.gameDatasource.addGame( addGameDto );
    }
    comprobeGame(comprobeGameDto: ComprobeGameDto): Promise<Boolean> {
        return this.gameDatasource.comprobeGame( comprobeGameDto );
    }
    filterGame(filterGameDto: FilterGameDto): Promise<Array<GameEntity>> {
        return this.gameDatasource.filterGame( filterGameDto );
    }

    getAllGames( getAllDto:GetAllDto): Promise<PaginatedResult<GameEntity>> {
        return this.gameDatasource.getAllGames( getAllDto );
    }

    getFiveLastGames (): Promise<Array<GameEntity>>{
        return this.gameDatasource.getFiveLastGames()
    }

    getOtdGames (): Promise<Array<GameEntity>>{
        return this.gameDatasource.getOtdGames()
    }

    getUpcomingGames (): Promise<Array<GameEntity>>{
        return this.gameDatasource.getUpcomingGames()
    }

    getGame(getGameDto: GetGameDto): Promise<GameEntity> {
        return this.gameDatasource.getGame( getGameDto );
    }

    searchGame(searchGameDto: SearchGameDto): Promise<GameEntity> {
        return this.gameDatasource.searchGame( searchGameDto );
    }

    searchGameQuery( searchGameQueryDto: SearchGameQueryDto ): Promise<PaginatedResult<GameEntity>>{
        return this.gameDatasource.searchGameQuery( searchGameQueryDto );
    }

    searchGameByGenre(searchGameByGenreDto: SearchGameByGenreDto): Promise<Array<GameEntity>> {
        return this.gameDatasource.searchGameByGenre( searchGameByGenreDto );
    }

    searchSimilarGames( searchSimilarGamesDto: SearchSimilarGamesDto ): Promise<PaginatedResult<GameEntity>>{
        return this.gameDatasource.searchSimilarGames( searchSimilarGamesDto );
    }

    updateGame(updateGameDto: UpdateGameDto): Promise<GameEntity> {
        return this.gameDatasource.updateGame( updateGameDto );
    } 
    
    updateRemakeAndRemasterReferences ( updateRemakeAndRemasterDto: UpdateRemakeAndRemasterDto ): Promise<any>{
        return this.gameDatasource.updateRemakeAndRemasterReferences( updateRemakeAndRemasterDto );
    }
}