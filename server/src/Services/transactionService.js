const Transaction = require('../Models/TransactionModel');
const User = require('../Models/UserModel');
const createTransaction = async (transaction) => {
    try {
        const {userId, amount, content} = transaction;
        if (!userId || !amount || !content) {
            return {
                error: true,
                message: 'Please provide all required fields',
                data: null
            }
        }
        const newTransaction = await Transactison.create({
            user_id: userId,
            amount,
            content,
            status: 0
        });
        return {
            error: false,
            message: 'Transaction created successfully',
            data: newTransaction
        }
    } catch
        (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const updateTransaction = async (id, transaction) => {
    try {
        const fieldsToUpdate = {};
        if (transaction.amount) fieldsToUpdate.amount = transaction.amount;
        if (transaction.status !== undefined) fieldsToUpdate.status = transaction.status;
        if (Object.keys(fieldsToUpdate).length === 0) {
            return {
                error: true,
                message: 'Please provide fields to update',
                data: null
            }
        }
        const transactionExit = await Transaction.findOne({
            where: {
                id
            }
        });
        if (!transactionExit) {
            return {
                error: true,
                message: 'Transaction not found',
                data: null
            }
        }
        if (transactionExit.status.toString() === '1') {
            return {
                error: true,
                message: 'You cannot update transaction status to success',
                data: null
            }
        }
        const updatedTransaction = await Transaction.update(fieldsToUpdate, {
            where: {
                id
            }
        });
        if (transaction.status.toString() === '1' && transaction.amount) {
            // Update user balance
            const user = await User.findOne({
                where: {
                    id: transaction.userId
                }
            });
            if (user) {
                const newCore = Number(user?.core) + transaction.amount;
                await User.update({
                    core: newCore
                }, {
                    where: {
                        id: transaction.userId
                    }
                });
            }
        }
        return {
            error: false,
            message: 'Transaction updated successfully',
            data: transactionExit
        }
    } catch
        (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getAllTransactions = async (page) => {
    try {
        // Define associations
        Transaction.belongsTo(User, {foreignKey: 'user_id'});
        User.hasMany(Transaction, {foreignKey: 'user_id'});
        const transactions = await Transaction.findAll({
            include: [{
                model: User,
                as: 'user', // Make sure this alias matches the one defined in your associations
                attributes: {exclude: ['password']} // Exclude the password attribute
            }],
            order: [['status', 'ASC']] // Sort by status in ascending order
        });
        return {
            error: false,
            message: 'Transactions fetched successfully',
            data: transactions
        }
    } catch
        (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
module.exports = {
    createTransaction,
    updateTransaction,
    getAllTransactions
}