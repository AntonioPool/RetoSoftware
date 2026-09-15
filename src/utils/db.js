import mysql from 'mysql2/promise'

let pool

if(!globalThis.mysqlPool){
    globalThis.mysqlPool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0
    })
}

pool = globalThis.mysqlPool

export const db = {
    
    query: async(sql, params = [])=>{
        const [rows] = await pool.execute(sql,params);
        return rows
    },
    getPool: () => pool
}