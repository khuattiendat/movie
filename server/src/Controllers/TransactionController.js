const {createTransaction, updateTransaction, getAllTransactions} = require('../Services/TransactionService');

const TransactionController = {
    async createTransaction(req, res) {
        try {
            const data = req.body;
            const response = await createTransaction(data);
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
    async updateTransaction(req, res) {
        try {
            const data = req.body;
            const {id} = req.params;
            const response = await updateTransaction(id, data);
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
    async getAllTransactions(req, res) {
        try {
            const response = await getAllTransactions();
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
module.exports = TransactionController;