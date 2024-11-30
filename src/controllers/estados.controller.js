import { conn } from "../db.js"


export const getEstados = async(req,res) =>{
    try {
        const [rows] = await conn.query("SELECT * FROM estado")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message
    })
    }
}

export const getEstado = async(req,res) =>{
    try {
        const [rows] = await conn.query("SELECT * FROM estado where estado_id = ?", [req.params.id])
        if(rows.length <= 0) return res.status(404).json({
            message: "Estado not found"
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message
    })
    }
}

export const createEstado = async(req,res) =>{
    try {
        const { descripcion } = req.body
        const [rows] = await conn.query("INSERT INTO estado(descripcion) VALUES (?)", descripcion)

        res.send({
            id: rows.insertId,
            descripcion
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteEstado = async(req,res) =>{
    try {
        const [result] = await conn.query("DELETE FROM estado where estado_id = ?", [req.params.id])
        if(result.affectedRows = 0) return res.status(404).json({
            message: "Estado not found"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateEstado = async(req,res) =>{
    try {
        const { id } = req.params
        const { descripcion } = req.body

        const [result] = await conn.query("UPDATE estado SET descripcion = IFNULL(?, descripcion) where estado_id = ?", [descripcion, id])
        console.log(result);

        if(result.affectedRows === 0) return res.status(404).json({
            message: "Estado not found"
        })

        const [rows] = await conn.query("SELECT * FROM estado WHERE estado_id = ?", [id])
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

