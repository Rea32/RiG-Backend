import { Request, Response } from "express";
import { AddGameDto, CustomError, GameRepository } from "../../domain";


export class ApiController{
    constructor(
        private readonly gameRepository : GameRepository
    ){}

    private handleError = ( error: any, res: Response) => {
        // console.log(error);
        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        
        return res.status(500).json({ error: 'Internal Server Error'});
    }

   addGame = ( req: Request, res: Response) => {
    console.log(req.body);
        const [ error, addGameDto ] = AddGameDto.create(req.body);
        if ( error ) return res.status(400).json( { error });

        this.gameRepository.addGame( addGameDto! )
            .then ( (game) => {return res.json(game)})
            .catch( error => this.handleError( error, res ) )
    }

    getGenre = ( req: Request, res: Response) => {
        
    }
}