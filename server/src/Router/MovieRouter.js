const express = require('express');
const MovieController = require('../Controllers/MovieController');
const router = express.Router();
router.post('/create', MovieController.createMovie);
router.get('/get-one/:slug', MovieController.getMovieBySlugOrId);
router.put('/update/:id', MovieController.updateMovie);
router.delete('/delete/:id', MovieController.deleteMovie);
router.get('/get-all', MovieController.getAllMovies);
module.exports = router;
