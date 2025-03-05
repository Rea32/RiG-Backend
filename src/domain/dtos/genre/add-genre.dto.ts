

export class AddGenreDto{
    private constructor(
            public id: string,
            public name: string,
            public parent: boolean,
            public importants_games: Array<string>,
            public slug?: string,
            public description?: string,
            public sub_genre?: Array<string>,
            public image_background?: string,
            
    ){ this.slug = this.name.toLowerCase().replace(' ','-')}


    static create ( object: {[key:string]: any} ): [string?, AddGenreDto?]{

        const { id, name, parent, importants_games, slug, description, sub_genre, image_background } = object;
        // console.log(object.parent);
        if ( !id ) return ['Missing Id'];
        if ( !name ) return ['Missing name'];
        if ( parent === undefined ) return ['Missing Parent'];
        if ( !importants_games ) return ['Missing Importants games'];

        return [
            undefined,
            new AddGenreDto(  id, name, parent, importants_games, slug, description, sub_genre, image_background )
        ]
    }

}