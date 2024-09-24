const MovieModel = require('../Models/MovieModel');
const {createActorMovie, deleteActorMovie} = require("./ActorMovieService");
const {createCategoryMovie, deleteCategoryMovie} = require("./CategoryMovieService");
const {Op} = require("sequelize");
const CategoryModel = require("../Models/CategoryModel");
const ActorModel = require("../Models/ActorModel");
const CommentModel = require("../Models/CommentModel");
const FavoriteModel = require('../Models/FavoriteModel');
const WatchHistoryModel = require('../Models/WatchHistoryModel');
const UserModel = require("../Models/UserModel");
const createMovie = async (data) => {
    try {
        const {
            title,
            content,
            duration,
            year,
            quality,
            rating,
            url_image,
            url_video,
            slug,
            categories,
            actors,
            account_can_view
        } = data;
        if (!title) {
            return {
                error: true,
                message: 'Title is required',
                data: null
            }
        }
        if (!content) {
            return {
                error: true,
                message: 'Content is required',
                data: null
            }
        }
        if (!duration) {
            return {
                error: true,
                message: 'Duration is required',
                data: null
            }
        }
        if (!quality) {
            return {
                error: true,
                message: 'Quality is required',
                data: null
            }
        }
        if (!url_image) {
            return {
                error: true,
                message: 'Image is required',
                data: null
            }
        }
        if (!url_video) {
            return {
                error: true,
                message: 'Video is required',
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
        const movieExist = await MovieModel.findOne({
            where: {
                [Op.or]: [
                    {title},
                    {slug}
                ]
            }
        });
        if (movieExist) {
            return {
                error: true,
                message: 'Movie already exists',
                data: null
            }
        }
        const movie = await new MovieModel({
            title,
            content,
            duration,
            quality,
            rating,
            url_image,
            url_video,
            slug,
            year,
            account_can_view
        });
        await movie.save();
        if (!categories || categories.length === 0) {
            return {
                error: true,
                message: 'Categories is required',
                data: null
            }
        }
        if (!actors || actors.length === 0) {
            return {
                error: true,
                message: 'Actors is required',
                data: null
            }
        }
        const movieId = movie?.id
        await createActorMovie(actors, movieId);
        await createCategoryMovie(categories, movieId);
        return {
            error: false,
            message: 'Movie created',
            data: movie
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
const getMovieBySlugOrId = async (slug, role) => {
    try {
        CommentModel.belongsTo(UserModel, {foreignKey: 'user_id'});
        CommentModel.belongsTo(MovieModel, {foreignKey: 'movie_id'});
        const movie = await MovieModel.findOne({
            where: {
                [Op.or]: [
                    {slug},
                    {id: slug}
                ]
            },
            include: [
                {
                    model: CategoryModel,
                    attributes: ['id', 'name', 'slug'], // Specify the attributes you want to retrieve
                    through: {attributes: []} // Exclude join table attributes
                },
                {
                    model: ActorModel,
                    attributes: ['id', 'name'], // Specify the attributes you want to retrieve
                    through: {attributes: []} // Exclude join table attributes
                },
                {
                    model: CommentModel,
                    attributes: ['id', 'content', 'rating'], // Specify the attributes you want to retrieve
                    include: [
                        {
                            model: UserModel,
                            attributes: ['id', 'full_name', 'email'], // Specify the attributes you want to retrieve
                        }
                    ]
                }
            ]
        });
        if (!movie) {
            return {
                error: true,
                message: 'Movie not found',
                data: null
            }
        }
        const accountCanView = movie?.account_can_view;
        let checkRole = (role) => {
            return role.toString() === '1' || role.toString() === '2';
        }
        if (accountCanView === 'vip' && !checkRole(role)) {
            return {
                error: true,
                message: 'Bạn không có quyền xem phim này, vui lòng nâng cấp tài khoản VIP',
                data: null
            }
        }
        return {
            error: false,
            message: 'Movie found',
            data: movie
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const updateMovie = async (id, data) => {
    try {
        const movie = await MovieModel.findOne({
            where: {
                id
            }
        });
        if (!movie) {
            return {
                error: true,
                message: 'Movie not found',
                data: null
            }
        }
        const {
            title,
            content,
            year,
            duration,
            quality,
            rating,
            url_image,
            url_video,
            categories,
            actors,
            account_can_view
        } = data;
        if (title) {
            movie.title = title;
        }
        if (content) {
            movie.content = content;
        }
        if (duration) {
            movie.duration = duration;
        }
        if (quality) {
            movie.quality = quality;
        }
        if (rating) {
            movie.rating = rating;
        }
        if (url_image) {
            movie.url_image = url_image;
        }
        if (url_video) {
            movie.url_video = url_video;
        }
        if (year) {
            movie.year = year;
        }
        if (account_can_view) {
            movie.account_can_view = account_can_view;
        }
        await movie.save();
        const movieId = movie?.id;

        if (categories) {
            const deleteCategories = await deleteCategoryMovie(movieId);
            if (deleteCategories.error) {
                return {
                    error: true,
                    message: deleteCategories.message,
                    data: null
                }
            }
            await createCategoryMovie(categories, movieId);
        }
        if (actors) {
            const deleteActors = await deleteActorMovie(movieId);
            if (deleteActors.error) {
                return {
                    error: true,
                    message: deleteActors.message,
                    data: null
                }
            }
            await createActorMovie(actors, movieId);
        }
        return {
            error: false,
            message: 'Movie updated',
            data: movie
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const deleteMovie = async (id) => {
    try {
        const movie = await MovieModel.findOne({
            where: {
                id
            }
        });
        if (!movie) {
            return {
                error: true,
                message: 'Movie not found',
                data: null
            }
        }
        await Promise.all([
            deleteCategoryMovie(id),
            deleteActorMovie(id),
            FavoriteModel.destroy({where: {movie_id: id}}),
            WatchHistoryModel.destroy({where: {movie_id: id}}),
            CommentModel.destroy({where: {movie_id: id}})
        ]);

        await movie.destroy();
        return {
            error: false,
            message: 'Movie deleted',
            data: movie
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getAllMovies = async () => {
    try {
        const movies = await MovieModel.findAll({
            include: [
                {
                    model: CategoryModel,
                    attributes: ['id', 'name', 'slug'], // Specify the attributes you want to retrieve
                    through: {attributes: []} // Exclude join table attributes
                },
                {
                    model: ActorModel,
                    attributes: ['id', 'name'], // Specify the attributes you want to retrieve
                    through: {attributes: []} // Exclude join table attributes
                }
            ]
        });
        return {
            error: false,
            message: 'Movies found',
            data: movies
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
module.exports = {
    createMovie,
    getMovieBySlugOrId,
    updateMovie,
    deleteMovie,
    getAllMovies
}