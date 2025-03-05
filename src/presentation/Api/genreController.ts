import { Request, Response } from "express";
import { CustomError, GenreRepository } from "../../domain";
import { GenreModel } from "../../data/mongodb/models/genre.model";
import { AddGenreDto, ComprobeGenreDto, GetAllDto, GetGenreDto, UpdateGenreDto } from "../../domain/dtos";
import { AddGenre, ComprobeGenre, Get, GetAllGenre, GetGenre, UpdateGenre } from "../../domain/use-cases";


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

    addGenre = ( req: Request, res: Response) => {
        // console.log(req.body);
            const [ error, addGenreDto ] = AddGenreDto.create(req.body);
            if ( error ) return res.status(400).json( { error });
    
            new AddGenre( this.genreRepository )
                .execute( addGenreDto! )
                .then ( ({genre}) => {
                    return res.json(genre)
                })
                .catch( error => this.handleError( error, res ) )
        }

    comprobeGenre = ( req: Request, res: Response) => {
        const [ error, comprobeGenreDto ] = ComprobeGenreDto.query(req.query);
        if ( error ) return res.status(400).json( { error });

        new ComprobeGenre ( this.genreRepository )
        .execute( comprobeGenreDto! )
        .then ((_id) =>{ console.log(_id);return res.json(_id);})
        .catch( error => this.handleError( error, res ) );
    }
    
    getGenre = ( req: Request, res: Response) => {
        const [ error, getGenreDto ] = GetGenreDto.query(req.query);

        if ( error ) return res.status(400).json( { error } );

        new GetGenre( this.genreRepository )
        .execute( getGenreDto! )
        .then (genre=>res.json(genre))
        .catch( error => this.handleError( error, res ));
        
    }

    getLastID = ( req: Request, res: Response) => {
        new Get(  )
        .maxId( GenreModel )
        .then (id=>res.json(id))
        .catch( error => this.handleError( error, res ));
    }

    getAllGenre = ( req: Request, res: Response) => {
        const getAllGenreDto  = GetAllDto.query(req.query);

        new GetAllGenre( this.genreRepository )
        .execute( getAllGenreDto! )
        .then (genre=>res.json(genre))
        .catch( error => this.handleError( error, res ));
        
    }

    updateGenre = (req: Request, res: Response) => {

        const [error, updateGenreDto] = UpdateGenreDto.query(req.body)
        if (error) return res.status(400).json({ error });

        new UpdateGenre(this.genreRepository)
            .execute(updateGenreDto!)
            .then(( updateGenre ) => (res.json(updateGenre)))
            .catch(error => this.handleError(error, res))
    }
}