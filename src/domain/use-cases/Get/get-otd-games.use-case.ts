
import { GameRepository } from "../../repositories/game.repository";



export class GetOtdGames {
    constructor(
        private readonly gameRepository: GameRepository
    ){}

    async execute (): Promise<any>{

        const games = await this.gameRepository.getOtdGames( );
        
        return games
        

    }
}