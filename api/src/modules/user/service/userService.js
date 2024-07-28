const User = require('../model/User');
const bcrypt = require('bcryptjs');

const findAll = (async (req, res) => {
  await User.findAll({
    attributes: ['id', 'name', 'email'],
    order: [['id', 'DESC']]
  })
  .then((users) => {
    return res.json({
      erro: false,
      users
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: 'Nenhum usuário encontrado.'
    });
  });
});

const save = (async (req, res) => {
  var dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);
  await User.create(dados)
  .then(() => {
    return res.json({
      erro: false,
      mensagem: 'Usuário cadastrado com sucesso.'
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: 'Não foi possível cadastrar o usuário.'
    });
  });
});

const get = (async (req, res) => {
  const { id } = req.params;
  await User.findByPk(id)
  .then((user) => {
    return res.json({
      erro: false,
      user
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: 'Nenhum usuário encontrado.'
    });
  });
});

const update = (async (req, res) => {
  const { id } = req.body;
  const dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);
  await User.update(dados, { where: {id} })
  .then(() => {
    return res.json({
      erro: false,
      mensagem: "Usuário editado com sucesso."
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
  await User.destroy({ where: { id } })
  .then(() => {
    return res.json({
      erro: false,
      mensagem: "Usuário excluído com sucesso."
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: "Não foi possível excluir o usuário."
    });
  });
});

module.exports = { findAll, save, get, update, remove };