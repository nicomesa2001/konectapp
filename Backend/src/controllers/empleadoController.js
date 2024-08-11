const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

exports.getEmpleados = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, nombre, salarioMin, salarioMax } = req.query;

        const where = {
            nombre: nombre ? { contains: nombre } : undefined,
            salario: {
                gte: salarioMin ? parseFloat(salarioMin) : undefined,
                lte: salarioMax ? parseFloat(salarioMax) : undefined,
            }
        };

        const empleados = await prismaClient.empleado.findMany({
            where,
            skip: (page - 1) * limit,
            take: parseInt(limit),
        });

        res.json(empleados);
    } catch (error) {
        next(error);
    }
};

exports.createEmpleado = async (req, res, next) => {
    try {
        const { fechaIngreso, nombre, salario } = req.body;
        const empleado = await prismaClient.empleado.create({
            data: { fechaIngreso: new Date(fechaIngreso), nombre, salario },
        });
        res.json(empleado);
    } catch (error) {
        next(error);
    }
};

exports.updateEmpleado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fechaIngreso, nombre, salario } = req.body;

        const empleado = await prismaClient.empleado.update({
            where: { id: parseInt(id) },
            data: { fechaIngreso: new Date(fechaIngreso), nombre, salario },
        });

        res.json(empleado);
    } catch (error) {
        next(error);
    }
};

exports.deleteEmpleado = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prismaClient.empleado.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Empleado eliminado' });
    } catch (error) {
        next(error);
    }
};
