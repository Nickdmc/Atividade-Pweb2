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

app.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.destroy({ where: { id } });

    if (deletedCategory) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover categoria' });
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

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.destroy({ where: { id } });

    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover produto' });
  }
});

app.listen(3000, () => {
  console.log('Servidor ta rodando na porta 3000');
});

