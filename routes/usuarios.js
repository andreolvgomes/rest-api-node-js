const express = require('express');
const router = express.Router();
const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = "segredo"

router.post('/cadastro', (req, res, next) => {
    bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
        if (errBcrypt) {
            return res.status(500).send({ error: errBcrypt })
        }

        mysql.query('select * from usuarios where email = ?', [req.body.email],
            (error, results) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (results.length > 0) {
                    return res.status(401).send({ mensagem: 'Usuário já cadastrado', })
                }

                mysql.query('INSERT INTO usuarios (email, senha) VALUES (?,?)', [req.body.email, hash],
                    (error, results) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        const response = {
                            mensagem: 'Usuário criado com sucesso',
                            usuarioCriado: {
                                id_usuario: results.insertId,
                                email: req.body.email
                            }
                        }
                        return res.status(201).send(response);
                    });
            });
    });
});

router.post('/login', (req, res, next) => {
    mysql.query('select * from usuarios where email = ?', [req.body.email],
        (error, results) => {
            if (error) { return res.status(500).send({ error: error }) }

            if (results.length == 0) {
                return res.status(401).send({ mensagem: 'Falha na autenticação', })
            }

            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (error) {
                    return res.status(500).send({ error: err })
                }

                if (result) {
                    let token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email
                    }, JWT_KEY, {
                        expiresIn: "1h"
                    });

                    return res.status(200).send({
                        mensagem: "Autenticado com sucesso",
                        token: token
                    })
                }
                return res.status(401).send({ mensagem: "Falha na autenticação" })
            });
        });
});

module.exports = router;