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

export const Cadastrar = () => {

  const [produto, setProduto] = useState({
    nome: '',
    valor: '',
    quantidade: ''
  });

  const valueInput = e => setProduto({ ...produto, [e.target.name]: e.target.value});

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const addProduto = async e => {
    e.preventDefault();
    setStatus({
      type: 'error',
      mensagem: 'Erro: produto não cadastrado com sucesso.'
    });
    // setStatus({
    //   type: 'success',
    //   mensagem: 'Produto cadastrado com sucesso.'
    // });
    // setStatus({
    //   type: 'redSuccess',
    //   mensagem: 'Produto cadastrado com sucesso.'
    // });
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
        <Label>Preço: </Label>
        <Input
          type="text"
          name="valor"
          placeholder="Preço do produto"
          onChange={valueInput}
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