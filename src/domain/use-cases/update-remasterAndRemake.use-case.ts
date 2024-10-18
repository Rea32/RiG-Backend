
import { UpdateRemakeAndRemasterDto } from "../dtos";
import { GameRepository } from "../repositories/game.repository";


export class UpdateRemakeAndRemasterReferences {
    constructor(
        private readonly gameRepository: GameRepository,
    ){}

    async execute ( updateRemakeAndRemasterDto: UpdateRemakeAndRemasterDto ): Promise<any>{

        const updatedRemakeOrRemaster = await this.gameRepository.updateRemakeAndRemasterReferences(updateRemakeAndRemasterDto);
        return { updatedRemakeOrRemaster }

    }
}