import { Request, Response } from "express";
import { AddGame, AddGameDto, ComprobeGameDto, CustomError, GameRepository, GetGenreDto } from "../../domain";
import { GetGenre } from "../../domain/use-cases/get-genre.use-case";
import { ComprobeGame } from "../../domain/use-cases/comprobe-game.use-case";


export class GameController{
    constructor(
        private readonly gameRepository : GameRepository,
    ){}

    private handleError = ( error: any, res: Response) => {
        // console.log(error);
        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        
        return res.status(500).json({ error: 'Internal Server Error'});
    }

   addGame = ( req: Request, res: Response) => {
    // console.log(req.body);
        const [ error, addGameDto ] = AddGameDto.create(req.body);
        if ( error ) return res.status(400).json( { error });

        new AddGame ( this.gameRepository )
            .execute( addGameDto! )
            .then ( ({game}) => {console.log(game); return res.json(game)})
            .catch( error => this.handleError( error, res ) )
    }
    comprobeGame = ( req: Request, res: Response) => {
        // console.log(req.body);
            const [ error, comprobeGameDto ] = ComprobeGameDto.query(req.query);
            if ( error ) return res.status(400).json( { error });
    
            new ComprobeGame ( this.gameRepository )
                .execute( comprobeGameDto! )
                .then ((exist) =>{ console.log(exist);return res.json(exist);})
                .catch( error => this.handleError( error, res ) )
        }

}