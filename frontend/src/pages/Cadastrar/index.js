import React, { useState } from 'react';
import { Menu } from '../../components/Menu';
import { Link, Redirect } from 'react-router-dom';
import {
  Container,
  ConteudoTitulo,
  Titulo, BotaoAcao,
  ButtonInfo,
  ButtonSuccess,
  AlertSuccess,
  AlertDanger,
  Form,
  Label,
  Input,
  Hr
} from '../../styles/custom_adm';
import api from '../../config/configApi';

export const Cadastrar = () => {
  const [produto, setProduto] = useState({
    nome: '',
    preco_compra: '',
    preco_venda: '',
    quantidade: ''
  });
  const [precoCompra, setPrecoCompra] = useState();
  const [precoVenda, setPrecoVenda] = useState();
  const valueInput = e => setProduto({ ...produto, [e.target.name]: e.target.value });
  const [status, setStatus] = useState({ type: '', mensagem: '' });

  const gravar = async e => {
    e.preventDefault();
    const headers = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    await api.post('/produto', produto, headers)
    .then((response) => {
      setStatus({ type: 'redirectSuccess', mensagem: response.data.mensagem });
    }).catch((error) => {
      if (error.response)
        setStatus({ type: 'error', mensagem: error.response.data.mensagem });
      setStatus({ type: 'error', mensagem: "Error: Tente mais tarde." });
    })
  }

  const formatarPrecoCompra = async e => {
    var valor = e.target.value;
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d)(\d{2})$/, "$1,$2");
    valor = valor.replace(/(?=(\d{3})+(\D))\B/g, ".");
    setPrecoCompra(valor);
    var novoValor  = await valor.replace(".", "");
    novoValor = await novoValor.replace(",", ".");
    setProduto({ ...produto, preco_compra: novoValor });
  }

  const formatarPrecoVenda = async e => {
    var valor = e.target.value;
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d)(\d{2})$/, "$1,$2");
    valor = valor.replace(/(?=(\d{3})+(\D))\B/g, ".");
    setPrecoVenda(valor);
    var novoValor  = await valor.replace(".", "");
    novoValor = await novoValor.replace(",", ".");
    setProduto({ ...produto, preco_venda: novoValor });
  }

  return (
    <Container>
      <Menu />
      <ConteudoTitulo>
        <Titulo>Cadastrar</Titulo>
        <BotaoAcao>
          <Link to="/listar">
              <ButtonInfo type="button">Listar</ButtonInfo>
          </Link>{" "}
        </BotaoAcao>
      </ConteudoTitulo>
      { status.type === 'error' ? <AlertDanger>{status.mensagem}</AlertDanger> : "" }
      { status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : "" }
      { status.type === 'redirectSuccess' ? <Redirect to={{
          pathname: "/listar",
          state: {
            type: "success",
            mensagem: status.mensagem
          }
        }} /> : ""
      }
      <Hr />
      <Form onSubmit={gravar}>
        <Label>Nome: </Label>
        <Input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          onChange={valueInput}
        />
        <Label>Preço de compra: </Label>
        <Input
          type="text"
          name="precoCompra"
          placeholder="Preço de compra"
          value={precoCompra}
          onChange={formatarPrecoCompra}
        />
        <Label>Preço de venda: </Label>
        <Input
          type="text"
          name="precoVenda"
          placeholder="Preço de venda"
          value={precoVenda}
          onChange={formatarPrecoVenda}
        />
        <Label>Quantidade: </Label>
        <Input
          type="number"
          name="quantidade"
          placeholder="Quantidade do produto"
          onChange={valueInput}
        />
        <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
      </Form>
    </Container>
  );
}