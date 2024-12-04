import { Router } from "express";
import { getSolicitudes,getSolicitud, createSolicitud, deleteSolicitud, updateSolicitud } from "../controllers/solicitudes.controller.js";



const router = Router();

router.get('/solicitudes', getSolicitudes);

router.get('/solicitudes/:id',getSolicitud );

router.post('/solicitudes', createSolicitud );

router.put('/solicitudes/:id',updateSolicitud );

router.delete('/solicitudes/:id', deleteSolicitud);

export default router;