const UserRouter = require('./UserRouter');
const CategoryRouter = require('./CategoryRouter');
const ActorRouter = require('./ActorRouter');
const MovieRouter = require('./MovieRouter');

const Router = (app) => {
    app.use('/api/users', UserRouter);
    app.use('/api/categories', CategoryRouter);
    app.use('/api/actors', ActorRouter);
    app.use('/api/movies', MovieRouter);
}
module.exports = Router;