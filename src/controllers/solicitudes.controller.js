import { conn } from "../db.js"


export const getSolicitudes = async(req,res)=>{
    try {
        const [rows] = await conn.query(
            "SELECT * FROM solicitud"
        )
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
}

export const getSolicitud = async(req,res)=>{
    try {
        const [rows] = await conn.query("SELECT * FROM solicitud where solicitud_id = ?", [req.params.id])
        if(rows.length <= 0)return res.status(404).json({
            message: "Solicitud not found"
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

export const createSolicitud = async(req,res)=>{
    try {
        const { licencia_pdf, dias_alquiler, pasajeros, comentario, vehiculo_id, estado_id, usuario_id} = req.body
        const [rows] = await conn.query("INSERT INTO solicitud(licencia_pdf, dias_alquiler, pasajeros, comentario, vehiculo_id, estado_id, usuario_id) VALUES (?,?,?,?,?,?,?)", [licencia_pdf, dias_alquiler, pasajeros, comentario, vehiculo_id, estado_id, usuario_id])

        res.send({
            id:rows.insertId,
            licencia_pdf, 
            dias_alquiler, 
            pasajeros, 
            comentario, 
            vehiculo_id,
            estado_id, 
            usuario_id
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteSolicitud = async (req, res) => {
    try {
        const [result] = await conn.query("DELETE FROM solicitud WHERE solicitud_id = ?", [req.params.id])
        if(result.affectedRows = 0)return res.status(404).json({
            message: "Solicitud not found"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateSolicitud = async(req,res) => {
    try {
        const { id } = req.params
        const { licencia_pdf, dias_alquiler, pasajeros, comentario, vehiculo_id, estado_id, usuario_id} = req.body
        const [result] = await conn.query(
            `UPDATE solicitud 
            SET licencia_pdf = IFNULL(?, licencia_pdf), 
                dias_alquiler = IFNULL(?, dias_alquiler), 
                pasajeros = IFNULL(?, pasajeros), 
                comentario = IFNULL(?, comentario), 
                vehiculo_id = IFNULL(?, vehiculo_id), 
                estado_id = IFNULL(?, estado_id), 
                usuario_id = IFNULL(?, usuario_id) 
             WHERE solicitud_id = ?`,
            [licencia_pdf, dias_alquiler, pasajeros, comentario, vehiculo_id, estado_id, usuario_id, id]);
            if(result.affectedRows === 0) return res.status(404).json({
                message: "Solicitud not found"
            })
            const [rows] = await conn.query("SELECT * FROM solicitud WHERE solicitud_id = ?", [id])
            res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}