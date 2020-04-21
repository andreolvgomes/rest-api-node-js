const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({ message: "Usando GET dentro da rota de produtos" });
});

router.post('/', (req, res, next) => {
    res.status(200).send({ message: "Usando POST dentro da rota de produtos" });
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    res.status(200).send({
        message: "Retorna o GET de um produto exclusivo",
        id: id
    });
});

module.exports = router;