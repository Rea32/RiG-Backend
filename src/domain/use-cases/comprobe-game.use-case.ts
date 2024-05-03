import { AddGameDto } from "../dtos/add-game.dto";
import { ComprobeGameDto } from "../dtos/comprobe-game.dto";
import { GameRepository } from "../repositories/game.repository";


export class ComprobeGame {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( comprobeGameDto: ComprobeGameDto ): Promise<Boolean>{

        const exist = await this.gameRepository.comprobeGame(comprobeGameDto);
        return exist;

    }
}