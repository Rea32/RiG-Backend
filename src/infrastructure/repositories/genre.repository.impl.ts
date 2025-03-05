import { Types } from "mongoose";
import { GenreDatasource, GenreEntity, GenreRepository } from "../../domain";
import { AddGenreDto, ComprobeGenreDto, GetAllDto, GetGenreDto, UpdateGenreDto } from "../../domain/dtos";
import { PaginatedResult } from "../../interfaces/paginatedResults.interface";



export class GenreRepositoryImpl implements GenreRepository{

    constructor(
        private readonly genreDatasource: GenreDatasource
    ){}
    addGenre( addGenreDto: AddGenreDto ): Promise<GenreEntity> {
        return this.genreDatasource.addGenre( addGenreDto );
    }

    comprobeGenre( comprobeGenreDto: ComprobeGenreDto ): Promise<Types.ObjectId> {
        return this.genreDatasource.comprobeGenre( comprobeGenreDto );
    }

    getGenre( getGenreDto: GetGenreDto ): Promise<GenreEntity> {
        return this.genreDatasource.getGenre( getGenreDto );
    }

    getAllGenre( getAllDto:GetAllDto ): Promise<PaginatedResult<GenreEntity>> {
        return this.genreDatasource.getAllGenre( getAllDto );
    }

    updateGenre( updateGenreDto: UpdateGenreDto ): Promise<GenreEntity> {
        return this.genreDatasource.updateGenre( updateGenreDto );
    }
}