import {createConnection, createPool} from "mysql2/promise"

export const conn = createPool({
    host: "localhost",
    user: "root",
    password: "70976074",
    port: 3306,
    database: "alquilerCochesDB"
})

