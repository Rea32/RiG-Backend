import { AddGenreDto } from "../../dtos/genre/add-genre.dto";
import { GenreRepository } from "../../repositories/genre.repository";


export class AddGenre {
    constructor(
        private readonly genreRepository: GenreRepository,
    ){}

    async execute ( addGenreDto: AddGenreDto ): Promise<any>{

        const genre = await this.genreRepository.addGenre(addGenreDto);
        return { genre }

    }
}