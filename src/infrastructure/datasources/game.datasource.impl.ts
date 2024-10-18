
import { populate } from "dotenv";
import { GameModel } from "../../data/mongodb/models/game.model";
import { CustomError, GameDatasource, GameEntity } from "../../domain";
import { AddGameDto, ComprobeGameDto, FilterGameDto, GetAllDto, GetGameDto, SearchGameByGenreDto, SearchGameDto, SearchGameQueryDto, SearchSimilarGamesDto, UpdateGameDto, UpdateRemakeAndRemasterDto } from "../../domain/dtos";
import { GameMapper } from "../mappers/game.mapper";
import { PaginatedResult } from "../../interfaces/paginatedResults.interface";
import { SagaModel } from "../../data/mongodb/models/saga.model";
import { UpdateSaga } from "../../domain/use-cases";
import { buildQuery, buildSimilarGamesQuery, filterMechanics, filterTags } from "../../helpers";
import { TagEntity } from "../../domain/enitities/tag.entity";



export class GameDatasourceImpl implements GameDatasource {
    constructor() { }

    async addGame(addGameDto: AddGameDto): Promise<GameEntity> {
        const {
            titulo,
            remakeOf,
            remasterOf,
            hasRemake,
            hasRemaster,
            lanzamiento,
            plataformas,
            generos,
            mecanicas,
            desarrolladoras,
            editoras,
            tiendas,
            etiquetas,
            backgroundImage,
            spinOff
        } = addGameDto;

        try {
            console.log('GameDTO: ', addGameDto)
            const exist = await GameModel.findOne({ titulo: { $regex: new RegExp(`^${titulo}$`, 'i') } });
            if (exist) throw CustomError.badRequest('El titulo del juego ya existe');
            let tags = etiquetas;
            if (etiquetas) {
                tags = await filterTags(etiquetas)
                console.log('Tags: ', tags)
            }
            let mechanics: any = mecanicas;
            if (etiquetas) {

                mechanics = await filterMechanics(etiquetas);
                console.log('MECANICAS AQUI: ', mechanics);

            }
            const game = await GameModel.create({
                titulo: titulo,
                remakeOf: remakeOf,
                remasterOf: remasterOf,
                hasRemake: hasRemake,
                hasRemaster: hasRemaster,
                lanzamiento: lanzamiento,
                plataformas: plataformas,
                generos: generos,
                mecanicas: mechanics,
                spinOff: spinOff,
                desarrolladoras: desarrolladoras,
                editoras: editoras,
                tiendas: tiendas,
                etiquetas: tags,
                backgroundImage: backgroundImage
            });
            // Actualización de los juegos referenciados en `remakeOf` y `remasterOf`

            // console.log(  ' GameEntity: ',GameMapper.gameEntityFromObject(game))
            return GameMapper.gameEntityFromObject(game);


        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();


        }
    }

