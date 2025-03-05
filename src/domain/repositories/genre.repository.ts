
import { Types } from "mongoose";
import { AddGenreDto, ComprobeGenreDto, GetAllDto, GetGenreDto, UpdateGenreDto } from "../dtos";
import { GenreEntity } from "../enitities/genre.entity";
import { PaginatedResult } from "../../interfaces/paginatedResults.interface";


export abstract class GenreRepository{

    abstract addGenre ( addGenreDto: AddGenreDto ): Promise<GenreEntity>

    abstract comprobeGenre( comprobeGenreDto: ComprobeGenreDto ): Promise<Types.ObjectId>

    abstract getGenre( getGenreDto: GetGenreDto ): Promise<GenreEntity>

    abstract getAllGenre( getAllDto:GetAllDto ): Promise<PaginatedResult<GenreEntity>>

    abstract updateGenre ( updateGenreDto: UpdateGenreDto ): Promise<GenreEntity>
}