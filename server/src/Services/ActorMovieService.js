const ActorMovieModel = require('../Models/ActorMovieModel');
const createActorMovie = async (data, movieId) => {
    try {
        data = data.map(actor => {
            return {
                actor_id: actor?.id,
                movie_id: movieId
            }
        });
        const actors = await ActorMovieModel.bulkCreate(data);
        return {
            error: false,
            message: 'Actor movie created',
            data: actors
        }
    } catch (error) {
        return {
            error: true,
            message: error.message,
            data: null
        }
    }
}
const deleteActorMovie = async (movieId) => {
    try {
        const actors = await ActorMovieModel.destroy({
            where: {
                movie_id: movieId
            }
        });
        return {
            error: false,
            message: 'Actor movie deleted',
            data: actors
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
    createActorMovie,
    deleteActorMovie
}