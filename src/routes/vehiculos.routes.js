import { Router } from "express";
import { getVehiculos, getVehiculo, createVehiculo, deleteVehiculo,updateVehiculo } from "../controllers/vehiculos.controller.js";


const router = Router()

router.get('/vehiculo', getVehiculos);

router.get('/vehiculo/:id',getVehiculo );

router.post('/vehiculo',createVehiculo );

router.put('/vehiculo/:id',updateVehiculo );

router.delete('/vehiculo/:id',deleteVehiculo );

export default router;

