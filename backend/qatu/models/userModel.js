import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Schema do usuário contendo nome, email e senha criptografada.
 */
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'seller'], default: 'buyer'},
  isSeller: { type: Boolean, default: false}
}, {
});

/**
 * Middleware para criptografar a senha antes de salvar no banco.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
