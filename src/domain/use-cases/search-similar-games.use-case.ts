
import { SearchSimilarGamesDto } from "../dtos";
import { GameRepository } from "../repositories/game.repository";


export class SearchSimilarGames {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( searchSimilarGamesDto: SearchSimilarGamesDto ): Promise<any>{

        const game = await this.gameRepository.searchSimilarGames(searchSimilarGamesDto);
        return{
            game
        }

    }
}