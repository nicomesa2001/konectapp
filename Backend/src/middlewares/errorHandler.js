const errorHandler = (err, req, res, next) => {
    console.error('Error capturado por el middleware global:', err.stack);

    res.status(500).json({ error: 'Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.' });

    next();
};

module.exports = errorHandler;
