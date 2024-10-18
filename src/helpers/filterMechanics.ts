import { GameEntity } from "../domain";
import { TagModel } from "../data/mongodb/models/tag.model";
import { TagEntity } from "../domain/enitities/tag.entity";
import { MecanicaModel } from "../data/mongodb/models/mecanica.model";
import { MecanicaEntity } from "../domain/enitities/mecanica.entity";



const mecanicas = [
    { _id:'665735437fd14f71a0febca0', nombre: 'Exploración', name: 'Exploration' },
    { _id:'66b600129957972041eb127a', nombre: 'Combate por Turnos', name: 'Turn-Based Combat' },
    { _id:'66b603539957972041eb1301', nombre: 'Mundo Abierto', name: 'Open World' },
    { _id:'66fbd80f0dde202693404bb1', nombre: 'Point & Click', name: 'Point & Click' },
];

export const filterMechanics = async (tags: Array<TagEntity>) => {
    try {
        // Obtener solo los nombres de las mecánicas que quieres buscar
        const mechanicNames = mecanicas.map(mechanic => mechanic.nombre);
   
        // Buscar las mecánicas que coinciden con los nombres en la base de datos
        const mechanicsFromDb = await MecanicaModel.find({
            nombre: { $in: mechanicNames } // Usa $in para buscar múltiples nombres
        });
        if (mechanicsFromDb.length === 0) return [];
        const filteredMechanics = mecanicas.filter(mechanic => 
            mecanicas.some(dbMechanic => dbMechanic.nombre === mechanic.nombre)
        );
        console.log('FilteredMechanics: ', filteredMechanics);
        console.log(tags);
        // Si no hay etiquetas, devuelve las mecánicas encontradas
        if (!tags || tags.length === 0) return [];

        // Filtrar las mecánicas que coinciden con las etiquetas proporcionadas
        const existMechanics = filteredMechanics
        .filter( (dbMechanic: any) => tags.some((tag: any) => tag.name === dbMechanic.name) )
        .map( mechanic => ({_id:mechanic._id, nombre: mechanic.nombre }) );


        // Si no hay mecánicas existentes, devuelve todas las mecánicas encontradas
        if (!existMechanics || existMechanics.length === 0) return [];

        // Devuelve solo las mecánicas que existen en ambas listas
        return existMechanics;
    } catch (error) {
        console.error("Error al filtrar las mecánicas:", error);
        // Devuelve un array vacío o maneja el error según sea necesario
        return [];
    }
};





