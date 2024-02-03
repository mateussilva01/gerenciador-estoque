const Produto = require('../model/produtoModel');

const findAll = (async (req, res) => {
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
      mensagem: 'Nenhum produto encontrado.'
    });
  });
});

const save = (async (req, res) => {
  await Produto.create(req.body)
  .then(() => {
    return res.json({
      erro: false,
      mensagem: 'Produto cadastrado com sucesso.'
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: 'Não foi possível cadastrar o produto.'
    });
  });
});

const get = (async (req, res) => {
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
      mensagem: 'Nenhum produto encontrado.'
    });
  });
});

const update = (async (req, res) => {
  const { id } = req.body;
  await Produto.update(req.body, {where: {id}})
  .then(() => {
    return res.json({
      erro: false,
      mensagem: "Produto editado com sucesso."
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      message: "Não foi possível fazer a edição."
    });
  });
});

const remove = (async (req, res) => {
  const { id } = req.params;
  await Produto.destroy({where: {id}})
  .then(() => {
    return res.json({
      erro: false,
      mensagem: "Produto excluído com sucesso."
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: "Não foi possível excluir o produto."
    });
  });
});

module.exports = {findAll, save, get, update, remove};