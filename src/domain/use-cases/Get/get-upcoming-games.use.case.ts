
import { GameRepository } from "../../repositories/game.repository";



export class GetUpcomingGames {
    constructor(
        private readonly gameRepository: GameRepository
    ){}

    async execute (): Promise<any>{

        const games = await this.gameRepository.getUpcomingGames( );
        
        return games
        

    }
}