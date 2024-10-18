
import { Types } from "mongoose";
import { GenreRepository } from "../../repositories/genre.repository";
import { ComprobeGenreDto } from "../../dtos";


export class ComprobeGenre {
    constructor(
        private readonly genreRepository: GenreRepository,
    ){}

    async execute ( comprobeGenreDto: ComprobeGenreDto ): Promise<Types.ObjectId>{

        const _id = await this.genreRepository.comprobeGenre(comprobeGenreDto);
        return _id;

    }
}