import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const loginUserService = async (email, password) => {
    const user = await UserModel.findOne({email});
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw {status: 401, message: 'Senha inválida'};
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {
        token,
        message: "Bom te ver de novo " + user.name,
        _id: user._id,
    }
}