import { Request, Response } from "express";
import { CustomError } from "../../domain";

import { SearchByName } from "../../domain/use-cases/search-by-name.use-case";


import { MecanicaModel } from "../../data/mongodb/models/mecanica.model";

import { AddBasicUseCase } from "../../domain/use-cases/Añadir/add-basic.use-case";
import { AddBasicDto, DeleteDto, GetAllDto, SearchByNameDto } from "../../domain/dtos";
import { Delete, GetAllMecanicas } from "../../domain/use-cases";


export class MecanicaController{
    constructor(){}

    private handleError = ( error: any, res: Response) => {
        // console.log(error);
        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        
        return res.status(500).json({ error: 'Internal Server Error'});
    }

    addMecanica = ( req: Request, res: Response) => {
        const [ error, addMecanicaDto ] = AddBasicDto.create(req.body);
        if ( error ) return res.status(400).json( { error });
        new AddBasicUseCase(  )
        .add( MecanicaModel, addMecanicaDto! )
        .then (mecanica=>res.json(mecanica))
        .catch( error => this.handleError( error, res ));
    }

    deleteMecanica = ( req: Request, res: Response) => {
        const [error, deleteDto] = DeleteDto.delete(req.query);
        if (error) return res.status(400).json({ error });

        new Delete()
            .delete(MecanicaModel, deleteDto!)
            .then(( deletedMecanica ) => { console.log( deletedMecanica ); return res.json( deletedMecanica ); })
            .catch(error => this.handleError(error, res))
    }

    getAllMecanicas = ( req: Request, res: Response) => {
        const getAllMecanicaDto  = GetAllDto.query(req.query);
        new GetAllMecanicas(  )
        .execute( getAllMecanicaDto! )
        .then (mecanicas=> res.json(mecanicas))
        .catch( error => this.handleError( error, res ));
        
    }

    searchMecanicaByName = ( req: Request, res: Response) => {

        const [ error, searchMecanicaDto ] = SearchByNameDto.query(req.query);
        if ( error ) return res.status(400).json( { error });
        new SearchByName(  )
        .search( MecanicaModel, searchMecanicaDto! )
        .then (mecanica=>res.json(mecanica))
        .catch( error => this.handleError( error, res ));
        
    }
}