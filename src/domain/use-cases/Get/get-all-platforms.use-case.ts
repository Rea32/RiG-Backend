

import { GetAllPlatformsDto } from "../../dtos";
import { PlatformRepository } from "../../repositories/platform.repository";


export class GetAllPlatforms {
    constructor(
        private readonly platformRepository: PlatformRepository,
    ){}

    async execute ( getAllPlatformsDto: GetAllPlatformsDto ): Promise<any>{

        const platforms = await this.platformRepository.getAllPlatforms(getAllPlatformsDto);
        return platforms
        

    }
}