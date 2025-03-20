const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "No autorizado" });
    }
    next();
};

module.exports = (req, res, next) => {
    if (!req.session.userId || req.session.role !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
};
