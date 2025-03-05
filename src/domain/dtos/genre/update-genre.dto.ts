const mongoose = require('mongoose');
import { references_games } from "../../../interfaces";
import { GameEntity } from "../../enitities/game.entity";

export class UpdateGenreDto {
    private constructor(
        public _id: string,
        public name: string,
        public parent: boolean,
        public importants_games: Array<references_games>,
        public last_games: Array<references_games>,
        public slug?: string,
        public description?: string,
        public sub_genre?: Array<string>,
        public image_background?: string,

    ) { this.slug = this.name.toLowerCase().replace(' ', '-') }


    static query(object: { [key: string]: any }): [string?, UpdateGenreDto?] {

        const { _id, name, parent, importants_games, last_games, slug, description, sub_genre, image_background } = object;
        // console.log(object.parent);
        if ( !_id ) return ['Missing Id'];
        if ( !name ) return ['Missing name'];
        if ( !importants_games ) return ['Missing Importants games'];

        return [
            undefined,
            new UpdateGenreDto(  _id, name, parent, importants_games, last_games, slug, description, sub_genre, image_background )
        ]
    }

}