import { Request, Response } from "express";

import { CustomError } from "../../domain";
import { DeveloperModel } from "../../data/mongodb/models/developer.model";
import { AddMassiveDto, ComprobeBasicDto, GetAllDto, SearchByNameDto } from "../../domain/dtos";
import { AddMassive, ComprobeDeveloper, GetAllDevelopers, SearchByName } from "../../domain/use-cases";



export class DeveloperController{
    constructor(){}

    private handleError = ( error: any, res: Response) => {

        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        
        return res.status(500).json({ error: 'Internal Server Error'});
    }

    addDeveloper = ( req: Request, res: Response) => {
        const [ error, addDeveloperDto ] = AddMassiveDto.create(req.body);
        if ( error ) return res.status(400).json( { error });
        new AddMassive(  )
        .add( DeveloperModel, addDeveloperDto! )
        .then ( developer => res.json(developer) )
        .catch( error => this.handleError( error, res ));
    }

    comprobeDeveloper = ( req: Request, res: Response) => {
        const [ error, comprobeDeveloperDto ] = ComprobeBasicDto.query(req.query);
        if ( error ) return res.status(400).json( { error });

        new ComprobeDeveloper ( )
        .query( comprobeDeveloperDto! )
        .then ((_id) =>{ console.log(_id);return res.json(_id);})
        .catch( error => this.handleError( error, res ) );
    }

    getAllDevelopers = ( req: Request, res: Response) => {
        const getAllDevDto  = GetAllDto.query(req.query);

        new GetAllDevelopers( )
        .execute( getAllDevDto! )
        .then (tag=>res.json(tag))
        .catch( error => this.handleError( error, res ));
        
    }

    searchDeveloperByName = ( req: Request, res: Response) => {

        const [ error, searchDeveloperDto ] = SearchByNameDto.query(req.query);
        if ( error ) return res.status(400).json( { error });
        new SearchByName(  )
        .search( DeveloperModel, searchDeveloperDto! )
        .then (developer=>res.json(developer))
        .catch( error => this.handleError( error, res ));
        
    }
}