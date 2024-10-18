import { CustomError, GameEntity } from "../../domain";
import { filterTags } from "../../helpers";


export class GameMapper {

    static async gameEntityFromObject(object: { [key: string]: any }) {
        const { _id, id, titulo, saga, remakeOf, remasterOf, hasRemake, hasRemaster, lanzamiento, plataformas, generos, mecanicas, desarrolladoras, editoras, spinOff } = object;
        let { etiquetas } = object
        if (!_id || !id) throw CustomError.badRequest('Missing id');
        if (!titulo) throw CustomError.badRequest('Missing titulo');
        if (!lanzamiento) throw CustomError.badRequest('Missing lanzamiento');
        if (!plataformas) throw CustomError.badRequest('Missing plataformas');
        if (!generos) throw CustomError.badRequest('Missing generos');
        if (!desarrolladoras) throw CustomError.badRequest('Missing desarrolladoras');
        if (!editoras) throw CustomError.badRequest('Missing editoras');
        let tags = etiquetas;
        console.log('Etiquetas: ',etiquetas)
        if (etiquetas){
            tags = await filterTags(etiquetas)
            console.log('Tags: ', tags)
        }
        return new GameEntity(
            _id || id,
            titulo,
            saga,
            lanzamiento,
            plataformas,
            generos,
            desarrolladoras,
            editoras,
            spinOff,
            etiquetas,
            mecanicas,
            remakeOf, 
            remasterOf, 
            hasRemake, 
            hasRemaster,
        )
    }

    static similarGamesFrom(mecanicasToCompare: Array<string>, games: Array<GameEntity>):Array<GameEntity> {
        try {
    
            const mecanicasToCompareStr = mecanicasToCompare.map(mecanica => mecanica.toString());
            // Filtrar juegos que tienen al menos una mecánica en común con las mecánicas a comparar
            const filteredGames = games.filter((game: any) => {
                
                const gameMecanicasStr = game.mecanicas.map((mecanica: any) => mecanica.toString());
                // console.log(gameMecanicasStr, mecanicasToCompareStr)
                return gameMecanicasStr.some((mecanica: string) => mecanicasToCompareStr.includes(mecanica));
            });

            // Si el número de juegos filtrados es menor que 6, devolver todos los juegos, de lo contrario, devolver los juegos filtrados
            const similarGames = filteredGames.length > 2 ? games : filteredGames;

            console.log("Juegos Similares: ", similarGames);
            return similarGames;
        } catch (error) {
            console.error("Error al filtrar juegos similares:", error);
            return []; // Devolver un array vacío en caso de error
        }

    }

}