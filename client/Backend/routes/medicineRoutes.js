const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { getMedicines, createMedicine, updateMedicine, deleteMedicine } = require('../controllers/medicineController');

router.get('/', getMedicines);
router.post('/', auth, admin, createMedicine);
router.put('/:id', auth, admin, updateMedicine);
router.delete('/:id', auth, admin, deleteMedicine);

module.exports = router;