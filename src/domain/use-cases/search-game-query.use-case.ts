
import { SearchGameQueryDto } from "../dtos";
import { GameRepository } from "../repositories/game.repository";


export class SearchGameQuery {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( searchGameQueryDto: SearchGameQueryDto ): Promise<any>{

        const game = await this.gameRepository.searchGameQuery(searchGameQueryDto);
        return{
            game
        }

    }
}