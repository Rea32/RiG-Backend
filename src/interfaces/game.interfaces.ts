import { ObjectId } from "mongoose"

export interface desarrolladora{

    id: number,
    nombre: string,
    img_background?: string
    
}

export interface editora{

    id: number,
    nombre: string,
    img_background?: string
    
}

export interface basicInterface{
    id: number,
    nombre: string,
    img_background?: string
}

export interface plataformas{
    
    _id: ObjectId,
    name: string,
    
}

export interface tiendas {
    id: number,
    nombre: string
};

export interface generos {
    id: number,
    name: string
};

export interface generos_id {
    _id: ObjectId,
    name: string
};


export interface mecanicas {
    _id: ObjectId,
    nombre: string
};

export interface etiquetas {
    name: string,
    nombre: string,
    tipo?: string
};

export interface etiquetas_id {
    _id: ObjectId,
    name: string,
    nombre: string,
    tipo?: string
};