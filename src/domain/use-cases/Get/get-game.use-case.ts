
import { GetGameDto } from "../../dtos";
import { GameRepository } from "../../repositories/game.repository";



export class GetGame {
    constructor(
        private readonly gameRepository: GameRepository
    ){}

    async execute ( getGameDto: GetGameDto ): Promise<any>{

        const game = await this.gameRepository.getGame(getGameDto);
        return{
            game
        }

    }
}