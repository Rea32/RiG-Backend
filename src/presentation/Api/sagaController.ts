import { Request, Response } from "express";
import { CustomError } from "../../domain";

import { SagaModel } from "../../data/mongodb/models/saga.model";
import { AddSagaUseCase, Get, GetAllSagas, SearchSagaByName, UpdateSaga } from "../../domain/use-cases";
import { AddSagaDto, GetAllDto, SearchByNameDto, UpdateSagaDto } from "../../domain/dtos";


export class SagaController{
    constructor(){}

    private handleError = ( error: any, res: Response) => {
        // console.log(error);
        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        
        return res.status(500).json({ error: 'Internal Server Error'});
    }
    addSaga = ( req: Request, res: Response) => {
        const [ error, addSagaDto ] = AddSagaDto.create(req.body);
        if ( error ) return res.status(400).json( { error });
        new AddSagaUseCase(  )
        .add( addSagaDto! )
        .then (saga=>res.json(saga))
        .catch( error => this.handleError( error, res ));
    }
    
    getLastID = ( req: Request, res: Response) => {
        new Get(  )
        .maxId( SagaModel )
        .then (id=>res.json(id))
        .catch( error => this.handleError( error, res ));
    }
    // getAllPublisher = ( req: Request, res: Response) => {

    //     new GetAllPublishers(  )
    //     .execute( )
    //     .then (publisher=>res.json(publisher))
    //     .catch( error => this.handleError( error, res ));
        
    // }
    getAllSagas = ( req: Request, res: Response) => {
        const getAllSagasDto  = GetAllDto.query(req.query);

        new GetAllSagas(  )
        .execute( getAllSagasDto! )
        .then ( saga => res.json( saga ) )
        .catch( error => this.handleError( error, res ));
        
    }
    searchSagaByName = ( req: Request, res: Response) => {

        const [ error, searchSagaDto ] = SearchByNameDto.query(req.query);
        if ( error ) return res.status(400).json( { error });
        new SearchSagaByName(  )
        .search( SagaModel, searchSagaDto! )
        .then (saga=>res.json(saga))
        .catch( error => this.handleError( error, res ));  
    }

    updateSaga = ( req: Request, res: Response ) => {
        // console.log(req.body)
        const [ error, updateSagaDto ] = UpdateSagaDto.query(req.params.id, req.body);
            if ( error ) return res.status(400).json( { error });
    
            new UpdateSaga (  )
                .execute( updateSagaDto! )
                .then ((saga) =>( res.json(saga) ))
                .catch( error => this.handleError( error, res ) )
    }
}