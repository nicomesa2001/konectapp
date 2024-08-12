const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prismaClient.user.create({
            data: { email, password: hashedPassword, role },
        });
        res.json(user);
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        } else {
            res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const token = generateToken(user);
    res.json({ token });
};
