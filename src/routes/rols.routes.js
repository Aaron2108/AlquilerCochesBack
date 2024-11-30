import { Router } from "express";
import {getRols, getRol, createRols,deleteRol,updateRol} from "../controllers/rols.controller.js"


const router = Router();

router.get('/rol', getRols);

router.get('/rol/:id', getRol);

router.post('/rol', createRols);

router.patch('/rol/:id', updateRol);

router.delete('/rol/:id', deleteRol);


export default router;