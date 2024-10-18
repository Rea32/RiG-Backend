
import { Types } from "mongoose";
import { ComprobePlatformDto } from "../../dtos/platform/comprobe-platform.dto";
import { PlatformRepository } from "../../repositories/platform.repository";


export class ComprobePlatform {
    constructor(
        private readonly platformRepository: PlatformRepository,
    ){}

    async execute ( comprobePlatformDto: ComprobePlatformDto ): Promise<Types.ObjectId>{

        const _id = await this.platformRepository.comprobePlatform(comprobePlatformDto);
        return _id;

    }
}