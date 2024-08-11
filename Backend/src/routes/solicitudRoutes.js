const express = require('express');
const {
    getSolicitudes,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud
} = require('../controllers/solicitudController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getSolicitudes);
router.post('/', authenticateToken, isAdmin, createSolicitud);
router.put('/:id', authenticateToken, isAdmin, updateSolicitud);
router.delete('/:id', authenticateToken, isAdmin, deleteSolicitud);

module.exports = router;
