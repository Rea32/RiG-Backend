
import { CustomError, GenreDatasource, GenreEntity, GetGenreDto } from "../../domain";
import { GenreModel } from "../../data/mongodb/models/genre.model";
import { GenreMapper } from "../mappers/genre.mapper";


export class GenreDatasourceImpl implements GenreDatasource{
    constructor(){}
    
    async getGenre (getGenreDto: GetGenreDto): Promise<GenreEntity> {
        const { name } = getGenreDto;
        // console.log(`El nombre ${name}`);

        try {
            const genero = await GenreModel.findOne( { name });
            
            if ( !genero ) throw CustomError.badRequest('El nombre del Genero no existe'); 


            return GenreMapper.genreEntityFromObject(genero);

        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
           
            
        }
    }
}