import mongoose, { Schema, Document, Types } from 'mongoose';
import { PlatformModel } from "../../data/mongodb/models/platform.model";
import { CustomError } from "../../domain";
import { PlatformDatasource } from "../../domain/datasources/platform.datasource";
import { AddPlatformDto, ComprobePlatformDto, GetAllPlatformsDto } from "../../domain/dtos";
import { PlatformEntity } from "../../domain/enitities/platform.entity";
import { PlatformMapper } from "../mappers/platform.mapper";
import { PaginatedResult } from '../../interfaces/paginatedResults.interface';

const emptyPlatformEntity = {
    id:0,
    name:""
}

export class PlatformDatasourceImpl implements PlatformDatasource {
    
    async addPlatform(addPlatformDto: AddPlatformDto): Promise<PlatformEntity> {
        const { id, nombre, año_lanzamiento, slug } = addPlatformDto
        try {
            const exist = await PlatformModel.findOne( { $or: [{ id }, { nombre }] });
            if ( exist ) throw CustomError.badRequest('La plataforma ya existe');

            const plataforma = await PlatformModel.create({
                id: id,
                name: nombre,
                slug: slug,
                año_lanzamiento: año_lanzamiento
            });

            return PlatformMapper.platformEntityFromObject( plataforma );
        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getAllPlatforms ( getAllPlatformsDto:GetAllPlatformsDto ): Promise<PaginatedResult<any>> {

        try {
            const { page, limit } = getAllPlatformsDto;
            const skip = (page - 1) * limit;
            const totalItems = await PlatformModel.countDocuments({});
            const plataformas = await PlatformModel.find({}).sort({ name: 1 })
            .skip(skip)
            .limit(limit);

            if ( !plataformas ) throw CustomError.badRequest('No existe ninguna plataforma');

            const totalPages = Math.ceil(totalItems / limit);

            return{
                element: plataformas,
                currentPage: page,
                totalPages,
                totalItems
            }

        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
           
            
        }
    }

    async comprobePlatform(comprobePlatformDto: ComprobePlatformDto): Promise<Types.ObjectId> {

        const { id } = comprobePlatformDto;

        try {
            const platform = await PlatformModel.findOne( { id });
            if ( !platform ) throw CustomError.badRequest("La plataforma no existe en la RiGDB");
            return platform._id;
        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }

    }

}