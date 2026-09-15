import { email } from "zod";
import { JugadoresRepository } from "../repositories/jugadores.repository";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class JugadoresServices{

    constructor(){
        this.repository = new JugadoresRepository()
    }

    validarDatos(datos) {
        const { nombre, alias, correo } = datos || {};

        if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 3) {
            throw new Error('El nombre es obligatorio y debe tener al menos 3 caracteres');
        }

        if (!alias || typeof alias !== 'string' || alias.trim().length <3) {
            throw new Error('El alias es obligatorio y debe tener al menos 3 caracteres');
        }

        if (!correo || typeof correo !== 'string') {
            throw new Error('El correo es obligatorio');
        }

        if(!regexEmail.test(correo.trim())){
            throw new Error('El formato del correo electrónico no es válido')
        }
        return true
    }

    async obtenerPorId(id){
        const numId = Number(id)
        if(isNaN(numId) || numId <= 0){
            throw new Error("El id es inválido")
        }

        const jugador = await this.repository.obtenerPorId(numId)

        if(!jugador){
            throw new Error("Jugador no encontrado")
        }
        return jugador
    }


    async crear(params){
        const correoValido = this.validarDatos(params)

        if(!correoValido){
            throw new Error("El correo no es válido o es nullo")
        }

        const datosLimpios = {
            nombre: params.nombre,
            alias: params.alias.trim(),
            correo: params.correo.trim()
        }

        return await this.repository.crear(datosLimpios)
    }
}