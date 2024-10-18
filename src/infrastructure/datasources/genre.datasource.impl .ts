
import { CustomError, GenreDatasource, GenreEntity } from "../../domain";
import { GenreModel } from "../../data/mongodb/models/genre.model";
import { GenreMapper } from "../mappers/genre.mapper";
import { ComprobeGenreDto, GetAllDto, GetGenreDto } from "../../domain/dtos";
import { Types } from "mongoose";
import { PaginatedResult } from "../../interfaces/paginatedResults.interface";

const emptyGenreEntity = {
    id: 0,
    name: ""
}

export class GenreDatasourceImpl implements GenreDatasource {
    constructor() { }
    
    async addGenre(addGenreDto: any): Promise<GenreEntity> {
        const { id, name, parent, importants_games, description, sub_genre, image_background } = addGenreDto;
        try {
            const exist = await GenreModel.findOne({ name });
            if (exist) throw CustomError.badRequest('El nombre del genero ya existe');

            const genre = await GenreModel.create({
                id: id,
                name: name,
                parent: parent,
                importants_games: importants_games,
                description: description,
                sub_genre: sub_genre,
                image_background: image_background
            });

            return genre;

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();


        }
    }

    async comprobeGenre(comprobeGenreDto: ComprobeGenreDto): Promise<Types.ObjectId> {

        const { id } = comprobeGenreDto;

        try {
            const genre = await GenreModel.findOne( { id });
            if ( !genre ) throw CustomError.badRequest("El genero no existe en la RiGDB");
            return genre._id;
        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }

    }

    async getGenre(getGenreDto: GetGenreDto): Promise<GenreEntity> {
        const { name } = getGenreDto;
        // console.log(`El nombre ${name}`);

        try {
            const genero = await GenreModel.findOne({ name })
            .populate('sub_genres', 'name');

            if (!genero) return emptyGenreEntity;


            return genero;

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();


        }
    }

    async getAllGenre( getAllDto:GetAllDto ): Promise<PaginatedResult<GenreEntity>> {

        try {
            const { page, limit } = getAllDto;
            const skip = (page - 1) * limit;
            const totalItems = await GenreModel.countDocuments({});
            const generos = await GenreModel.find({}, '_id id name').sort({ name: 1 })
            .skip(skip)
            .limit(limit);

            if (!generos) throw CustomError.badRequest('No existe ningun genero');
            const totalPages = Math.ceil(totalItems / limit);

            return{
                element: generos,
                currentPage: page,
                totalPages,
                totalItems
            }

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();


        }
    }
}