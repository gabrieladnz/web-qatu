import Product from '../models/productModel.js';
import { uploadBase64Image } from '../utils/uploadImage.js';

/**
 * @file Controlador para operações com produtos.
 * @module controllers/productController
 */

export const createProduct = async (req, res) => {
  try {
    const { image, ...otherData } = req.body;

    let imageUrl = image;
    if (image && image.startsWith('data:')) {
      imageUrl = await uploadBase64Image(image);
    }

    const newProduct = new Product({
      ...otherData,
      image: imageUrl,
      seller: req.userId
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar produto', error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
    try {  
      const { category, search, minPrice, maxPrice, sort, page = 1} = req.query;
      const limit = 8;
      // Filtro dinâmico
      const filters = {};
      // Ordenação
      const sortOptions = {};
  
      if (category) { filters.category = category;}
      if (minPrice) { filters.price = { ...filters.price, $gte: Number(minPrice) }; }
      if (maxPrice) { filters.price = { ...filters.price, $lte: Number(maxPrice) }; }
      if (sort === 'asc') { sortOptions.price = 1; }
      if (sort === 'desc') { sortOptions.price = -1; }
      if (!sort) { sortOptions.stock = -1; } // Padrão: ordenar por estoque decrescente

      if (search) {
        filters.title = { $regex: search, $options: 'i' }; // busca insensível a maiúsculas/minúsculas
      }

      const skip = (Number(page - 1)) * Number(limit);
  
      const products = await Product.find(filters)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit));

      // 
      const totalProducts = await Product.countDocuments(filters);
  
      const productsWithAverage = products.map((product) => {
        const ratings = product.ratings || [];
        const average = ratings.length
          ? ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length
          : null;
  
        return {
          ...product.toObject(),
          averageRating: average
        };
      });
  
      res.status(200).json({
        productsWithAverage,
        pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        }});
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar produtos', error: err.message });
    }
  };
  
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

    const ratings = product.ratings || [];
    const average = ratings.length
      ? ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length
      : null;

    const productWithAverage = {
      ...product.toObject(),
      averageRating: average
    };

    res.status(200).json(productWithAverage);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produto', error: err.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar produto', error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar produto', error: err.message });
  }
};

export const addProductReview = async (req, res) => {
    try {
      const { id } = req.params;
      const { score, comment } = req.body;
  
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
  
      product.ratings.push({ score, comment });
      await product.save();
  
      res.status(201).json({ message: 'Avaliação adicionada com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao adicionar avaliação', error: err.message });
    }
  };
  