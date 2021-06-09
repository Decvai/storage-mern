const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const router = new Router();
const fileController = require('../controllers/fileController');

router.post('', authMiddleware, fileController.createDir);
router.get('', authMiddleware, fileController.getFiles);
router.post('/upload', authMiddleware, fileController.uploadFile);
router.get('/download', authMiddleware, fileController.downloadFile);
router.get('/search', authMiddleware, fileController.searchFiles);
router.post('/avatar', authMiddleware, fileController.uploadAvatar);
router.delete('/avatar', authMiddleware, fileController.deleteAvatar);
router.delete('/', authMiddleware, fileController.deleteFile);

module.exports = router;
