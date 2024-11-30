import { Router } from "express";
import { getAlquileres, getAlquiler, createAlquiler, deleteAlquiler, updateAlquiler } from "../controllers/alquileres.controller.js";



const router = Router();

router.get('/alquileres',getAlquileres );

router.get('/alquileres/:id',getAlquiler );

router.post('/alquileres',createAlquiler );

router.patch('/alquileres/:id', updateAlquiler );

router.delete('/alquileres/:id', deleteAlquiler);


export default router;