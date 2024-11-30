import { Router } from "express";
import { getEstados,getEstado,createEstado,deleteEstado, updateEstado } from "../controllers/estados.controller.js"


const router = Router();

router.get("/estados", getEstados);

router.get("/estados/:id", getEstado );

router.post("/estados", createEstado);

router.patch("/estados/:id",updateEstado );

router.delete("/estados/:id", deleteEstado);



export default router;
