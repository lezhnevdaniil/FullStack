const express = require('express');
const router = express.Router();

const {
  getAllPurchs,
  createNewPurch,
  changePurchInfo,
  deletePurch
} = require('../controllers/purche.controller')

router.get('/allPurchs', getAllPurchs);
router.post('/createPurch', createNewPurch);
router.patch('/updatePurch', changePurchInfo);
router.delete('/deletePurch', deletePurch);

module.exports = router;