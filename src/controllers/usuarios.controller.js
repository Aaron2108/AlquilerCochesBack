import { conn } from "../db.js"



export const getUsuarios = async(req,res)=>{
    try {
        const [rows] = await conn.query("SELECT * FROM usuario")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
}

export const getUsuario = async(req,res)=>{
    try {
        const [rows] = await conn.query("SELECT * FROM usuario where usuario_id = ?", [req.params.id])
        if(rows.length <= 0)return res.status(404).json({
            message: "Usuario not found"
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})  
    }
}

export const createUsuario = async(req,res)=>{
    try {
        const { usuario, correo, contraseña, telefono, direccion, rol_id, estado_id } = req.body
        const [rows] = await conn.query("INSERT INTO usuario(usuario, correo, contraseña, telefono, direccion, rol_id, estado_id) VALUES (?,?,?,?,?,?,?)", [usuario, correo, contraseña, telefono, direccion, rol_id, estado_id ])

        res.send({
            id:rows.insertId,
            usuario, 
            correo, 
            contraseña, 
            telefono, 
            direccion, 
            rol_id, 
            estado_id
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteUsuario = async(req, res) => {
    try {
        const [result] = await conn.query("DELETE FROM usuario WHERE usuario_id = ?", [req.params.id])
        if(result.affectedRows = 0)return res.status(404).json({
            message: "Usuario not found"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateUsuario = async(req,res) =>{
    try {
        const { id } = req.params
        const { usuario, correo, contraseña, telefono, direccion, rol_id, estado_id } = req.body

        const [result] = await conn.query(
            `UPDATE usuario 
            SET usuario = IFNULL(?, usuario), 
                correo = IFNULL(?, correo), 
                contraseña = IFNULL(?, contraseña), 
                telefono = IFNULL(?, telefono), 
                direccion = IFNULL(?, direccion), 
                rol_id = IFNULL(?, rol_id), 
                estado_id = IFNULL(?, estado_id)
            WHERE usuario_id = ?`,
            [usuario, correo, contraseña, telefono, direccion, rol_id, estado_id, id])
            if(result.affectedRows === 0) return res.status(404).json({
                message: "Usuario not found"
            })
            const [rows] = await conn.query("SELECT * FROM usuario WHERE usuario_id = ?", [id])
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}