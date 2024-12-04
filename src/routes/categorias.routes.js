import { Router } from "express";
import { getCategorias, getCategoria, createCategorias, deleteCategoria, updateCategoria } from "../controllers/categorias.controller.js";



const router = Router()

router.get('/categorias', getCategorias)

router.get('/categorias/:id',getCategoria)

router.post('/categorias',createCategorias)

router.put('/categorias/:id',updateCategoria)

router.delete('/categorias/:id',deleteCategoria)

export default router;