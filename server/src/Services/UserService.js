const UserModel = require('../Models/UserModel');
const {generateAccessToken} = require('../Utils/generateToken');
const bcrypt = require("bcrypt");
const {Op} = require('sequelize');
const RoleUserModel = require('../Models/RoleUserModel');
const CommentModel = require('../Models/CommentModel');
const FavoriteModel = require('../Models/FavoriteModel');
const WatchHistoryModel = require('../Models/WatchHistoryModel');
const createRoleUser = async (user_id, role_id) => {
    try {
        const newRoleUser = await new RoleUserModel({
            user_id,
            role_id
        });
        await newRoleUser.save();
        return {
            error: false,
            data: newRoleUser,
            message: 'Create role user successfully'
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: error || error
        }
    }
}
const getAllUser = async () => {
    try {
        UserModel.hasOne(RoleUserModel, {foreignKey: 'user_id'});
        const users = await UserModel.findAll({
            attributes: {exclude: ['password']},
            include: [
                {
                    model: RoleUserModel,
                    required: true
                }
            ]
        });
        return {
            error: false,
            data: users,
            message: 'Get all user successfully'
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: error || error
        }
    }
}
const register = async (user) => {
    try {
        const {email, password, phone, full_name, url_image} = user;
        if (!email) {
            return {
                error: true,
                data: null,
                message: 'Email is required'
            }
        }
        if (!password) {
            return {
                error: true,
                data: null,
                message: 'Password is required'
            }
        }
        if (!phone) {
            return {
                error: true,
                data: null,
                message: 'Phone is required'
            }
        }
        if (!full_name) {
            return {
                error: true,
                data: null,
                message: 'full name is required'
            }
        }
        const checkEmail = await UserModel.findOne({
            where: {
                email
            }
        });
        if (checkEmail) {
            return {
                error: true,
                data: null,
                message: 'User already exists'
            }
        }
        const checkPhone = await UserModel.findOne({
            where: {
                phone
            }
        });
        if (checkPhone) {
            return {
                error: true,
                data: null,
                message: 'Phone already exists'
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const newUser = await new UserModel({
            email,
            password: hashed,
            phone,
            full_name,
            url_image
        });
        await newUser.save();
        await createRoleUser(newUser.id, 3);
        const {password: pass, ...userWithoutPassword} = newUser.dataValues;
        return {
            error: false,
            data: userWithoutPassword,
            message: 'Register successfully'
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: error || error
        }
    }
}
const login = async (user) => {
    try {
        UserModel.hasOne(RoleUserModel, {foreignKey: 'user_id'});
        const {email, password} = user;
        if (!email) {
            return {
                error: true,
                data: null,
                message: 'Email is required'
            }
        }
        if (!password) {
            return {
                error: true,
                data: null,
                message: 'Password is required'
            }
        }
        const userExist = await UserModel.findOne({
            where: {
                email
            },
            include: [
                {
                    model: RoleUserModel,
                    required: true
                }
            ]
        });
        if (!userExist) {
            return {
                error: true,
                data: null,
                message: 'User not found'
            }
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return {
                error: true,
                data: null,
                message: 'Password incorrect'
            }
        }
        const role = userExist?.role_user?.role_id;
        const token = generateAccessToken(userExist.id, role);
        const {password: pass, ...userWithoutPassword} = userExist.dataValues;
        return {
            error: false,
            data: {
                user: userWithoutPassword,
                token
            },
            message: 'Login successfully'
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: error || error
        }
    }
}
const updateUser = async (id, user) => {
    try {
        const {email, phone, full_name} = user;
        const userExist = await UserModel.findOne({
            where: {
                id
            }
        });
        if (!userExist) {
            return {
                error: true,
                data: null,
                message: 'User not found'
            }
        }
        const checkEmail = await UserModel.findOne({
            where: {
                email,
                id: {
                    [Op.ne]: id
                }
            }
        });
        if (checkEmail) {
            return {
                error: true,
                data: null,
                message: 'Email already exists'
            }
        }
        if (phone) {
            const checkPhone = await UserModel.findOne({
                where: {
                    phone,
                    id: {
                        [Op.ne]: id
                    }
                }
            });
            if (checkPhone) {
                return {
                    error: true,
                    data: null,
                    message: 'Phone already exists'
                }
            }
        }

        if (email) userExist.email = email;
        if (phone) userExist.phone = phone;
        if (full_name) userExist.full_name = full_name;
        await userExist.save();
        const {password: pass, ...userWithoutPassword} = userExist.dataValues;
        return {
            error: false,
            data: userWithoutPassword,
            message: 'Update user successfully'
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            data: null,
            message: error || error
        }
    }
}
const deleteUser = async (id) => {
    try {
        const userExist = await UserModel.findOne({
            where: {
                id
            }
        });
        if (!userExist) {
            return {
                error: true,
                data: null,
                message: 'User not found'
            }
        }
        await Promise.all([
            RoleUserModel.destroy({where: {user_id: id}}),
            CommentModel.destroy({where: {user_id: id}}),
            FavoriteModel.destroy({where: {user_id: id}}),
            WatchHistoryModel.destroy({where: {user_id: id}})
        ]);

        const deletedUser = await UserModel.destroy({where: {id}});
        if (!deletedUser) {
            return {
                error: true,
                data: null,
                message: 'Delete user failed'
            }
        }
        const {password: pass, ...userWithoutPassword} = userExist.dataValues;
        return {
            error: false,
            data: userWithoutPassword,
            message: 'Delete user successfully'
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: error || error
        }
    }
}
const getUserById = async (id) => {
    try {
        const userExist = await UserModel.findOne({
            where: {
                id
            }
        });
        if (!userExist) {
            return {
                error: true,
                data: null,
                message: 'User not found'
            }
        }
        const {password: pass, ...userWithoutPassword} = userExist.dataValues;
        return {
            error: false,
            data: userWithoutPassword,
            message: 'Get user by id successfully'
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: error || error
        }
    }
}
const changePassword = async (id, data) => {
    try {
        const {oldPassword, newPassword} = data;
        if (!oldPassword) {
            return {
                error: true,
                data: null,
                message: 'Old password is required'
            }
        }
        if (!newPassword) {
            return {
                error: true,
                data: null,
                message: 'New password is required'
            }
        }
        const userExist = await UserModel.findOne({
            where: {
                id
            }
        });
        if (!userExist) {
            return {
                error: true,
                data: null,
                message: 'User not found'
            }
        }
        const isMatch = await bcrypt.compare(oldPassword, userExist.password);
        if (!isMatch) {
            return {
                error: true,
                data: null,
                message: 'Old password incorrect'
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);
        const updatedUser = await UserModel.update({
            password: hashed
        }, {
            where: {
                id
            }
        });
        if (!updatedUser) {
            return {
                error: true,
                data: null,
                message: 'Change password failed'
            }
        }
        return {
            error: false,
            data: null,
            message: 'Change password successfully'
        }
    } catch (error) {
        return {
            error: true,
            data: null,
            message: error || error
        }
    }
}
module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    getAllUser,
    getUserById,
    changePassword
}