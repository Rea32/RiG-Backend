import { AddGameDto } from "../dtos/add-game.dto";
import { GameRepository } from "../repositories/game.repository";


export class AddGame {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( addGameDto: AddGameDto ): Promise<any>{

        const game = await this.gameRepository.addGame(addGameDto);
        return{
            game
        }

    }
}