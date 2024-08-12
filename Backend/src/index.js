const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const solicitudRoutes = require('./routes/solicitudRoutes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Añade esta ruta básica
app.get('/', (req, res) => {
    res.send('Servidor KonectApp funcionando correctamente');
});

app.use('/auth', authRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/solicitudes', solicitudRoutes);

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});