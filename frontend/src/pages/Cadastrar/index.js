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

  const [precoCompraTarget, setPrecoCompraTarget] = useState();
  const [precoVendaTarget, setPrecoVendaTarget] = useState();

  const valueInput = e => setProduto({ ...produto, [e.target.name]: e.target.value});

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const addProduto = async e => {
    e.preventDefault();

    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }

    await api.post('/produto', produto, headers)
    .then((response) => {
      setStatus({
        type: 'redSuccess',
        mensagem: response.data.mensagem
      });
    }).catch((err) => {
      if(err.response) {
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem
        });
      } else {
          setStatus({
            type: 'error',
            mensagem: "Erro: Tente mais tarde."
          });
        }
    })

  }

  const valuePrecoCompra = async e => {
     //Formato para visualização
    var valorPrecoCompraInput = e.target.value;
    valorPrecoCompraInput = valorPrecoCompraInput.replace(/\D/g, "");
    valorPrecoCompraInput = valorPrecoCompraInput.replace(/(\d)(\d{2})$/, "$1,$2");
    valorPrecoCompraInput = valorPrecoCompraInput.replace(/(?=(\d{3})+(\D))\B/g, ".");
    setPrecoCompraTarget(valorPrecoCompraInput);

    //Formato para salvar no banco
    var precoCompraSalvar  = await valorPrecoCompraInput.replace(".", "");
    precoCompraSalvar = await precoCompraSalvar.replace(",", ".");
    setProduto({ ...produto, preco_compra: precoCompraSalvar });
  }

  const valuePrecoVenda = async e => {
     //Formato para visualização
    var precoVendaInput = e.target.value;
    precoVendaInput = precoVendaInput.replace(/\D/g, "");
    precoVendaInput = precoVendaInput.replace(/(\d)(\d{2})$/, "$1,$2");
    precoVendaInput = precoVendaInput.replace(/(?=(\d{3})+(\D))\B/g, ".");
    setPrecoVendaTarget(precoVendaInput);

    //Formato para salvar no banco
    var precoSalvarSalvar  = await precoVendaInput.replace(".", "");
    precoSalvarSalvar = await precoSalvarSalvar.replace(",", ".");
    setProduto({ ...produto, preco_venda: precoSalvarSalvar });
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
      { status.type === 'redSuccess' ? <Redirect to={{
          pathname: "/listar",
          state: {
            type: "success",
            mensagem: status.mensagem
          }
        }} /> : ""
      }
      <Hr />
      <Form onSubmit={addProduto}>
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
          name="precoCompraTarget"
          placeholder="Preço de compra"
          value={precoCompraTarget}
          onChange={valuePrecoCompra}
        />
        <Label>Preço de venda: </Label>
        <Input
          type="text"
          name="precoVendaTarget"
          placeholder="Preço de venda"
          value={precoVendaTarget}
          onChange={valuePrecoVenda}
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