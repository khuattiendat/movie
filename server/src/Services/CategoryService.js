const categoryModel = require('../Models/CategoryModel');
const {Op} = require("sequelize");
const CategoryMovieModel = require('../Models/CategoryMovieModel');
const MovieModel = require('../Models/MovieModel');
const addCategory = async (category) => {
    try {
        const {name, description, slug} = category;
        if (!name) {
            return {
                error: true,
                message: 'Name is required',
                data: null
            }
        }
        if (!slug) {
            return {
                error: true,
                message: 'Slug is required',
                data: null
            }
        }
        const checkCategory = await categoryModel.findOne({
            where: {
                [Op.or]: [
                    {name: {[Op.like]: '%' + name.trim() + '%'}},
                    {slug: {[Op.like]: '%' + slug.trim() + '%'}},
                ]
            },
        });
        if (checkCategory) {
            return {
                error: true,
                message: 'Category already exists',
                data: null
            }
        }
        const newCategory = await new categoryModel({
            name,
            description,
            slug
        });
        await newCategory.save();
        return {
            error: false,
            message: 'Category added successfully',
            data: newCategory
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getCategoryBySlugOrSlug = async (slug) => {
    try {
        const category = await categoryModel.findOne({
            where: {
                [Op.or]: [
                    {slug: slug},
                    {id: slug}
                ]
            }
        })
        if (!category) {
            return {
                error: true,
                message: 'Category not found',
                data: null
            }
        }
        return {
            error: false,
            message: 'Category found',
            data: category
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getAllCategories = async (page = 1, search = '') => {
    try {
        const categories = await categoryModel.findAll();
        return {
            error: false,
            message: 'Categories found',
            data: categories
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const updateCategory = async (id, data) => {
    try {
        const {name, description, slug} = data;
        const category = await categoryModel.findOne({
            where: {id}
        });
        if (!category) {
            return {
                error: true,
                message: 'Category not found',
                data: null
            }
        }
        const checkCategory = await categoryModel.findOne({
            where: {
                [Op.or]: [
                    name && {name: {[Op.like]: '%' + name.trim() + '%'}},
                    slug && {slug: {[Op.like]: '%' + slug.trim() + '%'}},
                ],
                id: {
                    [Op.ne]: id
                }
            },
        });
        if (checkCategory) {
            return {
                error: true,
                message: 'Category already exists',
                data: null
            }
        }
        if (name) category.name = name;
        if (description) category.description = description;
        if (slug) category.slug = slug;
        await category.save();
        return {
            error: false,
            message: 'Category updated successfully',
            data: category
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
const deleteCategory = async (id) => {
    try {
        const category = await categoryModel.findOne({
            where: {id}
        });
        if (!category) {
            return {
                error: true,
                message: 'Category not found',
                data: null
            }
        }
        const categoryMovies = await CategoryMovieModel.findAll({
            where: {category_id: id}
        });
        if (categoryMovies.length > 0) {
            return {
                error: true,
                message: 'Category has movies',
                data: null
            }
        }
        const deletedCategory = await categoryModel.destroy({
            where: {id}
        });
        return {
            error: false,
            message: 'Category deleted successfully',
            data: deletedCategory
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
//

module.exports = {
    addCategory,
    getCategoryBySlugOrSlug,
    getAllCategories,
    updateCategory,
    deleteCategory
}