import { Request, Response } from "express";

import { CustomError } from "../../domain";
import { PublisherModel } from "../../data/mongodb/models/publisher.model";
import { AddPublisherDto, ComprobeBasicDto, GetAllDto, SearchByNameDto } from "../../domain/dtos";
import { AddPublisher, ComprobePublisher, GetAllPublishers, SearchByName } from "../../domain/use-cases";


export class PublisherController{
    constructor(){}

    private handleError = ( error: any, res: Response) => {
        // console.log(error);
        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        
        return res.status(500).json({ error: 'Internal Server Error'});
    }

    addPublisher = ( req: Request, res: Response) => {
        const [ error, addPublisherDto ] = AddPublisherDto.create(req.body);
        if ( error ) return res.status(400).json( { error });
        new AddPublisher(  )
        .add( addPublisherDto! )
        .then (publisher=>res.json(publisher))
        .catch( error => this.handleError( error, res ));
    }

    comprobePublisher = ( req: Request, res: Response) => {
        const [ error, comprobePublisherDto ] = ComprobeBasicDto.query(req.query);
        if ( error ) return res.status(400).json( { error });

        new ComprobePublisher ( )
        .query( comprobePublisherDto! )
        .then ((_id) =>{ console.log(_id);return res.json(_id);})
        .catch( error => this.handleError( error, res ) );
    }

    getAllPublisher = ( req: Request, res: Response) => {
        const getAllPublishersDto  = GetAllDto.query(req.query);
        new GetAllPublishers(  )
        .execute( getAllPublishersDto! )
        .then (publisher=>res.json(publisher))
        .catch( error => this.handleError( error, res ));
        
    }

    searchPublisherByName = ( req: Request, res: Response) => {

        const [ error, searchPublisherDto ] = SearchByNameDto.query(req.query);
        if ( error ) return res.status(400).json( { error });
        new SearchByName(  )
        .search( PublisherModel, searchPublisherDto! )
        .then (publisher=>res.json(publisher))
        .catch( error => this.handleError( error, res ));
        
    }
}