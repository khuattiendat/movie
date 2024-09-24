const CommentModel = require('../Models/CommentModel');
const FavoriteModel = require("../Models/FavoriteModel");
const WatchHistoryModel = require("../Models/WatchHistoryModel");
const MovieModel = require("../Models/MovieModel");
const UserMovieModel = require("../Models/UserModel");
const checkUserExit = async (userId) => {
    return await UserMovieModel.findOne({
        where: {
            id: userId,
        }
    });
}
const checkMovieExit = async (movieId) => {
    return await MovieModel.findOne({
        where: {
            id: movieId,
        }
    });
}
//comment
const createComment = async (data) => {
    try {
        const {userId, movieId, content, rating} = data;
        if (!userId) {
            return {
                error: true,
                message: 'userId is required',
                data: null
            }
        }
        if (!movieId) {
            return {
                error: true,
                message: 'movieId is required',
                data: null
            }
        }
        if (!await checkUserExit(userId)) {
            return {
                error: true,
                message: 'User not found',
                data: null
            }
        }
        if (!await checkMovieExit(movieId)) {
            return {
                error: true,
                message: 'Movie not found',
                data: null
            }
        }
        const commentModel = await new CommentModel({
            user_id: userId,
            movie_id: movieId,
            content,
            rating
        });
        await commentModel.save();
        return {
            error: false,
            message: 'Create comment successfully',
            data: commentModel
        }

    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }


}
//favorite
const createFavorite = async (data) => {
    try {
        const {userId, movieId} = data;
        if (!userId) {
            return {
                error: true,
                message: 'userId is required',
                data: null
            }
        }
        if (!movieId) {
            return {
                error: true,
                message: 'movieId is required',
                data: null
            }
        }
        if (!await checkUserExit(userId)) {
            return {
                error: true,
                message: 'User not found',
                data: null
            }
        }
        if (!await checkMovieExit(movieId)) {
            return {
                error: true,
                message: 'Movie not found',
                data: null
            }
        }
        const existingFavorite = await FavoriteModel.findOne({
            where: {
                user_id: userId,
                movie_id: movieId
            }
        });
        if (existingFavorite) {
            return {
                error: true,
                message: 'Movie is already in favorites',
                data: null
            }
        }

        const favoriteModel = await new FavoriteModel({
            user_id: userId,
            movie_id: movieId
        });
        await favoriteModel.save();
        return {
            error: false,
            message: 'Create favorite successfully',
            data: favoriteModel
        }

    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getFavorites = async (userId) => {
    try {
        if (!userId) {
            return {
                error: true,
                message: 'userId is required',
                data: null
            }
        }
        FavoriteModel.belongsTo(MovieModel, {foreignKey: 'movie_id'});
        const favorites = await FavoriteModel.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: MovieModel,
                    attributes: ['id', 'title', 'content', 'duration', 'quality', 'rating', 'url_image', 'url_video', 'slug', 'year']
                }
            ]
        });
        return {
            error: false,
            message: 'Favorites found',
            data: favorites
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const deleteFavorite = async (data) => {
    try {
        const {userId, movieId} = data;
        if (!userId) {
            return {
                error: true,
                message: 'userId is required',
                data: null
            }
        }
        if (!movieId) {
            return {
                error: true,
                message: 'movieId is required',
                data: null
            }
        }
        if (!await checkUserExit(userId)) {
            return {
                error: true,
                message: 'User not found',
                data: null
            }
        }
        if (!await checkMovieExit(movieId)) {
            return {
                error: true,
                message: 'Movie not found',
                data: null
            }
        }
        const favorite = await FavoriteModel.findOne({
            where: {
                user_id: userId,
                movie_id: movieId
            }
        });
        if (!favorite) {
            return {
                error: true,
                message: 'Favorite not found',
                data: null
            }
        }
        await favorite.destroy();
        return {
            error: false,
            message: 'Favorite deleted',
            data: favorite
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
// watch_history
const createWatchHistory = async (data) => {
    try {
        const {userId, movieId, watchedAt} = data;
        if (!userId) {
            return {
                error: true,
                message: 'userId is required',
                data: null
            }
        }
        if (!movieId) {
            return {
                error: true,
                message: 'movieId is required',
                data: null
            }
        }

        if (!await checkUserExit(userId)) {
            return {
                error: true,
                message: 'User not found',
                data: null
            }
        }
        if (!await checkMovieExit(movieId)) {
            return {
                error: true,
                message: 'Movie not found',
                data: null
            }
        }
        const existingWatchHistory = await WatchHistoryModel.findOne({
            where: {
                user_id: userId,
                movie_id: movieId
            }
        });
        if (existingWatchHistory) {
            existingWatchHistory.watched_at = watchedAt;
            await existingWatchHistory.save();
            return {
                error: false,
                message: 'Update watch history successfully',
                data: existingWatchHistory
            }
        }

        const watchHistoryModel = await new WatchHistoryModel({
            user_id: userId,
            movie_id: movieId,
            watched_at: watchedAt
        });
        await watchHistoryModel.save();
        return {
            error: false,
            message: 'Create watch history successfully',
            data: watchHistoryModel
        }

    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getWatchHistory = async (userId) => {
    try {
        if (!userId) {
            return {
                error: true,
                message: 'userId is required',
                data: null
            }
        }
        WatchHistoryModel.belongsTo(MovieModel, {foreignKey: 'movie_id'});
        const watchHistory = await WatchHistoryModel.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: MovieModel,
                    attributes: ['id', 'title', 'content', 'duration', 'quality', 'rating', 'url_image', 'url_video', 'slug', 'year']
                }
            ]
        });
        return {
            error: false,
            message: 'Watch history found',
            data: watchHistory
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
    createComment,
    createFavorite,
    getFavorites,
    deleteFavorite,
    createWatchHistory,
    getWatchHistory
}