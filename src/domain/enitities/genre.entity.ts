import { Types } from "mongoose";
import { references_games } from "../../interfaces";



export class GenreEntity {

    constructor(
        public id: number,
        public name: string,
        public slug?: string,
        public parent?: boolean,
        public games_count?: number,
        public importants_games?: references_games[],
        public last_games?: references_games[],
        public sub_genres?: [Types.ObjectId],
        public description?: string,

    ){}
}