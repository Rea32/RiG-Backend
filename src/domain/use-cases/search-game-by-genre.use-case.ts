
import { SearchGameByGenreDto } from "../dtos";
import { SearchGameDto } from "../dtos/game/search-game.dto";
import { GameEntity } from "../enitities/game.entity";
import { GameRepository } from "../repositories/game.repository";


export class SearchGameByGenre {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( searchGameByGenreDto: SearchGameByGenreDto ): Promise<any>{

        const games = await this.gameRepository.searchGameByGenre(searchGameByGenreDto);
        return{
            games
        }

    }
}