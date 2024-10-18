
import { FilterGameDto } from "../dtos";
import { CustomError } from "../errors/custom.error";
import { GameRepository } from "../repositories/game.repository";


export class FilterGame {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( filterGameDto: FilterGameDto ): Promise<any>{

        const games = await this.gameRepository.filterGame(filterGameDto);
        if ( !games ) throw CustomError.badRequest('No existen juegos con esas características');
        return games

    }
}