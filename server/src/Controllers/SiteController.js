const {
    createComment,
    createFavorite,
    getFavorites,
    deleteFavorite,
    createWatchHistory,
    getWatchHistory
} = require('../Services/SiteService');
const SiteController = {
    //comments
    createComment: async (req, res) => {
        try {
            const data = req.body;
            const result = await createComment(data);
            console.log(result)
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    message: result.message,
                    data: null
                })
            }
            return res.status(201).json({
                error: false,
                message: result.message,
                data: result.data
            })

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    },
    //favorites
    createFavorite: async (req, res) => {
        try {
            const data = req.body;
            const result = await createFavorite(data);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    message: result.message,
                    data: null
                })
            }
            return res.status(201).json({
                error: false,
                message: result.message,
                data: result.data
            })

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    },
    getFavorites: async (req, res) => {
        try {
            const {userId} = req.params;
            const result = await getFavorites(userId);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    message: result.message,
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: result.message,
                data: result.data
            })

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    },
    deleteFavorite: async (req, res) => {
        try {
            const data = req.body;
            const result = await deleteFavorite(data);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    message: result.message,
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: result.message,
                data: result.data
            })

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    },
    //watch_history
    createWatchHistory: async (req, res) => {
        try {
            const data = req.body;
            const result = await createWatchHistory(data);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    message: result.message,
                    data: null
                })
            }
            return res.status(201).json({
                error: false,
                message: result.message,
                data: result.data
            })

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    },
    getWatchHistory: async (req, res) => {
        try {
            const {userId} = req.params;
            const result = await getWatchHistory(userId);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    message: result.message,
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: result.message,
                data: result.data
            })

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    }

}
module.exports = SiteController;