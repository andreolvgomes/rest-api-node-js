const express = require('express');
const router = express.Router();
const mysql = require('../mysql');
const bcrypt = require('bcrypt');

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

module.exports = router;