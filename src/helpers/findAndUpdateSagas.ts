import { SagaModel } from "../data/mongodb/models/saga.model"
import { GameEntity } from "../domain";


export const findAndUpdateSagas = async ( game:GameEntity ) =>{
    try {
        // console.log(`GameEntity: ${JSON.stringify(game)}`); 
        const sagas = await SagaModel.find({} );
        // console.log(`Sagas: ${sagas}`); 
        const sagaEncontrada = sagas.filter( (saga:any)=>{ 
            const {nombre, key_name} = saga
            if (game.titulo.toLowerCase().includes(key_name.toLowerCase())) return saga;

        })
        // console.log(sagaEncontrada)
        if (sagaEncontrada.length > 0){
            const {_id, juegos_principales, generos_principales, spin_offs } = sagaEncontrada[0];

            const generos_filtrados = game.generos.filter ( genero => {
                return !generos_principales.some( (genPrincipal: any) => genPrincipal.id === genero.id );
            })
            generos_principales.push(...generos_filtrados);

            if ( game.spinOff ) {
                !spin_offs.some( (juego: any) => juego.titulo === game.titulo) 
                &&  await SagaModel.findByIdAndUpdate(
                    _id,
                    {
                        $push:{
                            spin_offs: {
                                id: game.id, 
                                titulo: game.titulo
                            },
                            
                        },
                        $set:{
                            generos_principales: generos_principales
                        }
                    },
                    { new: true }, 
                );
            }else{
            //Abajo solo añadimos el juego a esta Saga si este no existe en la coleccion Sagas.juegos_principales
            !juegos_principales.some( (juego: any) => juego.titulo === game.titulo) 
            &&  await SagaModel.findByIdAndUpdate(
                _id,
                {
                    $push:{
                        juegos_principales: {
                            id: game.id, 
                            titulo: game.titulo
                        },
                        
                    },
                    $set:{
                        generos_principales: generos_principales
                    }
                },
                { new: true }, 
            );
        // console.log(documento)
            }
      
        } 
    } catch (err) {
        console.log(err)
        
    }
}