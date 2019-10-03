import { Genre } from './genre';

export class Film {
    
    recomendador: string;
    titulo: string;
    descripcion:string;
    pais: string;
    formato: string;
    generos:Genre[];
    linkito:string;
    imagen: string;
    shortDescription?: string;
    showShortDescription?:boolean;

}