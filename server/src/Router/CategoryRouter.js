const express = require('express');
const router = express.Router();
const Middleware = require('../Middlewares/MiddleLogin');
const {
    addCategory,
    getAllCategories,
    getCategoryBySlug,
    deleteCategory,
    updateCategory
} = require('../Controllers/CategoryController');

router.post('/create', Middleware.verifyTokenAndAdmin, addCategory);
router.get('/get-all', Middleware.verifyToken, getAllCategories);
router.get('/get-one/:slug', Middleware.verifyToken, getCategoryBySlug);
router.put('/update/:id', Middleware.verifyTokenAndAdmin, updateCategory);
router.delete('/delete/:id', Middleware.verifyTokenAndAdmin, deleteCategory);

module.exports = router;
