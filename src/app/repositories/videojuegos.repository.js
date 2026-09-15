import { db } from "@/utils/db";

export class VideojuegosRepository{


    async obtenerPorId(id){
        const sql = `SELECT * FROM videojuegos WHERE id = ?`
        const rows = await db.query(sql,[id])
        return rows[0] || null
    }

    async create({nombre, genero}){

        const sql = `
            INSERT INTO videojuegos (nombre, genero)
            VALUES (?, ?)
        `

        const resultado = await db.query(sql, [nombre, genero])
        return resultado
    }
}