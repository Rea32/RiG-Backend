import { Request, Response } from "express";
import { CustomError, GenreRepository, GetGenreDto } from "../../domain";
import { GetAllTags } from "../../domain/use-cases/Get/get-all-tags.use-case";
import { TagModel } from "../../data/mongodb/models/tag.model";
import { AddTagDto, DeleteDto, GetAllDto } from "../../domain/dtos";
import { AddTagUseCase, Delete } from "../../domain/use-cases";


export class TagController{
    constructor(){}

    private handleError = ( error: any, res: Response) => {
        // console.log(error);
        if ( error instanceof CustomError ){
            return res.status(error.statusCode).json( { error: error.message } );
        }
        
        return res.status(500).json({ error: 'Internal Server Error'});
    }

    addTag = ( req: Request, res: Response) => {
        const [ error, addTagDto ] = AddTagDto.create(req.body);
        if ( error ) return res.status(400).json( { error });
        new AddTagUseCase(  )
        .add( TagModel, addTagDto! )
        .then (tag=>res.json(tag))
        .catch( error => this.handleError( error, res ));
    }

    deleteTag = ( req: Request, res: Response) => {
        const [error, deleteDto] = DeleteDto.delete(req.query);
        if (error) return res.status(400).json({ error });

        new Delete()
            .delete(TagModel, deleteDto!)
            .then(( deletedTag ) => { console.log( deletedTag ); return res.json( deletedTag ); })
            .catch(error => this.handleError(error, res))
    }
    getAllTag = ( req: Request, res: Response) => {

        const getAllTagsDto  = GetAllDto.query(req.query);
        new GetAllTags(  )
        .execute( getAllTagsDto! )
        .then (tag=>res.json(tag))
        .catch( error => this.handleError( error, res ));
        
    }
}