const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const login = (async (req, res) => {
  const user = await User.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: {
      email: req.body.email
    }
  });
  if(user === null) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Usuário ou a senha incorreta."
    })
  }
  if(!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Usuário ou a senha incorreta."
    })
  }
  var token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: '1 day'
  })
  return res.json({
    erro: false,
    token
  })
});

module.exports = { findAll, save, get, update, remove, login };