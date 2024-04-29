import { Router } from "express";
import { ApiRoutes } from "./Api/api.routes";


export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api', ApiRoutes.routes);

        return router;
    }
}