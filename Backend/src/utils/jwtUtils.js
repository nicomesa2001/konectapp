const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

exports.generateToken = (user) => {
    return jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
};
