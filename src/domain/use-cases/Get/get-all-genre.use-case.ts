

import { GetAllDto } from "../../dtos";
import { GenreRepository } from "../../repositories/genre.repository";


export class GetAllGenre {
    constructor(
        private readonly genreRepository: GenreRepository,
    ){}

    async execute ( getAllDto: GetAllDto ): Promise<any>{

        const genre = await this.genreRepository.getAllGenre( getAllDto );
        return genre

    }
    
}