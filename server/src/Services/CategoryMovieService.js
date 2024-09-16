const CategoryMovieModel = require('../Models/CategoryMovieModel');
const createCategoryMovie = async (data, movieId) => {
    try {
        data = data.map(category => {
            return {
                category_id: category?.id,
                movie_id: movieId
            }
        });
        const categories = await CategoryMovieModel.bulkCreate(data);
        return {
            error: false,
            message: 'Category movie created',
            data: categories
        }
    } catch (error) {
        return {
            error: true,
            message: error.message,
            data: null
        }
    }

}
const deleteCategoryMovie = async (movieId) => {
    try {
        const categories = await CategoryMovieModel.destroy({
            where: {
                movie_id: movieId
            }
        });
        return {
            error: false,
            message: 'Category movie deleted',
            data: categories
        }
    } catch (error) {
        return {
            error: true,
            message: error.message,
            data: null
        }
    }
}
module.exports = {
    createCategoryMovie,
    deleteCategoryMovie
}