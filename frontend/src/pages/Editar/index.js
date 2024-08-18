import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import { Link, Redirect } from 'react-router-dom';
import {
  Container,
  ConteudoTitulo,
  Titulo, BotaoAcao,
  ButtonInfo,
  Form,
  Label,
  Input,
  AlertSuccess,
  AlertDanger,
  Hr,
  ButtonPrimary,
  ButtonWarning
} from '../../styles/custom_adm';
import api from '../../config/configApi';

export const Editar = (props) => {
  const [id] = useState(props.match.params.id);
  const [nome, setNome] = useState("");
  const [preco_compra, setPrecoCompra] = useState("");
  const [preco_venda, setPrecoVenda] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoCompra, setPrecoCompraTarget] = useState();
  const [precoVendaTarget, setPrecoVendaTarget] = useState();
  const [status, setStatus ] = useState({ type: "", mensagem: "" });

  const editar = async e  => {
    e.preventDefault();
    const headers = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    await api.put("/produto", {id, nome, preco_compra, preco_venda, quantidade}, headers)
    .then((response) => {
      setStatus({ type: 'redirectSuccess', mensagem: response.data.mensagem });
    }).catch((error) => {
      if (error.response)
        setStatus({ type: 'error', mensagem: error.response.data.mensagem });
      setStatus({ type: 'error', mensagem: "Erro: Tente mais tarde." });
    });
  };

  useEffect(() => {
    const selecionar = async () => {
      const headers = {
        'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      }
      await api.get('/produto/' + id, headers).then((response) => {
        setNome(response.data.produto.nome);
        setPrecoCompra(response.data.produto.preco_compra);
        setPrecoCompraTarget(new Intl.NumberFormat('pt-BR',
        {
          minimumFractionDigits: 2,
          currency: 'BRL'
        }).format(response.data.produto.preco_compra));

        setPrecoVenda(response.data.produto.preco_venda);
        setPrecoVendaTarget(new Intl.NumberFormat('pt-BR',
        {
          minimumFractionDigits: 2,
          currency: 'BRL'
        }).format(response.data.produto.preco_venda));

        setQuantidade(response.data.produto.quantidade);
      }).catch((error) => {
        if (error.response)
          setStatus({ type: "redErro", mensagem: error.response.data.mensagem })
        setStatus({ type: "redErro", mensagem: "Erro: Tente mais tarde." })
      });
    }
    selecionar();
  }, [id]);

  const formatarPrecoCompra = async (valor) => {
    var conversao = valor.toString().replace(/\D/g, "");
    conversao = conversao.replace(/(\d)(\d{2})$/, "$1,$2");
    conversao = conversao.replace(/(?=(\d{3})+(\D))\B/g, ".");
    setPrecoCompraTarget(conversao);
    var novoValor = await conversao.replace(".", "");
    novoValor = await novoValor.replace(",",".");
    setPrecoCompra(novoValor);
  }

  const formatarPrecoVenda = async (valor) => {
    var conversao = valor.toString().replace(/\D/g, "");
    conversao = conversao.replace(/(\d)(\d{2})$/, "$1,$2");
    conversao = conversao.replace(/(?=(\d{3})+(\D))\B/g, ".");
    setPrecoVendaTarget(conversao);
    var novoValor = await conversao.replace(".", "");
    novoValor = await novoValor.replace(",",".");
    setPrecoVenda(novoValor);
  }

  return (
    <Container>
      <Menu />
      <ConteudoTitulo>
        <Titulo>Editar</Titulo>
        <BotaoAcao>
          <Link to="/listar">
              <ButtonInfo type="button">Listar</ButtonInfo>
          </Link>{" "}
          <Link to={"/visualizar/" + id}>
              <ButtonPrimary type="button">Visualizar</ButtonPrimary>
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
      <Form onSubmit={editar}>
        <Label>Nome: </Label>
        <Input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          value={ nome }
          onChange={e => setNome(e.target.value)}
        />
        <Label>Preço de compra: </Label>
        <Input
          type="text"
          name="precoCompra"
          placeholder="Preço de compra"
          value={ precoCompra }
          onChange={e => formatarPrecoCompra(e.target.value)}
        />
        <Label>Preço de venda: </Label>
        <Input
          type="text"
          name="precoVendaTarget"
          placeholder="Preço de venda"
          value={ precoVendaTarget }
          onChange={e => formatarPrecoVenda(e.target.value)}
        />
        <Label>Quantidade: </Label>
        <Input
          type="number"
          name="quantidade"
          placeholder="Quantidade do produto"
          value={ quantidade }
          onChange={e => setQuantidade(e.target.value)}
        />
        <ButtonWarning type="submit">Salvar</ButtonWarning>
      </Form>
    </Container>
  );
}