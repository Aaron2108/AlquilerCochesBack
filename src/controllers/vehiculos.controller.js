import { conn } from "../db.js"


export const getVehiculos = async(req,res) =>{
    try {
        const [rows] = await conn.query("SELECT * FROM vehiculo")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
}

export const getVehiculo = async(req,res) =>{
    try {
        const [rows] = await conn.query("SELECT * FROM vehiculo where vehiculo_id = ?", [req.params.id])
        if(rows.length <= 0)return res.status(404).json({
            message: "Vehiculo not found"
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})  
    }
}

export const createVehiculo = async (req,res) =>{
    try {
        const { modelo, foto, año, cilindrada, asientos,color,placa,categoria_id, estado_id } = req.body
        const [rows] = await conn.query("INSERT INTO vehiculo(modelo, foto, año, cilindrada, asientos, color, placa, categoria_id, estado_id) VALUES (?,?,?,?,?,?,?,?,?)", [modelo, foto, año, cilindrada, asientos,color,placa,categoria_id, estado_id])

        res.send({
            id:rows.insertId,
            modelo, 
            foto, 
            año, 
            cilindrada, 
            asientos,
            color,
            placa,
            categoria_id, 
            estado_id
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteVehiculo = async (req, res) => {
    try {
        const [result] = await conn.query("DELETE FROM vehiculo where vehiculo_id = ?",[req.params.id])
        if(result.affectedRows = 0)return res.status(404).json({
            message: "Vehiculo not found"
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateVehiculo = async (req, res) => {
    try {
        const { id } = req.params
        const { modelo, foto, año, cilindrada, asientos,color,placa,categoria_id, estado_id } = req.body
        
        const [result] = await conn.query(
            `UPDATE vehiculo 
                SET modelo = IFNULL(?, modelo),
                    foto = IFNULL(?, foto),
                    año = IFNULL(?, año),
                    cilindrada = IFNULL(?, cilindrada),
                    asientos = IFNULL(?, asientos),
                    color = IFNULL(?, color),
                    placa = IFNULL(?, placa),
                    categoria_id = IFNULL(?, categoria_id),
                    estado_id = IFNULL(?, estado_id)
                WHERE vehiculo_id = ?`,
            [modelo, foto, año, cilindrada, asientos, color, placa, categoria_id, estado_id, id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: "Vehiculo not found"
        })
        const [rows] = await conn.query("SELECT * FROM vehiculo WHERE vehiculo_id = ?", [id])
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}