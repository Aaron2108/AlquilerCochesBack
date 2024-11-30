import express from 'express';
import cors from 'cors';
import rolsRoutes from "./routes/rols.routes.js";
import estadosRoutes from "./routes/estados.routes.js";
import categoriaRoutes from "./routes/categorias.routes.js";
import vehiculoRoutes from "./routes/vehiculos.routes.js";
import usuarioRoutes from "./routes/usuarios.routes.js";
import solicitudRoutes from "./routes/solicitudes.routes.js";
import alquilerRoutes from "./routes/alquileres.routes.js";

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', // Dirección de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Permitir cookies o headers de autenticación
}));

app.use(express.json());

//*Routes
app.use(rolsRoutes);
app.use(estadosRoutes);
app.use(categoriaRoutes);
app.use(vehiculoRoutes);
app.use(usuarioRoutes);
app.use(solicitudRoutes);
app.use(alquilerRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});

//*Puerto
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
