import { db } from "@/utils/db";

export class JugadoresRepository{
    
    async obtenerPorId(id){
        const sql = 'SELECT * FROM jugadores WHERE id = ?';
        const rows = await db.query(sql, [id]);
        return rows[0] || null;
    }

    async crear({nombre, alias, correo}){

        const sql = `
            INSERT INTO jugadores (nombre, alias, correo)
            VALUES (?,?,?)
        `;

        const resultado = await db.query(sql,[nombre, alias, correo])

        return resultado
    }
}