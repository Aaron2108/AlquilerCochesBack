import { conn } from "../db.js"


export const getRols = async(req, res) =>{
    try {

        const [rows] = await conn.query("SELECT * FROM rol")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})    
    }
}

export const getRol = async(req, res) =>{
    try {
        const [rows] =await conn.query("SELECT * FROM rol where rol_id = ?", [req.params.id])
        if(rows.length <= 0)return res.status(404).json({
                message: "Rol not found"
            })
            res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})    
    }
}

export const createRols = async (req, res) =>{
    try {
        const {descripcion} = req.body
        const [rows] = await conn.query('INSERT INTO rol(descripcion) VALUES (?)',descripcion)
    
        res.send({
            id:rows.insertId,
            descripcion
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

} 

export const deleteRol = async(req, res) =>{
    try {
        const [result] =await conn.query("DELETE FROM rol where rol_id = ?", [req.params.id])
        if(result.affectedRows = 0)return res.status(404).json({
            message: "Rol not found"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateRol = async(req, res) =>{
    try {
        const { id } = req.params
        const { descripcion } = req.body

        const [result] = await conn.query("UPDATE rol SET descripcion = IFNULL(?, descripcion) where rol_id = ?", [descripcion, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: "Rol not found"
        })

        const [rows] = await conn.query("SELECT * FROM rol WHERE rol_id = ?", [id])
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
