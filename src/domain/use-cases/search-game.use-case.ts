
import { SearchGameDto } from "../dtos/game/search-game.dto";
import { GameRepository } from "../repositories/game.repository";


export class SearchGame {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( searchGameDto: SearchGameDto ): Promise<any>{

        const game = await this.gameRepository.searchGame(searchGameDto);
        return{
            game
        }

    }
}