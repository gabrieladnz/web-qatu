import mongoose from 'mongoose';

/**
 * Conecta com o banco de dados MongoDB usando URI do .env
 * @function
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,);
    console.log(`MongoDB conectado: ${conn.connection.name}`);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Encerra o processo com falha
  }
};

export default connectDB;
