const Usuario = require('../model/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const findAll = (async (req, res) => {
  await Usuario.findAll({
    attributes: ['id', 'name', 'email'],
    order: [['id', 'DESC']]
  })
  .then((usuarios) => {
    return res.json({
      erro: false,
      usuarios
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
  await Usuario.create(dados)
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
  await Usuario.findByPk(id)
  .then((usuario) => {
    return res.json({
      erro: false,
      usuario
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
  await Usuario.update(dados, { where: {id} })
  .then(() => {
    return res.json({
      erro: false,
      mensagem: 'Usuário editado com sucesso.'
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      message: 'Não foi possível fazer a edição.'
    });
  });
});

const remove = (async (req, res) => {
  const { id } = req.params;
  await Usuario.destroy({ where: { id } })
  .then(() => {
    return res.json({
      erro: false,
      mensagem: 'Usuário excluído com sucesso.'
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: 'Não foi possível excluir o usuário.'
    });
  });
});

const login = (async (req, res) => {
  const usuario = await Usuario.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: {
      email: req.body.email
    }
  });
  if(usuario === null) {
    return res.status(400).json({
      erro: true,
      mensagem: 'Erro: Usuário ou a senha incorreta.'
    })
  }
  if(!(await bcrypt.compare(req.body.password, usuario.password))) {
    return res.status(400).json({
      erro: true,
      mensagem: 'Erro: Usuário ou a senha incorreta.'
    })
  }
  var token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
    expiresIn: '1 day'
  })
  return res.json({
    erro: false,
    token
  })
});

const validateToken = async (req, res) => {
  await Usuario.findByPk(req.usuarioId, { attributes: ['id', 'name', 'email'] })
  .then((usuario) => {
    return res.json({
      erro: false,
      usuario
    });
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: 'Erro: Necessário realizar o login para acessar a página.' 
    })
  })
};

module.exports = { findAll, save, get, update, remove, login, validateToken };