import { GenreDatasource, GenreEntity, GenreRepository, GetGenreDto } from "../../domain";



export class GenreRepositoryImpl implements GenreRepository{

    constructor(
        private readonly genreDatasource: GenreDatasource
    ){}

    getGenre( getGenreDto: GetGenreDto ): Promise<GenreEntity> {
        return this.genreDatasource.getGenre( getGenreDto );
    }
}