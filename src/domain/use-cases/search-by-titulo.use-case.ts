

import { SearchByTituloDto } from "../dtos";

import { CustomError } from "../errors/custom.error";


export class SearchByTitulo {
    constructor() {}
    async search ( model:any, searchByTituloDto: SearchByTituloDto ): Promise<any>{

        const { titulo } = searchByTituloDto;

        try {
            // console.log(typeof(model.modelName));
            let titulos = []
            if (model.modelName == 'Game') {
                titulos = await model.find({ titulo: { $regex: titulo, $options: 'i' } })
                .populate('saga')
                .populate('plataformas')
                .populate('generos', 'name')
                .populate('mecanicas', 'nombre')
                .populate('etiquetas', 'nombre')
                .populate('desarrolladoras', 'nombre')
                .populate('editoras', 'nombre');
            }
            
            else {titulos = await model.find({ titulo: { $regex: titulo, $options: 'i' } })}
            if ( titulos.length == 0 ) throw CustomError.badRequest('El titulo que has buscado no existe');
            // console.log(titulos);

            return titulos;

        } catch (error) {
            console.log(error);
            if ( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }   

    }
}