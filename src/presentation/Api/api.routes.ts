import { Router } from "express";
import { ApiController } from "./controller";
import { GameDatasourceImpl } from "../../infrastructure";
import { GameRepositoryImpl } from "../../infrastructure/repositories/game.repository.impl";

export class ApiRoutes{
    static get routes(): Router{

        const router = Router();
        
        const datasource = new GameDatasourceImpl();
        // console.log(datasource);
        const gameRepository = new GameRepositoryImpl(datasource);
        const controller = new ApiController(gameRepository);
        router.post('/save', controller.addGame);
        router.get('/getGenre', controller.getGenre);
        
        return router;
    }
}