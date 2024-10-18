
import { PaginatedResult } from "../../interfaces/paginatedResults.interface";
import { AddGameDto, ComprobeGameDto, FilterGameDto, GetAllDto, GetGameDto, SearchGameByGenreDto, SearchGameDto, SearchGameQueryDto, SearchSimilarGamesDto, UpdateGameDto, UpdateRemakeAndRemasterDto } from "../dtos";

import { GameEntity } from "../enitities/game.entity";


export abstract class GameDatasource{

    abstract addGame ( addGameDto: AddGameDto ): Promise<GameEntity>

    abstract comprobeGame ( comprobeGameDto: ComprobeGameDto ): Promise<Boolean>

    abstract filterGame( filterGameDto: FilterGameDto ): Promise<Array<GameEntity>>
    
    abstract getAllGames ( getAllDto: GetAllDto ): Promise<PaginatedResult<GameEntity>>
    
    abstract getFiveLastGames (): Promise<Array<GameEntity>>

    abstract getOtdGames (): Promise<Array<GameEntity>>

    abstract getUpcomingGames (): Promise<Array<GameEntity>>

    abstract getGame ( getGameDto: GetGameDto ): Promise<GameEntity>

    abstract searchGame ( searchGameDto: SearchGameDto ): Promise<GameEntity>

    abstract searchGameQuery( searchGameQueryDto: SearchGameQueryDto ): Promise<PaginatedResult<GameEntity>>

    abstract searchGameByGenre ( searchGameByGenreDto: SearchGameByGenreDto ): Promise<Array<GameEntity>>

    abstract searchSimilarGames( searchSimilarGamesDto: SearchSimilarGamesDto ): Promise<PaginatedResult<GameEntity>>

    abstract updateGame ( updateGameDto: UpdateGameDto ): Promise<GameEntity>

    abstract updateRemakeAndRemasterReferences ( updateRemakeAndRemasterDto: UpdateRemakeAndRemasterDto ): Promise<any>

}