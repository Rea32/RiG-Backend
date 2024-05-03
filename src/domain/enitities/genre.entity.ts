


export class GenreEntity {

    constructor(
        public id: number,
        public name: string,
        public slug?: string,
        public parent?: boolean,
        public games_count?: number,
        public important_games?: string[],
        public sub_genres?: string[],
        public description?: string,

    ){}
}