
import { UpdateGenreDto } from "../dtos";
import { GenreRepository } from "../repositories/genre.repository";


export class UpdateGenre {
    constructor(
        private readonly genreRepository: GenreRepository,
    ){}

    async execute ( updateGenreDto: UpdateGenreDto ): Promise<any>{

        const genre = await this.genreRepository.updateGenre(updateGenreDto);
        return { genre }

    }
}