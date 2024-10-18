
import { ComprobeGameDto } from "../../dtos/game/comprobe-game.dto";
import { GameRepository } from "../../repositories/game.repository";


export class ComprobeGame {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( comprobeGameDto: ComprobeGameDto ): Promise<Boolean>{

        const exist = await this.gameRepository.comprobeGame(comprobeGameDto);
        return exist;

    }
}