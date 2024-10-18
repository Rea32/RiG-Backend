import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { UpdateGameAndSagaDto } from "../../domain/dtos/combine";
import { UpdateGameAndSaga } from "../../domain/use-cases/update-gameandsaga.use-case";


export class CombineController{
    constructor(){}

    private handleError = ( error: any, res: Response) => {

        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        
        return res.status(500).json({ error: 'Internal Server Error'});
    }

    updateGameAndSaga = ( req: Request, res: Response) => {
        const { _idGame, _idSaga, gameInfo, sagaInfo } = req.body;
        const [ error, updateGameAndSagaDto ] = UpdateGameAndSagaDto.query(_idGame, _idSaga, { gameInfo, sagaInfo });;
        if ( error ) return res.status(400).json( { error });
        new UpdateGameAndSaga ()
        .execute(updateGameAndSagaDto!)
        .then((gameAndSaga) => (res.json(gameAndSaga)))
        .catch(error => this.handleError(error, res))
    }
}