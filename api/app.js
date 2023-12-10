const express = require('express');
const app = express();

app.use(express.json());

const Produto = require('./models/Produto');

app.get("/list-produto", async (req, res) => {
  await Produto.findAll({
    attributes: ['id', 'nome', 'preco_compra', 'preco_venda', 'quantidade'],
    order: [['id', 'DESC']]
  })
  .then((produtos) => {
    return res.json({
      erro: false,
      produtos
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      message: 'Nenhum produto encontrado.'
    });
  });
});

app.post("/cad-produto", async (req, res) => {
  await Produto.create(req.body)
  .then(() => {
    return res.json({
      erro: false,
      message: 'Produto cadastrado com sucesso.'
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      message: 'Não foi possível cadastrar o produto.'
    });
  });
});

app.get("/view-produto/:id", async (req, res) => {
  const { id } = req.params;
  await Produto.findByPk(id)
  .then((produto) => {
    return res.json({
      erro: false,
      produto
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      message: 'Nenhum produto encontrado.'
    });
  });
});

app.put("/edit-produto", async (req, res) => {
  const { id } = req.body;
  await Produto.update(req.body, {where: {id}})
  .then(() => {
    return res.json({
      erro: false,
      message: "Produto editado com sucesso."
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      message: "Não foi possível fazer a edição."
    });
  });
});

app.delete("/delete-produto/:id", async (req, res) => {
  const { id } = req.params;
  await Produto.destroy({where: {id}})
  .then(() => {
    return res.json({
      erro: false,
      message: "Produto excluído com sucesso."
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      message: "Não foi possível excluir o produto."
    });
  });
});

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});