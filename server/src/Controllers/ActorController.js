const {createActor, deleteActor, getActorById, getAllActors, updateActor} = require('../Services/ActorService')
const ActorController = {
    createActor: async (req, res) => {
        try {
            const data = req.body;
            const result = await createActor(data);
            if (result.error) {
                return res.status(400).json({
                    error: true,
                    message: result.message,
                    data: null
                });
            }
            return res.status(201).json({
                error: false,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    },
    getActorById: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await getActorById(id);
            if (result.error) {
                return res.status(404).json({
                    error: true,
                    message: result.message,
                    data: null
                });
            }
            return res.status(200).json({
                error: false,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    },
    getAllActors: async (req, res) => {
        try {
            const {page, search} = req.query;
            const result = await getAllActors(page, search);
            return res.status(200).json({
                error: false,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    },
    updateActor: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const result = await updateActor(id, data);
            if (result.error) {
                return res.status(404).json({
                    error: true,
                    message: result.message,
                    data: null
                });
            }
            return res.status(200).json({
                error: false,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    },
    deleteActor: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await deleteActor(id);
            if (result.error) {
                return res.status(404).json({
                    error: true,
                    message: result.message,
                    data: null
                });
            }
            return res.status(200).json({
                error: false,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    }
}
module.exports = ActorController;