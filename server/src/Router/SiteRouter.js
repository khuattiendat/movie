const express = require('express');
const router = express.Router();
const Middleware = require('../Middlewares/MiddleLogin');
const SiteController = require('../Controllers/SiteController');

router.post('/comments/create', Middleware.verifyToken, SiteController.createComment);
//favorites
router.post('/favorites/create', Middleware.verifyToken, SiteController.createFavorite);
router.get('/favorites/:userId', Middleware.verifyToken, SiteController.getFavorites);
router.delete('/favorites/delete', Middleware.verifyToken, SiteController.deleteFavorite);
//watch_history
router.post('/watch-history/create', Middleware.verifyToken, SiteController.createWatchHistory);
router.get('/watch-history/:userId', Middleware.verifyToken, SiteController.getWatchHistory);


module.exports = router;
