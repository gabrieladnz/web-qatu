import UserModel from '../models/userModel.js';
import {loginUserService} from '../services/userService.js'

/**
 * Registra um novo usuário.
 *
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado com este email.' });
    }

    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao registrar usuário.', error: error.message });
  }
};

/**
 * Busca um único usuário pelo ID.
 * @function
 * @param {Object} req - Requisição com ID do usuário como param.
 * @param {Object} res - Retorna o usuário (sem a senha).
 */
export const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await UserModel.findById(id).select('-password');
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário.', error: error.message });
    }
  };
  

/**
 * Lista todos os usuários cadastrados (uso interno/admin).
 * @function
 * @param {Object} req - Requisição Express.
 * @param {Object} res - Resposta JSON com a lista de usuários.
 */
export const getAllUsers = async (req, res) => {
    try {
      const users = await UserModel.find().select('-password'); // oculta senha
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
    }
  };
  

/**
 * Atualiza os dados de um usuário existente.
 *
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
  }
};

/**
 * Redefine a senha de um usuário usando o e-mail.
 * @function
 * @param {Object} req - Requisição com email e nova senha.
 * @param {Object} res - Resposta JSON com sucesso ou erro.
 */
export const resetPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
  
      user.password = newPassword; // o pre('save') vai criptografar
      await user.save();
  
      res.status(200).json({ success: true, message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao redefinir senha.', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password} = req.body
    
    if(!email || !password)  {
        return res.status(400),json({ success: false, message: 'Senha ou email inválidos.' })
    }
    try{
        const{token, message} = await loginUserService( email, password);
        res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            token,
            message
        });
    }catch (error){
        res.status(error.status || 500).json({success: false, message: error.message})
    }
};
  
/**
 * @route PATCH /api/users/:id/become-seller
 * @desc Permite ao usuário virar um vendedor (isSeller = true)
 * @access Authenticated User (Owner)
 */
export const becomeSeller = async (req, res) => {
    try {
      const userId = req.userId; // do token
      const paramId = req.params.id;
  
      // Verifica se o usuário está tentando alterar a própria conta
      if (userId !== paramId) {
        return res.status(403).json({ 
          success: false,
          message: 'Acesso negado. Você só pode alterar sua própria conta.' 
        });
      }
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: 'Usuário não encontrado.' 
        });
      }
  
      // Atualiza para vendedor
      user.isSeller = true;
      await user.save();
  
      res.status(200).json({ 
        success: true,
        message: 'Parabéns! Agora sua conta é de vendedor.',
        user: { id: user._id, name: user.name, email: user.email, isSeller: user.isSeller }
      });
  
    } catch (err) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao atualizar para vendedor.',
        error: err.message 
      });
    }
  };