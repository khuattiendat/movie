const {
    addCategory,
    deleteCategory,
    getAllCategories,
    getCategoryBySlugOrSlug,
    updateCategory
} = require('../Services/CategoryService')
const CategoryController = {
    addCategory: async (req, res) => {
        try {
            const data = req.body;
            const response = await addCategory(data);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    message: response.message,
                    data: null
                })
            }
            return res.status(201).json({
                error: false,
                message: response.message,
                data: response.data
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const {page, search} = req.query;
            const response = await getAllCategories(page, search);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    message: response.message,
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: response.message,
                data: response.data
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    },
    getCategoryBySlug: async (req, res) => {
        try {
            const {slug} = req.params;
            const response = await getCategoryBySlugOrSlug(slug);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    message: response.message,
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: response.message,
                data: response.data
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const data = req.body;
            const {id} = req.params;
            const response = await updateCategory(id, data);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    message: response.message,
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: response.message,
                data: response.data
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const {id} = req.params;
            const response = await deleteCategory(id);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    message: response.message,
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: response.message,
                data: response.data
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
module.exports = CategoryController;