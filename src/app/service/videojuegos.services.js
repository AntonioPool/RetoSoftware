import { VideojuegosRepository } from "../repositories/videojuegos.repository";

export class VideojuegosService{

    constructor(){
        this.repository = new VideojuegosRepository()
    }

     validarDatos(datos) {
        const { nombre, genero } = datos || {};

        if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 3) {
            throw new Error('El nombre es obligatorio y debe tener al menos 3 caracteres');
        }

        if (!genero|| typeof genero !== 'string' || genero.trim().length <3) {
            throw new Error('El alias es obligatorio y debe tener al menos 3 caracteres');
        }
        return true
    }

    async obtenerPorId(id){
        const numId = Number(id)
        if(isNaN(numId) || numId <= 0){
            throw new Error("El id es inválido")
        }

        const videojuego = await this.repository.obtenerPorId(numId)

        if(!videojuego){
            throw new Error("Jugador no encontrado")
        }

        return videojuego
    }


    async create(params){

        const valido = await this.validarDatos(params)

        if(!valido){
            throw new Error("Datos inválidos")
        }

        const  datosLimpios = {
            nombre: params.nombre,
            genero:params.genero.trim()
        }

        return await this.repository.create(datosLimpios)
    }
}