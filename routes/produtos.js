const express = require('express');
const router = express.Router();
const mysql = require('../mysql');

// retorna lista de produtos
router.get('/', (req, res, next) => {
    mysql.query('select * from produtos',
        (error, result, fields) => {
            if (error) {
                res.status(500).send({
                    error: error,
                    response: null
                });
            }

            const reponse = {
                quantidade: result.lenght,
                produtos: result.map(prod => {
                    return {
                        id_produto: prod.id_produto,
                        nome: prod.nome,
                        preco: prod.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: 'http://localhost:8080/produtos/' + prod.id_produto
                        }
                    }
                })
            };

            return res.status(200).send({ response: reponse });
        });
});

// insert produtos
router.post('/', (req, res, next) => {
    mysql.query('insert into produtos (nome, preco) values (?, ?);', [req.body.nome, req.body.preco],
        (error, result, field) => {
            if (error) {
                res.status(500).send({
                    error: error,
                    response: null
                });
            }

            const reponse = {
                mensagem: "Produto inserido com sucesso",
                produto: {
                    id_produto: result.insertId,
                    request: {
                        tipo: 'POST',
                        descricao: 'Produto inserido',
                        url: 'http://localhost:8080/produtos/'
                    }
                }
            }

            res.status(201).send(reponse);
        });
});

// get onde produto
router.get('/:id_produto', (req, res, next) => {
    mysql.query('select * from produtos where id_produto = ?', [req.params.id_produto],
        (error, result, fields) => {
            if (error) {
                res.status(500).send({
                    error: error,
                    response: null
                });
            }

            if (result.lenght == 0) {
                return res.status(404).send({
                    mensagem: "Produto não encontrado"
                });
            }

            const reponse = {
                mensagem: "Produto encontrado",
                produto: {
                    id_produto: req.params.id_produto,
                    request: {
                        tipo: 'GET',
                        descricao: 'Detalhes do produto',
                        url: 'http://localhost:8080/produtos/' + req.params.id_produto
                    }
                }
            }

            res.status(201).send(reponse);
        });
});

// update produtos
router.patch('/', (req, res, next) => {
    mysql.query('update produtos set nome = ?, preco = ? where id_produto = ?', [req.body.nome, req.body.preco, req.body.id_produto],
        (error, result, field) => {
            if (error) {
                res.status(500).send({
                    error: error,
                    response: null
                });
            }

            if (result.lenght == 0) {
                return res.status(404).send({
                    mensagem: "Produto não encontrado"
                });
            }

            const reponse = {
                mensagem: "Produto atualizado com sucesso",
                produto: {
                    id_produto: req.params.id_produto,
                    request: {
                        tipo: 'GET',
                        descricao: 'Detalhes do produto',
                        url: 'http://localhost:8080/produtos/' + req.body.id_produto
                    }
                }
            }

            res.status(201).send(reponse);
        });
});

// delete produtos
router.delete('/', (req, res, next) => {
    mysql.query('delete from produtos where id_produto = ?', [req.body.id_produto],
        (error, result, field) => {
            if (error) {
                res.status(500).send({
                    error: error,
                    response: null
                });
            }
            res.status(202).send({
                mensagem: "Produto deletado com sucesso",
            });
        });
});


module.exports = router;