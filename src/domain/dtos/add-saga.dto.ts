import { Types } from "mongoose";



export class AddSagaDto {
    private constructor(
        public id: number,
        public nombre: string,
        public generos_principales?: Array<Types.ObjectId>,
        public juegos_principales?: Array<Types.ObjectId>,
        public spin_offs?: Array<Types.ObjectId>,
        public backgroundImage?: string,
        public key_name?: string
    ) { }

    static create(object: { [key: string]: any }): [string?, AddSagaDto?] {
        const { id, nombre, generos_principales, juegos_principales, spin_offs, backgroundImage, key_name } = object;

        if (!id) return ['Missing id'];
        if (!nombre) return ['Missing nombre'];

        return [
            undefined,
            new AddSagaDto(id, nombre, generos_principales, juegos_principales, spin_offs, backgroundImage, key_name)
        ]

    }
}