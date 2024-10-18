
import { UpdateGameDto } from "../dtos/game/update-game.dto";
import { GameRepository } from "../repositories/game.repository";


export class UpdateGame {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( updateGameDto: UpdateGameDto ): Promise<any>{

        const game = await this.gameRepository.updateGame(updateGameDto);
        return { game }

    }
}