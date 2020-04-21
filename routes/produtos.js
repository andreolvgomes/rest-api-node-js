const express = require('express');
const router = express.Router();

const controllers_produtos = require('../controllers/produtos-controller');

router.get('/', controllers_produtos.produtos);
router.post('/', controllers_produtos.novo);
router.get('/', controllers_produtos.produto);
router.patch('/', controllers_produtos.update);
router.delete('/', controllers_produtos.delete);

module.exports = router;