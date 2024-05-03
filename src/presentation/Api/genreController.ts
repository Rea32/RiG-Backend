import { Request, Response } from "express";
import { CustomError, GenreRepository, GetGenreDto } from "../../domain";
import { GetGenre } from "../../domain/use-cases/get-genre.use-case";


export class GenreController{
    constructor(
        private readonly genreRepository : GenreRepository
    ){}

    private handleError = ( error: any, res: Response) => {
        // console.log(error);
        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        
        return res.status(500).json({ error: 'Internal Server Error'});
    }


    getGenre = ( req: Request, res: Response) => {
        const [ error, getGenreDto ] = GetGenreDto.query(req.query);

        if ( error ) return res.status(400).json( { error } );

        new GetGenre( this.genreRepository )
        .execute( getGenreDto! )
        .then (genre=>res.json(genre))
        .catch( error => this.handleError( error, res ));
        
    }
}