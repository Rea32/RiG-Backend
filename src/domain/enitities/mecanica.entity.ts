import { ObjectId } from "mongoose";

export class MecanicaEntity {
    constructor(
        public _id: ObjectId,
        public nombre: string,

    ){}
}