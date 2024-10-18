import mongoose, { Schema, Document, Types } from 'mongoose';
import { AddPlatformDto, ComprobePlatformDto, GetAllPlatformsDto } from "../dtos";
import { PlatformEntity } from "../enitities/platform.entity";
import { PaginatedResult } from '../../interfaces/paginatedResults.interface';




export abstract class PlatformDatasource{

    abstract addPlatform ( addPlatformDto: AddPlatformDto ): Promise<PlatformEntity>

    abstract getAllPlatforms ( getAllPlatformsDto?: GetAllPlatformsDto ): Promise<PaginatedResult<any>>

    abstract comprobePlatform ( comprobePlatformDto: ComprobePlatformDto ): Promise<Types.ObjectId>

}