    async comprobeGame(comprobeGameDto: ComprobeGameDto): Promise<Boolean> {

        const { titulo } = comprobeGameDto;

        try {
            const exist = await GameModel.findOne({ titulo: { $regex: `^${titulo}$`, $options: 'i' } });
            if (!exist) return false;
            return true;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }

    }
    async filterGame(filterGameDto: FilterGameDto): Promise<any> {
        const { generos, mecanicas, plataformas } = filterGameDto;
        try {
            let filtros: { [key: string]: any } = {};
            const page = 1;
            const limit = 20;
            const skip = (page - 1) * limit;

            if (generos && generos.length > 0) {
                filtros.generos = { $in: generos };
            }
            if (mecanicas && mecanicas.length > 0) {
                filtros.mecanicas = { $in: mecanicas };
            }
            if (plataformas && plataformas.length > 0) {
                filtros.plataformas = { $in: plataformas };
            }

            const games = await GameModel.find(filtros)
                .skip(skip)
                .limit(20);

            if (games.length == 0) throw CustomError.badRequest('No existen juegos con dichas características');
            const totalItems = games.length;
            const totalPages = Math.ceil(totalItems / limit);
            return {
                element: games,
                currentPage: page,
                totalPages,
                totalItems
            }
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async getAllGames(getAllDto: GetAllDto): Promise<PaginatedResult<GameEntity>> {

        try {
            const { page, limit } = getAllDto;
            const skip = (page - 1) * limit;
            const totalItems = await GameModel.countDocuments({});
            const games = await GameModel.find({})
                .populate('saga')
                .populate('plataformas')
                .populate('generos', 'name')
                .populate('etiquetas', 'nombre')
                .populate('desarrolladoras', 'nombre')
                .populate('editoras', 'nombre')
                .skip(skip)
                .limit(limit);

            if (!games) throw CustomError.badRequest('No existe ningun juego');

            const totalPages = Math.ceil(totalItems / limit);

            return {
                element: games,
                currentPage: page,
                totalPages,
                totalItems
            }

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();

        }
    }

    async getFiveLastGames(): Promise<Array<GameEntity>> {

        try {
            const currentDate = new Date(); // Obtener la fecha actual

            const games = await GameModel.find({
                lanzamiento: { $lte: currentDate }
            })
                .sort({ lanzamiento: -1 }) // Ordenar por fecha de lanzamiento descendente
                .limit(5) // Limitar el resultado a 5 juegos
                .populate('saga')
                .populate('plataformas')
                .populate('generos', 'name')
                .populate('mecanicas', 'nombre')
                .populate('etiquetas', 'nombre')
                .populate('desarrolladoras', 'nombre')
                .populate('editoras', 'nombre')


            if (!games) throw CustomError.badRequest('No existe ningun juego');



            return games

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();

        }
    }

    async getOtdGames(): Promise<Array<GameEntity>> {

        try {
            const today = new Date();
            const currentDay = today.getDate();  // Obtener el día actual
            const currentMonth = today.getMonth() + 1;  // Obtener el mes actual (getMonth es 0 indexado)

            const games = await GameModel.find({
                $expr: {
                    $and: [
                        { $eq: [{ $dayOfMonth: "$lanzamiento" }, currentDay] },
                        { $eq: [{ $month: "$lanzamiento" }, currentMonth] }
                    ]
                }
            })
                .populate('saga')
                .populate('plataformas')
                .populate('generos', 'name')
                .populate('desarrolladoras', 'nombre')
                .populate('editoras', 'nombre')


            if (!games || games.length === 0) throw CustomError.badRequest('No existen juegos lanzados en este día');



            return games

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();

        }
    }

    async getUpcomingGames(): Promise<Array<GameEntity>> {

        try {
            const currentDate = new Date(); // Obtener la fecha actual

            const games = await GameModel.find({
                lanzamiento: { $gt: currentDate } // Filtrar juegos cuyo lanzamiento es posterior a la fecha actual
            })
                .sort({ lanzamiento: 1 }) // Ordenar por fecha de lanzamiento descendente
                .limit(5) // Limitar el resultado a 5 juegos
                .populate('saga')
                .populate('plataformas')
                .populate('generos', 'name')
                .populate('desarrolladoras', 'nombre')
                .populate('editoras', 'nombre')


            if (!games || games.length === 0) throw CustomError.badRequest('No hay juegos próximos a salir');

            return games

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();

        }
    }

    async getGame(getGameDto: GetGameDto): Promise<GameEntity> {
        const { _id } = getGameDto;

        try {
            const game = await GameModel.findById(_id)
                .populate('saga')
                .populate('plataformas')
                .populate('generos', 'name')
                .populate('desarrolladoras', 'nombre')
                .populate('mecanicas', 'nombre')
                .populate('etiquetas', 'nombre')
                .populate('remakeOf', 'titulo')
                .populate('remasterOf', 'titulo')
                .populate('hasRemake', 'titulo')
                .populate('hasRemaster', 'titulo')
                .populate('editoras', 'nombre');


            if (!game) throw CustomError.badRequest('El juego no existe');

            return game;

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async searchGame(searchGameDto: SearchGameDto): Promise<GameEntity> {

        const { titulo } = searchGameDto;

        try {
            const game = await GameModel.find({ titulo: { $regex: titulo, $options: 'i' } })
                .populate('saga')
                .populate('plataformas')
                .populate('generos', 'name')
                .populate('etiquetas', 'nombre')
                .populate('mecanicas', 'nombre')
                .populate('desarrolladoras', 'nombre')
                .populate('editoras', 'nombre');
            
            if (game.length == 0) throw CustomError.badRequest('El titulo del juego no existe');
            // console.log(first)
            return game;

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async searchGameQuery(searchGameQueryDto: SearchGameQueryDto): Promise<PaginatedResult<GameEntity>> {
        const { titulo, generos, mecanicas, plataformas, page = 1, limit = 20 } = searchGameQueryDto;
        // console.log({ titulo, generos, mecanicas, plataformas, page, limit })
        const query = buildQuery({ titulo, generos, mecanicas, plataformas });

        try {

            const skip = (page - 1) * limit;
            const totalItems = await GameModel.countDocuments(query);
            const games = await GameModel.find(query)
                .populate('saga')
                .populate('plataformas')
                .populate('generos', 'name')
                .populate('mecanicas', 'nombre')
                .populate('etiquetas', 'nombre')
                .populate('desarrolladoras', 'nombre')
                .populate('editoras', 'nombre')
                .skip(skip)
                .limit(limit);


            if (games.length == 0) throw CustomError.badRequest('No existe ningun juego con estas características');

            const totalPages = Math.ceil(totalItems / limit);
            return {
                element: games,
                currentPage: page,
                totalPages,
                totalItems
            };

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async searchGameByGenre(searchGameByGenreDto: SearchGameByGenreDto): Promise<Array<GameEntity>> {
        const { genero_id, mecanicas_id } = searchGameByGenreDto;
        try {
            const games = await GameModel.find({ generos: genero_id });
            if (games.length == 0) throw CustomError.badRequest('No existen juegos con generos similares');

            return GameMapper.similarGamesFrom(mecanicas_id, games);
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async searchSimilarGames(searchSimilarGamesDto: SearchSimilarGamesDto): Promise<PaginatedResult<GameEntity>> {

        const { _id, generos, mecanicas, plataformas, etiquetas, page = 1, limit = 20 } = searchSimilarGamesDto;
        // console.log({ _id, generos, mecanicas, plataformas, tags, page, limit })
        const query = buildSimilarGamesQuery({ _id, generos, mecanicas, plataformas, etiquetas });
        try {
            console.log(query)
            const skip = (page - 1) * limit;
            let totalItems = await GameModel.countDocuments(query);
            
            let games = await GameModel.find(query)
                .populate('saga')
                .populate('plataformas')
                .populate('generos', 'name')
                .populate('mecanicas', 'nombre')
                .populate('etiquetas', 'nombre')
                .populate('desarrolladoras', 'nombre')
                .populate('editoras', 'nombre')
                .skip(skip)
                .limit(limit);
                
            // Si no hay resultados, eliminar mecanicas del query y buscar de nuevo
            if (games.length === 0 && query.mecanicas) {
                console.log('No se encontraron juegos, eliminando mecanicas del query y buscando de nuevo...');
                delete query.mecanicas; // Eliminamos mecanicas del query
                totalItems = await GameModel.countDocuments(query); // Recalculamos el total
                games = await GameModel.find(query)
                    .populate('saga')
                    .populate('plataformas')
                    .populate('generos', 'name')
                    .populate('desarrolladoras', 'nombre')
                    .populate('editoras', 'nombre')
                    .skip(skip)
                    .limit(limit);
            }


            if (games.length == 0) throw CustomError.badRequest('No existe ningun juego con estas características, amplia un poco tu busqueda');

            const totalPages = Math.ceil(totalItems / limit);
            return {
                element: games,
                currentPage: page,
                totalPages,
                totalItems
            };

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async updateGame(updateGameDto: UpdateGameDto): Promise<GameEntity> {
        const { _id, gameInfo } = updateGameDto;

        try {
            // const sagaGames = await SagaModel.findOne ( { id: gameInfo.saga.id }, 'juegos_principales spin_offs' );
            const oldGame = await GameModel.findById(_id, 'saga');
            const updatedGame = await GameModel.findByIdAndUpdate(_id, gameInfo, { new: true });

            if (!updatedGame) throw CustomError.badRequest('El juego no se ha actualizado');

            //*NECESITO QUE COMPRUEBE EN SAGA CUANDO SE ACTUALICE EL JUEGO
            //* Si el juego tenia saga y ha dejado de tenerla que desaparezca de esa saga
            if (oldGame.saga !== null && updatedGame.saga === null) {
                console.log('Opcion 1: Si el juego tenia saga y ha dejado de tenerla que desaparezca de esa saga')
                const oldSagaGames = await SagaModel.findOne({
                    $or: [
                        { juegos_principales: oldGame._id },
                        { spin_offs: oldGame._id }
                    ]
                });

                if (oldSagaGames) {
                    const { juegos_principales, spin_offs } = oldSagaGames;
                    if (juegos_principales.some((element: any) => String(element) === String(oldGame._id))) {

                        oldSagaGames.juegos_principales = juegos_principales.filter((element: any) => String(element) !== String(oldGame._id));
                        await SagaModel.findByIdAndUpdate(oldSagaGames._id, oldSagaGames, { new: true });

                    } else if (spin_offs.some((element: any) => element === oldGame._id)) {
                        oldSagaGames.spin_offs = spin_offs.filter((element: any) => String(element) !== String(oldGame._id));

                        await SagaModel.findByIdAndUpdate(oldSagaGames._id, oldSagaGames, { new: true });
                    }

                }
                //* Si el juego no tenia saga y ahora si que se agregue a esa saga
            }
            if (oldGame.saga === null && updatedGame.saga !== null) {

                // console.log('Opcion 2: Si el juego no tenia saga y ahora si que se agregue a esa saga')

                const newSagaGames = await SagaModel.findById(updatedGame.saga);
                if (newSagaGames) {
                    const { juegos_principales } = newSagaGames;
                    if (!juegos_principales.some((element: any) => String(element) === String(oldGame._id))) {

                        // Convertir el documento de Mongoose a un objeto plano
                        const newSagaGamesPlain = newSagaGames.toObject(); // o usa .lean() si es una consulta
                        const updatedJuegosPrincipales = [
                            ...newSagaGamesPlain.juegos_principales,
                            updatedGame._id, // Aquí añadimos los nuevos juegos
                        ];
                        const updatedSagaGames = { ...newSagaGamesPlain, juegos_principales: updatedJuegosPrincipales };

                        await SagaModel.findByIdAndUpdate(newSagaGames._id, updatedSagaGames, { new: true });

                    }
                }
            }



            return updatedGame;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async updateRemakeAndRemasterReferences(updateRemakeAndRemasterDto: UpdateRemakeAndRemasterDto) {
        const { gameId, remakeOf, remasterOf } = updateRemakeAndRemasterDto
        let updatedRemakeOrRemaster = null
        try {
            // Actualizar las referencias de remakes
            if (remakeOf && remakeOf.length > 0) {
                await Promise.all(
                    remakeOf.map(async (originalGameId) => {
                        updatedRemakeOrRemaster = await GameModel.findByIdAndUpdate(originalGameId, { $addToSet: { hasRemake: gameId } });
                    })
                );
                // Actualizar las referencias de remasters
                if (remasterOf && remasterOf.length > 0) {
                    await Promise.all(
                        remasterOf.map(async (originalGameId) => {
                            updatedRemakeOrRemaster = await GameModel.findByIdAndUpdate(originalGameId, { $addToSet: { hasRemaster: gameId } });
                        })
                    );
                }
            }
            if (!updatedRemakeOrRemaster) throw CustomError.badRequest('El remake o remaster no se ha actualizado');
            return updatedRemakeOrRemaster;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();

        }


    }
}