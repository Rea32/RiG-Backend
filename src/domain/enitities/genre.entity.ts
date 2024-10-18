import { Types } from "mongoose";



export class GenreEntity {

    constructor(
        public id: number,
        public name: string,
        public slug?: string,
        public parent?: boolean,
        public games_count?: number,
        public importants_games?: string[],
        public sub_genres?: [Types.ObjectId],
        public description?: string,

    ){}
}