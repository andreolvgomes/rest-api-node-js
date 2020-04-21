const jwt = require('jsonwebtoken');
const JWT_KEY = "segredo"

module.exports.obrigatorio = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, JWT_KEY);
        req.usuario = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: "Não autenticado" });
    }
}

module.exports.opcional = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, JWT_KEY);
        req.usuario = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: "Não autenticado" });
    }
}