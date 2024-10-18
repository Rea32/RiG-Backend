import { ObjectId } from "mongoose";

interface QueryParams {
  _id?: ObjectId;
  titulo?: string;
  generos?: { _id: ObjectId; name: string }[];
  mecanicas?: { _id: ObjectId; nombre: string }[];
  plataformas?: { _id: ObjectId; name: string }[];
  etiquetas?: { _id: ObjectId; name: string }[];
}

export const buildQuery = ({ titulo, generos, mecanicas, plataformas }: QueryParams) => {
  const query: { [key: string]: any } = {}; // Objeto de consulta

  // Búsqueda por título
  if (titulo != '') {
    query.titulo = { $regex: titulo, $options: 'i' };  // Búsqueda insensible a mayúsculas/minúsculas
  }

  // Búsqueda por géneros utilizando solo los _id
  if (generos && generos.length > 0) {
    const generosIds = generos.map((genero) => genero._id);
    query.generos = { $in: generosIds };  // Filtra por los _id de los géneros
  }

  // Búsqueda por mecánicas utilizando solo los _id
  if (mecanicas && mecanicas.length > 0) {
    const mecanicasIds = mecanicas.map((mecanica) => mecanica._id);
    query.mecanicas = { $in: mecanicasIds };
  }

  // Búsqueda por plataformas utilizando solo los _id
  if (plataformas && plataformas.length > 0) {
    const plataformasIds = plataformas.map((plataforma) => plataforma._id);
    query.plataformas = { $in: plataformasIds };
  }

  return query;
};

export const buildSimilarGamesQuery = ({ _id, generos, mecanicas, plataformas, etiquetas }: QueryParams) => {

  const query: { [key: string]: any } = {}; // Objeto de consulta

  // Excluir el _id proporcionado
  if (_id) {
    query._id = { $ne: _id }; // Excluir el juego con este _id
  }
  // Búsqueda por géneros utilizando solo los _id
  if (generos && generos.length > 0) {
    const generosIds = generos.map((genero) => genero._id);
    query.generos = { $all: generosIds };  // Filtra por los _id de los géneros
  }

  // Búsqueda por mecánicas utilizando solo los _id
  if (mecanicas && mecanicas.length > 0) {
    const mecanicasIds = mecanicas.map((mecanica) => mecanica._id);
    query.mecanicas = { $in: mecanicasIds };
  }

  // Búsqueda por plataformas utilizando solo los _id
  if (plataformas && plataformas.length > 0) {
    const plataformasIds = plataformas.map((plataforma) => plataforma._id);
    query.plataformas = { $in: plataformasIds };
  }

  // Búsqueda por tags utilizando solo los _id
  if (etiquetas && etiquetas.length > 0) {
    const tagsIds = etiquetas.map((tag) => tag._id);
    query.etiquetas = { $in: tagsIds };
  }

  return query;
};
