import { AddPlatformDto } from "../../dtos/platform/add-platform.dto";
import { PlatformEntity } from "../../enitities/platform.entity";
import { PlatformRepository } from "../../repositories/platform.repository";


export class AddPlatform {
    constructor(
        private readonly platformRepository: PlatformRepository,
    ){}

    async execute ( addPlatformDto: AddPlatformDto ): Promise<PlatformEntity>{

        const platform = await this.platformRepository.addPlatform(addPlatformDto);
        return platform;
    }
}