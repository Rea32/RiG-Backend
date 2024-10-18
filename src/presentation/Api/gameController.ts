import { Request, Response } from "express";
import { CustomError, GameRepository } from "../../domain";
import { findAndAddDevelopers, findAndAddPublisher, findAndAddTags } from "../../helpers";
import { AddGameDto, ComprobeGameDto, DeleteDto, FilterGameDto, GetAllDto, GetGameDto, SearchByTituloDto, SearchGameByGenreDto, SearchGameDto, SearchGameQueryDto, SearchSimilarGamesDto, UpdateGameDto, UpdateRemakeAndRemasterDto } from "../../domain/dtos";
import { AddGame, ComprobeGame, Delete, FilterGame, GetAllGames, GetFiveLastGames, GetGame, GetOtdGames, GetUpcomingGames, SearchByTitulo, SearchGame, SearchGameByGenre, SearchGameQuery, SearchSimilarGames, UpdateGame, UpdateRemakeAndRemasterReferences } from "../../domain/use-cases";
import { GameModel } from "../../data/mongodb/models/game.model";






export class GameController {
    constructor(
        private readonly gameRepository: GameRepository,
    ) { }

    private handleError = (error: any, res: Response) => {
        // console.log(error);
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }

    addGame = (req: Request, res: Response) => {
        // console.log('req',req.body);
        const [error, addGameDto] = AddGameDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new AddGame(this.gameRepository)
            .execute(addGameDto!)
            .then(({ game }) => {
                // findAndUpdateSagas( game );//Añade a Sagas si procede
                // findAndAddTags(game);
                findAndAddDevelopers(game);
                findAndAddPublisher(game);
                console.log('RespuestaGameDatasourceImpl: ',game);
                return res.json(game)
            })
            .catch(error => this.handleError(error, res))
    }

    comprobeGame = (req: Request, res: Response) => {
        // console.log(req.body);
        const [error, comprobeGameDto] = ComprobeGameDto.query(req.query);
        if (error) return res.status(400).json({ error });

        new ComprobeGame(this.gameRepository)
            .execute(comprobeGameDto!)
            .then((exist) => { console.log(exist); return res.json(exist); })
            .catch(error => this.handleError(error, res))
    }

    deleteGame = (req: Request, res: Response) => {
        const [error, deleteDto] = DeleteDto.delete(req.query);
        if (error) return res.status(400).json({ error });

        new Delete()
            .delete(GameModel, deleteDto!)
            .then((deletedGame) => { console.log(deletedGame); return res.json(deletedGame); })
            .catch(error => this.handleError(error, res))
    }

    filterGame = (req:Request, res: Response) => {
        const [error, filterGameDto] = FilterGameDto.query(req.body);
        if (error) return res.status(400).json({ error });

        new FilterGame(this.gameRepository)
            .execute(filterGameDto!)
            .then((game)=> res.json(game))
            .catch(error => this.handleError(error, res))
    }

    getAllGames = (req: Request, res: Response) => {
        const getAllGamesDto = GetAllDto.query(req.query);

        new GetAllGames(this.gameRepository)
            .execute(getAllGamesDto!)
            .then((game) => { console.log(game); return res.json(game); })
            .catch(error => this.handleError(error, res))
    }

    getFiveLastGames = (req: Request, res: Response) => {

        new GetFiveLastGames(this.gameRepository)
            .execute()
            .then((game) => { console.log(game); return res.json(game); })
            .catch(error => this.handleError(error, res))
    }

    getOtdGames = (req: Request, res: Response) => {

        new GetOtdGames(this.gameRepository)
            .execute()
            .then((game) => {  return res.json(game); })
            .catch(error => this.handleError(error, res))
    }

    getUpcomingGames = (req: Request, res: Response) => {

        new GetUpcomingGames(this.gameRepository)
            .execute()
            .then((game) => { console.log('UpcomingGames: ',game); return res.json(game); })
            .catch(error => this.handleError(error, res))
    }

    getGame = (req: Request, res: Response) => {
        const [error, getGameDto] = GetGameDto.query(req.query);
        if (error) return res.status(400).json({ error });

        new GetGame(this.gameRepository)
            .execute(getGameDto!)
            .then(({ game }) => { console.log(game); return res.json(game); })
            .catch(error => this.handleError(error, res))
    }

    searchGame = (req: Request, res: Response) => {

        const [error, searchGameDto] = SearchGameDto.query(req.query);
        if (error) return res.status(400).json({ error });

        new SearchGame(this.gameRepository)
            .execute(searchGameDto!)
            .then(({ game }) => { console.log(game); return res.json(game); })
            .catch(error => this.handleError(error, res))
    }

    searchGameQuery = (req: Request, res: Response) => {

        const [error, searchGameQueryDto] = SearchGameQueryDto.query(req.body);
        if (error) return res.status(400).json({ error });

        new SearchGameQuery(this.gameRepository)
            .execute(searchGameQueryDto!)
            .then(({ game }) => { console.log(game); return res.json(game); })
            .catch(error => this.handleError(error, res));
    }

    searchGameByGenre = (req: Request, res: Response) => {

        const [error, searchGameByGenreDto] = SearchGameByGenreDto.query(req.body);
        if (error) return res.status(400).json({ error });

        new SearchGameByGenre(this.gameRepository)
            .execute(searchGameByGenreDto!)
            .then(( {games} ) => { console.log(games); return res.json(games); })
            .catch(error => this.handleError(error, res))
    }

    searchGameLite = (req: Request, res: Response) => {

        const [error, searchGameDto] = SearchGameDto.query(req.query);
        if (error) return res.status(400).json({ error });

        new SearchGame(this.gameRepository)
            .execute(searchGameDto!)
            .then(({ game }) => {
                const gameLite = game.map((game: any) => ({ _id: game._id, titulo: game.titulo }));
                return res.json(gameLite);
            })
            .catch(error => this.handleError(error, res))
    }

    searchGameByTitulo = ( req: Request, res: Response) => {

        const [ error, searchGameDto ] = SearchByTituloDto.query(req.query);
        if ( error ) return res.status(400).json( { error });
        new SearchByTitulo(  )
        .search( GameModel, searchGameDto! )
        .then (game=>res.json(game))
        .catch( error => this.handleError( error, res ));
        
    }

    searchSimilarGames = (req: Request, res: Response) => {
        const [error, searchSimilarGamesDto] = SearchSimilarGamesDto.query(req.body);
        if (error) return res.status(400).json({ error });

        new SearchSimilarGames(this.gameRepository)
            .execute(searchSimilarGamesDto!)
            .then(({ game }) => { console.log(game); return res.json(game); })
            .catch(error => this.handleError(error, res));
    }

    updateGame = (req: Request, res: Response) => {
   
        const [error, updateGameDto] = UpdateGameDto.query(req.params.id, req.body);
        if (error) return res.status(400).json({ error });

        new UpdateGame(this.gameRepository)
            .execute(updateGameDto!)
            .then(({ game }) => (res.json(game)))
            .catch(error => this.handleError(error, res))
    }

    updateReamkeAndRemaster = (req: Request, res: Response) => {

        const [error, updateRemakeAndRemasterDto] = UpdateRemakeAndRemasterDto.query(req.body)
        if (error) return res.status(400).json({ error });

        new UpdateRemakeAndRemasterReferences(this.gameRepository)
            .execute(updateRemakeAndRemasterDto!)
            .then(( updatedRemakeOrRemaster ) => (res.json(updatedRemakeOrRemaster)))
            .catch(error => this.handleError(error, res))
    }

}