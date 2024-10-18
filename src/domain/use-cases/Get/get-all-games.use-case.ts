
import { GetAllDto, } from "../../dtos";
import { GameRepository } from "../../repositories/game.repository";



export class GetAllGames {
    constructor(
        private readonly gameRepository: GameRepository
    ){}

    async execute ( getAllDto: GetAllDto ): Promise<any>{

        const games = await this.gameRepository.getAllGames( getAllDto );
        
        return games
        

    }
}