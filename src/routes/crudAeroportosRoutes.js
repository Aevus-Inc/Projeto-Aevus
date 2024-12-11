const express = require('express');
const router = express.Router();
const aeroportoController = require('../controllers/crudAeroportosController');


router.post('/', aeroportoController.createAeroporto);

router.get('/', aeroportoController.getAeroportos);

router.get('/', aeroportoController.getAeroportos);

router.post('/sigla/:sigla', aeroportoController.updateAeroportoBySigla);

router.delete('/:id', aeroportoController.deleteAeroporto);

router.get('/search/:name', aeroportoController.searchAeroportosByName);

router.get('/empresa', aeroportoController.getAeroportosFromEmpresa);

module.exports = router;