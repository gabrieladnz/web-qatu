import cloudinary from '../config/cloudinary.js';

export const uploadBase64Image = async (base64) => {
  try {
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'qatu_products',  // opcional: cria pasta no Cloudinary
    });
    return result.secure_url;  // URL HTTPS segura da imagem
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error.message);
    throw new Error('Falha no upload da imagem');
  }
};
