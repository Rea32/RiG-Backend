
import { GameEntity } from "../domain";
import { DeveloperModel } from "../data/mongodb/models/developer.model";


export const findAndAddDevelopers = async (game: GameEntity) => {
    try {
        const developers = await DeveloperModel.find({});
        if (!developers) return;
        // console.log(`Game Developers: `, game);
        const newDevelopers = game.desarrolladoras.filter((gameDeveloper: any) => developers.some((developer: any) => developer.id === gameDeveloper.id));
        // console.log(newDevelopers)
        if (newDevelopers.length === 0) return;
        
        const newCompleteDevelopersPromises = newDevelopers.map(async (developer: any) => {

            return new DeveloperModel({ id: developer.id, nombre: developer.name })
        })
        const newCompleteDevelopers = await Promise.all(newCompleteDevelopersPromises);

        const dbResp = await DeveloperModel.insertMany(newCompleteDevelopers);
        // console.log(dbResp)
        console.log("Nuevas desarrolladoras agregadas")
    } catch (error) {
        console.log(error)
    }

}