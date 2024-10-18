
import mongoose, { Schema, Document, Types } from 'mongoose';
import { PlatformEntity } from "../enitities/platform.entity";
import { AddPlatformDto, ComprobePlatformDto, GetAllPlatformsDto } from "../dtos";
import { PaginatedResult } from '../../interfaces/paginatedResults.interface';



export abstract class PlatformRepository{
    
    abstract addPlatform( addPlatformDto: AddPlatformDto ): Promise<PlatformEntity>

    abstract getAllPlatforms( getAllPlatformsDto?: GetAllPlatformsDto ): Promise<PaginatedResult<PlatformEntity>>

    abstract comprobePlatform( comprobePlatformDto: ComprobePlatformDto ): Promise<Types.ObjectId>
}