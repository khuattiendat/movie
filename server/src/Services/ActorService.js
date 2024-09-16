const ActorModel = require('../Models/ActorModel');
const {Op} = require("sequelize");
const createActor = async (actor) => {
    try {
        const {name, birthdate} = actor;
        if (!name) {
            return {
                error: true,
                message: 'Name is required',
                data: null
            }
        }
        const newActor = await new ActorModel({
            name,
            birthdate
        });
        await newActor.save();
        return {
            error: false,
            message: 'Actor created successfully',
            data: newActor
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getActorById = async (id) => {
    try {
        const actor = await ActorModel.findByPk(id);
        if (!actor) {
            return {
                error: true,
                message: 'Actor not found',
                data: null
            }
        }
        return {
            error: false,
            message: 'Actor found',
            data: actor
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getAllActors = async (page = 1, search = '') => {
    try {
        let totalPage;
        let totalActors;
        let actors = []
        let pageSize = 9;
        let offset = (page - 1) * pageSize;
        if (page < 1) {
            page = 1;
        }
        if (!search) {
            const {rows, count} = await ActorModel.findAndCountAll({
                limit: pageSize,
                offset: offset
            })
            await rows.forEach((item) => {
                actors.push(item.dataValues)
            })
            totalPage = Math.ceil(count / pageSize);
            totalActors = count;
        } else {
            const {rows, count} = await ActorModel.findAndCountAll({
                where: {
                    [Op.or]: [
                        {name: {[Op.like]: '%' + search.trim() + '%'}},
                    ]
                },
                limit: pageSize,
                offset: offset
            })
            await rows.forEach((item) => {
                actors.push(item.dataValues)
            })
            totalPage = Math.ceil(count / pageSize);
            totalActors = count
        }
        return {
            error: false,
            message: 'Actors found',
            data: {
                actors,
                totalPage,
                totalActors
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
const updateActor = async (id, actor) => {
    try {
        const {name, birthdate} = actor;
        const actorToUpdate = await ActorModel.findByPk(id);
        if (!actorToUpdate) {
            return {
                error: true,
                message: 'Actor not found',
                data: null
            }
        }
        if (name) actorToUpdate.name = name;
        if (birthdate) actorToUpdate.birthdate = birthdate;
        await actorToUpdate.save();
        return {
            error: false,
            message: 'Actor updated successfully',
            data: actorToUpdate
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const deleteActor = async (id) => {
    try {
        const actorToDelete = await ActorModel.findByPk(id);
        if (!actorToDelete) {
            return {
                error: true,
                message: 'Actor not found',
                data: null
            }
        }
        await actorToDelete.destroy();
        return {
            error: false,
            message: 'Actor deleted successfully',
            data: actorToDelete
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
    createActor,
    getActorById,
    getAllActors,
    updateActor,
    deleteActor
}