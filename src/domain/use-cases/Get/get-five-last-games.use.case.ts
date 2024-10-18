
import { GameRepository } from "../../repositories/game.repository";



export class GetFiveLastGames {
    constructor(
        private readonly gameRepository: GameRepository
    ){}

    async execute (): Promise<any>{

        const games = await this.gameRepository.getFiveLastGames( );
        
        return games
        

    }
}