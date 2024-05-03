
import { GetGenreDto } from "../dtos/get-genre.dto";
import { GenreRepository } from "../repositories/genre.repository";


export class GetGenre {
    constructor(
        private readonly genreRepository: GenreRepository,
    ){}

    async execute ( getGenreDto: GetGenreDto ): Promise<any>{

        const genre = await this.genreRepository.getGenre(getGenreDto);
        return{
            genre
        }

    }
}