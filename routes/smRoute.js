const express = require('express');
const router = express.Router();
const { uploadSurat, getSurat, getAll, updateSurat, deleteSurat, cariSurat, countSurat } = require('../controllers/smController');
const upload = require('../middlewares/upload');
const verifyToken = require('../middlewares/jwt_auth');

router.post('/', upload.single('file_surat'), uploadSurat);

router.get('/', getAll);
router.get('/:id', getSurat);
router.get('/search/surat', cariSurat);

router.put('/:id', upload.single('file_surat'), updateSurat);

router.delete('/:id', deleteSurat);

router.get('/jumlah/surat', countSurat);

module.exports = router;