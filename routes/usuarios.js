const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarios-controller');

router.post('/cadastro', controller.novo);
router.post('/login', controller.login);

module.exports = router;