const express = require('express');
const TransactionController = require('../Controllers/TransactionController');
const Middleware = require('../Middlewares/MiddleLogin');
const router = express.Router();
router.post('/create', Middleware.verifyToken, TransactionController.createTransaction);
router.put('/update/:id', Middleware.verifyTokenAndAdmin, TransactionController.updateTransaction);
router.get('/get-all', Middleware.verifyTokenAndAdmin, TransactionController.getAllTransactions);

module.exports = router;