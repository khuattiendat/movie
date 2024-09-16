const MovieModel = require('../Models/MovieModel');
const {createActorMovie, deleteActorMovie} = require("./ActorMovieService");
const {createCategoryMovie, deleteCategoryMovie} = require("./CategoryMovieService");
const {Op} = require("sequelize");
const CategoryModel = require("../Models/CategoryModel");
const ActorModel = require("../Models/ActorModel");
const createMovie = async (data) => {
    try {
        const {title, content, duration, quality, rating, url_image, url_video, slug, categories, actors} = data;
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
            slug
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
const getMovieBySlug = async (slug) => {
    try {
        const movie = await MovieModel.findOne({
            where: {
                slug
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
                }
            ]
        });
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
        const {title, content, duration, quality, rating, url_image, url_video, categories, actors} = data;
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
        await deleteCategoryMovie(id);
        await deleteActorMovie(id);
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
const getAllMovies = async (page = 1, search = '') => {
    try {
        let totalPage;
        let totalMovie;
        let movies = []
        let pageSize = 9;
        let offset = (page - 1) * pageSize;
        if (page < 1) {
            page = 1;
        }
        if (!search) {
            const {count, rows} = await MovieModel.findAndCountAll({
                limit: pageSize,
                offset: offset,
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
            movies = rows;
            totalPage = Math.ceil(count / pageSize);
            totalMovie = count;
        } else {
            const {count, rows} = await MovieModel.findAndCountAll({
                limit: pageSize,
                offset: offset,
                where: {
                    [Op.or]: [
                        {title: {[Op.like]: '%' + search + '%'}},
                        {content: {[Op.like]: '%' + search + '%'}},
                        {quality: {[Op.like]: '%' + search + '%'}},
                        {slug: {[Op.like]: '%' + search + '%'}},
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
                    }
                ]
            });
            movies = rows;
            totalPage = Math.ceil(count / pageSize);
            totalMovie = count;
        }

        return {
            error: false,
            message: 'Movies found',
            data: {
                movies,
                totalMovie,
                totalPage
            }
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
    getMovieBySlug,
    updateMovie,
    deleteMovie,
    getAllMovies
}