import { Router } from "express";
import { GameController } from "./gameController";
import { GameDatasourceImpl } from "../../infrastructure";
import { GameRepositoryImpl } from "../../infrastructure/repositories/game.repository.impl";
import { GenreDatasourceImpl } from "../../infrastructure/datasources/genre.datasource.impl ";
import { GenreRepositoryImpl } from "../../infrastructure/repositories/genre.repository.impl";
import { GenreController } from "./genreController";

export class ApiRoutes{
    static get routes(): Router{

        const router = Router();
        
        const gameDatasource = new GameDatasourceImpl();
        const gameRepository = new GameRepositoryImpl(gameDatasource);
        const gameController = new GameController(gameRepository);

        const genreDatasource = new GenreDatasourceImpl();
        const genreRepository = new GenreRepositoryImpl(genreDatasource);
        const genreController = new GenreController(genreRepository);
        router.post('/save', gameController.addGame);
        router.get('/existGame', gameController.comprobeGame);
        router.get('/getGenre', genreController.getGenre);
        
        return router;
    }
}