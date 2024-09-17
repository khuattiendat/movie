const {createMovie, getMovieBySlugOrId, updateMovie, deleteMovie, getAllMovies} = require('../Services/MovieService')
const MovieController = {
    createMovie: async (req, res) => {
        try {
            const data = req.body;
            const result = await createMovie(data);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: result.message
                });
            }
            return res.status(201).json({
                error: false,
                data: result.data,
                message: 'Movie created'
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message,
                data: null
            });
        }
    },
    getMovieBySlugOrId: async (req, res) => {
        try {
            const {slug} = req.params;
            const result = await getMovieBySlugOrId(slug);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: result.message
                });
            }
            return res.status(200).json({
                error: false,
                data: result.data,
                message: 'Movie found'
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message,
                data: null
            });
        }
    },
    updateMovie: async (req, res) => {
        try {
            const {id} = req.params;
            const data = req.body;
            const result = await updateMovie(id, data);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: result.message
                });
            }
            return res.status(200).json({
                error: false,
                data: result.data,
                message: 'Movie updated'
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message,
                data: null
            });
        }
    },
    deleteMovie: async (req, res) => {
        try {
            const {id} = req.params;
            const result = await deleteMovie(id);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: result.message
                });
            }
            return res.status(200).json({
                error: false,
                data: result.data,
                message: 'Movie deleted'
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message,
                data: null
            });
        }
    },
    getAllMovies: async (req, res) => {
        try {
            const {page, search} = req.query;
            const result = await getAllMovies(page, search);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: result.message
                });
            }
            return res.status(200).json({
                error: false,
                data: result.data,
                message: 'Movies found'
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message,
                data: null
            });
        }
    }
}
module.exports = MovieController;