const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

exports.getSolicitudes = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, codigo, descripcion } = req.query;

        const where = {
            codigo: codigo ? { contains: codigo } : undefined,
            descripcion: descripcion ? { contains: descripcion } : undefined,
        };

        const solicitudes = await prismaClient.solicitud.findMany({
            where,
            skip: (page - 1) * limit,
            take: parseInt(limit),
        });

        res.json(solicitudes);
    } catch (error) {
        next(error);
    }
};

exports.createSolicitud = async (req, res, next) => {
    try {
        const { codigo, descripcion, resumen, empleadoId } = req.body;
        const solicitud = await prismaClient.solicitud.create({
            data: { codigo, descripcion, resumen, empleadoId },
        });
        res.json(solicitud);
    } catch (error) {
        next(error);
    }
};

exports.updateSolicitud = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { codigo, descripcion, resumen, empleadoId } = req.body;

        const solicitud = await prismaClient.solicitud.update({
            where: { id: parseInt(id) },
            data: { codigo, descripcion, resumen, empleadoId },
        });

        res.json(solicitud);
    } catch (error) {
        next(error);
    }
};

exports.deleteSolicitud = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prismaClient.solicitud.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Solicitud eliminada' });
    } catch (error) {
        next(error);
    }
};
