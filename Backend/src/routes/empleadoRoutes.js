const express = require('express');
const {
    getEmpleados,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} = require('../controllers/empleadoController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getEmpleados);
router.post('/', authenticateToken, isAdmin, createEmpleado);
router.put('/:id', authenticateToken, isAdmin, updateEmpleado);
router.delete('/:id', authenticateToken, isAdmin, deleteEmpleado);

module.exports = router;
