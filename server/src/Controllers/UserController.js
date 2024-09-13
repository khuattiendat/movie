const {
    register,
    login,
    updateUser,
    deleteUser,
    getAllUser,
    changePassword,
    getUserById
} = require("../Services/UserService");
const UserController = {
    register: async (req, res) => {
        try {
            const data = req.body;
            const response = await register(data);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: response.message
                });
            }
            return res.status(201).json({
                error: false,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                data: null,
                message: error.message || error
            });
        }
    },
    login: async (req, res) => {
        try {
            const data = req.body;
            const response = await login(data);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: response.message
                });
            }
            return res.status(200).json({
                error: false,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                data: null,
                message: error.message || error
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const data = req.body;
            const {id} = req.params;
            const response = await updateUser(id, data);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: response.message
                });
            }
            return res.status(200).json({
                error: false,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                data: null,
                message: error.message || error
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;
            const response = await deleteUser(id);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: response.message
                });
            }
            return res.status(200).json({
                error: false,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                data: null,
                message: error.message || error
            });
        }
    },
    getAllUser: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const search = req.query.search || '';
            console.log(page, search)
            const response = await getAllUser(page, search);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: response.message
                });
            }
            return res.status(200).json({
                error: false,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                data: null,
                message: error.message || error
            });
        }
    },
    getUserById: async (req, res) => {
        try {
            const {id} = req.params;
            const response = await getUserById(id);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: response.message
                });
            }
            return res.status(200).json({
                error: false,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                data: null,
                message: error.message || error
            });
        }
    },
    changePassword: async (req, res) => {
        try {
            const {id} = req.params;
            const data = req.body;
            const response = await changePassword(id, data);
            if (response.error) {
                return res.status(400).json({
                    error: true,
                    data: null,
                    message: response.message
                });
            }
            return res.status(200).json({
                error: false,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                data: null,
                message: error.message || error
            });
        }
    }
}
module.exports = UserController;