import { Router } from "express";
import { getUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario } from "../controllers/usuarios.controller.js";



const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id',getUsuario );

router.post('/usuarios',createUsuario );

router.put('/usuarios/:id',updateUsuario );

router.delete('/usuarios/:id',deleteUsuario );

export default router;