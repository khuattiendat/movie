const UserRouter = require('./UserRouter');

const Router = (app) => {
    app.use('/api/users', UserRouter);
}
module.exports = Router;