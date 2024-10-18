import { SagaModel } from "../../../data/mongodb/models/saga.model";
import { AddPlatformDto } from "../../dtos/platform/add-platform.dto";
import { AddSagaDto } from "../../dtos/add-saga.dto";
import { PlatformEntity } from "../../enitities/platform.entity";
import { SagaEntity } from "../../enitities/saga.entity";
import { CustomError } from "../../errors/custom.error";
import { PlatformRepository } from "../../repositories/platform.repository";
import { GameModel } from "../../../data/mongodb/models/game.model";


export class AddSagaUseCase {
    constructor() { }

    async add(addSagaDto: AddSagaDto): Promise<SagaEntity> {

        const { id, nombre, generos_principales, juegos_principales, spin_offs, backgroundImage, key_name } = addSagaDto;

        try {
            const exist = await SagaModel.findOne({ nombre });
            if (exist) throw CustomError.badRequest('El nombre de la saga ya existe');

            const saga = await SagaModel.create({
                id: id,
                nombre: nombre,
                generos_principales: generos_principales,
                juegos_principales: juegos_principales,
                spin_offs: spin_offs,
                backgroundImage: backgroundImage,
                key_name: key_name
            });
            // Asociar juegos principales a la saga
            if (juegos_principales && juegos_principales.length > 0) {
                const updates = juegos_principales.map(async (_id) => {
                    await GameModel.findByIdAndUpdate(_id, { saga: saga._id }, { new: true });
                });
                await Promise.all(updates);
            }
            if (spin_offs && spin_offs.length > 0) {
                const updates = spin_offs.map(async (_id) => {
                    await GameModel.findByIdAndUpdate(_id, { saga: saga._id }, { new: true });
                });
                await Promise.all(updates);
            }

            return saga;


        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();


        }
    }
}