

import { GameEntity } from "../domain";
import { TagModel } from "../data/mongodb/models/tag.model";


export const findAndAddTags = async ( game:GameEntity ) =>{
        // console.log(`GameEntity: ${JSON.stringify(game)}`); 
        const tags = await TagModel.find({} );
        if (!tags || !game.etiquetas) return;
        // console.log(`Sagas: ${sagas}`); 
        const newTags = game.etiquetas.filter((gameTag:any) => tags.some((tag:any) => tag.name === gameTag.name));
        if ( !newTags ) return;
    console.log(newTags)
        const newCompleteTagsPromises = newTags.map( async (tag:any)=>{

            // const esTag = await translate(tag.name, { to: 'es' });
            return new TagModel({name:tag.name, nombre: tag.name})
        })
        const newCompleteTags = await Promise.all(newCompleteTagsPromises);
       try {
        await TagModel.insertMany(newCompleteTags);
        console.log("Nuevas etiquetas agregadas")
       } catch (error) {
            console.log(error)
       }
        
}