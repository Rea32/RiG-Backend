import { Router } from "express";

import { GameDatasourceImpl } from "../../infrastructure";
import { GameRepositoryImpl } from "../../infrastructure/repositories/game.repository.impl";
import { GenreDatasourceImpl } from "../../infrastructure/datasources/genre.datasource.impl ";
import { GenreRepositoryImpl } from "../../infrastructure/repositories/genre.repository.impl";

import { PlatformDatasourceImpl } from "../../infrastructure/datasources/platform.datasource.impl";
import { PlatformRepositoryImpl } from "../../infrastructure/repositories/platform.repository.impl";

import { GameController } from "./gameController";
import { GenreController } from "./genreController";
import { PlatformController } from "./platformController";
import { TagController } from "./tagController";
import { PublisherController } from "./publisherController";
import { DeveloperController } from "./developerController";
import { MecanicaController } from "./mecanicaController";
import { SagaController } from "./sagaController";
import { CombineController } from "./combineController";





export class ApiRoutes{
    static get routes(): Router{

        const router = Router();

        const gameDatasource = new GameDatasourceImpl();
        const gameRepository = new GameRepositoryImpl(gameDatasource);
        const gameController = new GameController(gameRepository);

        const genreDatasource = new GenreDatasourceImpl();
        const genreRepository = new GenreRepositoryImpl(genreDatasource);
        const genreController = new GenreController(genreRepository);

        const platformDatasource = new PlatformDatasourceImpl();
        const platformRepository = new PlatformRepositoryImpl(platformDatasource);
        const platformController = new PlatformController(platformRepository);

        const tagController = new TagController();
        const publisherController = new PublisherController();
        const mecanicaController = new MecanicaController();
        const developerController = new DeveloperController();
        const sagaController = new SagaController();
        const combineController = new CombineController();
        
        
        // ADD
        router.post('/save', gameController.addGame);
        router.post('/addPlat', platformController.addPlatform);
        router.post('/addGenre', genreController.addGenre);
        router.post('/addPublisher', publisherController.addPublisher);
        router.post('/addMecanica', mecanicaController.addMecanica);
        router.post('/addTag', tagController.addTag);
        router.post('/addSaga', sagaController.addSaga);
        router.post('/addDeveloper', developerController.addDeveloper);

        // COMPROBE
        router.get('/existGame', gameController.comprobeGame);
        router.get('/existPlatform', platformController.comprobePlatform);
        router.get('/existGenre', genreController.comprobeGenre);
        router.get('/existDeveloper', developerController.comprobeDeveloper);
        router.get('/existPublisher', publisherController.comprobePublisher);

        //DELETE
        router.delete('/deleteGame', gameController.deleteGame);
        router.delete('/deleteMecanica', mecanicaController.deleteMecanica);
        router.delete('/deleteTag', tagController.deleteTag);

        //FILTER
        router.post('/filterGame', gameController.filterGame);

        // GET
        router.get('/getGame', gameController.getGame);
        router.get('/getGenre', genreController.getGenre);
        router.get('/getFiveLastGames', gameController.getFiveLastGames);
        router.get('/getOtdGames', gameController.getOtdGames);
        router.get('/getUpcomingGames', gameController.getUpcomingGames);

        //GET ALL
        router.get('/getAllGames', gameController.getAllGames);
        router.get('/getAllGenres', genreController.getAllGenre);
        router.get('/getAllPlatforms', platformController.getAllPlatforms);
        router.get('/getAllTags', tagController.getAllTag);
        router.get('/getAllPublishers', publisherController.getAllPublisher);
        router.get('/getAllDevelopers', developerController.getAllDevelopers);
        router.get('/getAllSagas', sagaController.getAllSagas);
        router.get('/getAllMecanicas', mecanicaController.getAllMecanicas);
        
        //GET MAX ID
        router.get('/getSagaMaxID', sagaController.getLastID);
        router.get('/getGenreMaxID', genreController.getLastID);

        //SEARCH
        router.get('/search', gameController.searchGame);
        router.get('/searchGameLite', gameController.searchGameLite);
        // router.post('/searchSimilarGames', gameController.searchGameByGenre);
        router.get('/searchGame', gameController.searchGameByTitulo);
        router.post('/searchGameQuery', gameController.searchGameQuery);
        router.get('/searchPublisher', publisherController.searchPublisherByName);
        router.get('/searchMecanica', mecanicaController.searchMecanicaByName);
        router.get('/searchDeveloper', developerController.searchDeveloperByName);
        router.get('/searchSaga', sagaController.searchSagaByName);
        router.post('/searchSimilarGames', gameController.searchSimilarGames);
        
        // PUT
        router.put('/updateGame/:id', gameController.updateGame);
        router.put('/updateRemasterAndRemake', gameController.updateReamkeAndRemaster);
        router.put('/updateSaga/:id', sagaController.updateSaga);
        router.put('/updateGameAndSaga', combineController.updateGameAndSaga);

        return router;
    }
}