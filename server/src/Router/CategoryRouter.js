const express = require('express');
const router = express.Router();
const {
    addCategory,
    getAllCategories,
    getCategoryBySlug,
    deleteCategory,
    updateCategory
} = require('../Controllers/CategoryController');

router.post('/create', addCategory);
router.get('/get-all', getAllCategories);
router.get('/get-one/:slug', getCategoryBySlug);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;
