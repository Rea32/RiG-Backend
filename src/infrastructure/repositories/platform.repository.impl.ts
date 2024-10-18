import { PlatformDatasource, PlatformEntity, PlatformRepository } from "../../domain";
import { AddPlatformDto, ComprobePlatformDto, GetAllPlatformsDto } from "../../domain/dtos";
import mongoose, { Schema, Document, Types } from 'mongoose';
import { PaginatedResult } from "../../interfaces/paginatedResults.interface";


export class PlatformRepositoryImpl implements PlatformRepository{
    constructor(
        private readonly platformDatasource: PlatformDatasource
    ){}

    addPlatform(addPlatformDto: AddPlatformDto): Promise<PlatformEntity> {
        return this.platformDatasource.addPlatform( addPlatformDto );
    }

    getAllPlatforms( getAllPlatformsDto: GetAllPlatformsDto ): Promise<PaginatedResult<PlatformEntity>> {
        return this.platformDatasource.getAllPlatforms(getAllPlatformsDto)
    }

    comprobePlatform( comprobePlatformDto: ComprobePlatformDto ): Promise<Types.ObjectId>{
        return this.platformDatasource.comprobePlatform( comprobePlatformDto );
    }

}