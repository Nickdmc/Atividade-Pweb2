const express = require('express');
const app = express();
const { Product, Category } = require('./models');


app.use(express.json());


app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});


app.post('/categories', async (req, res) => {
  try {
    const { name } = req.body; 
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});


app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});


app.post('/products', async (req, res) => {
  try {
    const { name, price, categoryId } = req.body; 
    const newProduct = await Product.create({ name, price, categoryId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});


app.listen(3000, () => {
  console.log('Servidor ta rodando na porta 3000');
});
