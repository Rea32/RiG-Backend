
import { GetGenreDto } from "../dtos/get-genre.dto";
import { GenreEntity } from "../enitities/genre.entity";


export abstract class GenreDatasource{

    abstract getGenre ( getGenreDto: GetGenreDto ): Promise<GenreEntity>

}