import { conn } from "../db.js"


export const getCategorias = async(req,res) =>{
    try {
        const [rows] = await conn.query("SELECT * FROM categoria")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

export const getCategoria = async(req,res) =>{
    try {
        const [rows] = await conn.query("SELECT * FROM categoria where categoria_id = ?", [req.params.id])
        if(rows.length <= 0)return res.status(404).json({
            message: "Categoria not found"
        })
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({message: error.message})    
    }
}

export const createCategorias = async(req,res) =>{
    try {
        const { descripcion } = req.body
        const [rows] = await conn.query("INSERT INTO categoria(descripcion) VALUES (?)", descripcion)
        res.send({
            id:rows.insertId,
            descripcion
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteCategoria = async(req,res) =>{
    try {
        const [result] = await conn.query("DELETE FROM categoria where categoria_id = ?", [req.params.id])
        if(result.affectedRows = 0)return res.status(404).json({
            message: "Categoria not found"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCategoria = async(req,res) =>{
    try {
        const { id } = req.params
        const { descripcion } = req.body

        const [result] = await conn.query("UPDATE categoria SET descripcion = IFNULL(?, descripcion) where categoria_id = ?", [descripcion, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: "Categoria not found"
        })

        const [rows] = await conn.query("SELECT * FROM categoria WHERE categoria_id = ?", [id])
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}