import { conn } from "../db.js"



export const getAlquileres = async(req,res)=>{
    try {
        const [rows] = await conn.query("SELECT * FROM alquiler")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})  
    }
}

export const getAlquiler = async(req,res)=>{
    try {
        const [rows] = await conn.query("SELECT * FROM alquiler where alquiler_id = ?", [req.params.id])
        if(rows.length <= 0)return res.status(404).json({
            message: "Alquiler not found"
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})  
    }
}

export const createAlquiler = async(req,res)=>{
    try {
        const { fecha_inicio, fecha_fin, precio, costo_extra, comentario, solicitud_id, estado_id, fecha_entrega } = req.body
        const [rows] = await conn.query("INSERT INTO alquiler(fecha_inicio, fecha_fin, precio, costo_extra, comentario, solicitud_id, estado_id, fecha_entrega) VALUES (?,?,?,?,?,?,?,?)", [fecha_inicio, fecha_fin, precio, costo_extra, comentario, solicitud_id, estado_id, fecha_entrega])

        res.send({
            id:rows.insertId,
            fecha_inicio, 
            fecha_fin, 
            precio, 
            costo_extra, 
            comentario, 
            solicitud_id, 
            estado_id, 
            fecha_entrega
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteAlquiler = async(req,res)=>{
    try {
        const [result] = await conn.query("DELETE FROM alquiler where alquiler_id = ?", [req.params.id])
        if(result.affectedRows = 0)return res.status(404).json({
            message: "Alquiler not found"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateAlquiler = async(req,res)=>{
    try {
        const { id } = req.params 
        const { fecha_inicio, fecha_fin, precio, costo_extra, comentario, solicitud_id, estado_id, fecha_entrega } = req.body

        const [result] = await conn.query(
            `UPDATE alquiler 
            SET fecha_inicio = IFNULL(?, fecha_inicio), 
                fecha_fin = IFNULL(?, fecha_fin), 
                precio = IFNULL(?, precio), 
                costo_extra = IFNULL(?, costo_extra), 
                comentario = IFNULL(?, comentario), 
                solicitud_id = IFNULL(?, solicitud_id), 
                estado_id = IFNULL(?, estado_id), 
                fecha_entrega = IFNULL(?, fecha_entrega) 
            WHERE alquiler_id = ?`,
            [fecha_inicio, fecha_fin, precio, costo_extra, comentario, solicitud_id, estado_id, fecha_entrega, id])
            if(result.affectedRows === 0) return res.status(404).json({
                message: "Alquiler not found"
            })
            const [rows] = await conn.query("SELECT * FROM alquiler WHERE alquiler_id = ?", [id])
            res.json(rows[0])

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}