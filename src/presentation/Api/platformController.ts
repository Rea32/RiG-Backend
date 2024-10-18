import { Request, Response } from "express";
import { CustomError, PlatformRepository } from "../../domain";
import { AddPlatformDto } from "../../domain/dtos/platform/add-platform.dto";
import { AddPlatform } from "../../domain/use-cases/Añadir/add-platform.use-case";
import { platform } from "os";
import { GetAllPlatforms } from "../../domain/use-cases/Get/get-all-platforms.use-case";
import { ComprobePlatformDto, GetAllPlatformsDto } from "../../domain/dtos";
import { ComprobePlatform } from "../../domain/use-cases/Comprobe/comprobe-platform.use-case";

export class PlatformController {
    constructor(
        private readonly platformRepository: PlatformRepository
    ){}

    private handleError = ( error: any, res: Response) => {
        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        return res.status(500).json({ error: 'Internal Server Error '});
    }

    addPlatform = ( req: Request, res: Response ) => {
        const [ error, addPlatformDto ] = AddPlatformDto.create(req.body);

        if ( error ) return res.status(400).json({ error });

        new AddPlatform ( this.platformRepository )
            .execute( addPlatformDto! )
            .then( platform => res.json(platform))
            .catch( error => this.handleError( error, res ));
    }
    getAllPlatforms = ( req: Request, res: Response) => {
        const getAllPlatformsDto  = GetAllPlatformsDto.query(req.query);
        new GetAllPlatforms( this.platformRepository )
        .execute( getAllPlatformsDto!)
        .then (platform=>res.json(platform))
        .catch( error => this.handleError( error, res ));
        
    }

    comprobePlatform = ( req: Request, res: Response ) => {
        const [ error, comprobePlatformDto ] = ComprobePlatformDto.query(req.query);
        if ( error ) return res.status(400).json( { error });

        new ComprobePlatform ( this.platformRepository )
        .execute( comprobePlatformDto! )
        .then ((_id) =>{ console.log(_id);return res.json(_id);})
        .catch( error => this.handleError( error, res ) );
    }

}