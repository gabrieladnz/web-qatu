import Product from '../models/productModel.js';

/**
 * @file Controlador para operações com produtos.
 * @module controllers/productController
 */

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar produto', error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
    try {
      const { category, search } = req.query;
  
      // Filtro dinâmico
      const filters = {};
  
      if (category) {
        filters.category = category;
      }
  
      if (search) {
        filters.title = { $regex: search, $options: 'i' }; // busca insensível a maiúsculas/minúsculas
      }
  
      const products = await Product.find(filters);
  
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
  
      res.status(200).json(productsWithAverage);
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
  