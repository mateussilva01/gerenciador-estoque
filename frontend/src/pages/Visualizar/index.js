import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import { Link, Redirect } from 'react-router-dom';
import {
  Container,
  ConteudoTitulo,
  Titulo, BotaoAcao,
  ButtonInfo,
  ButtonWarning,
  ConteudoView,
  Hr
} from "../../styles/custom_adm";
import api from '../../config/configApi';

export const Visualizar = (props) => {

  const [id] = useState(props.match.params.id);
  const [data, setData] = useState("");
  const [status, setStatus ] = useState({
    type: "",
    mensagem: ""
  });

  useEffect(() => {
    const getProdutos = async () => {
      await api.get('/produto/' + id)
      .then((response) => {
        console.log(response);
        setData(response.data.produto);
      }).catch((err) => {
        if(err.response) {
          setStatus({
            type: "redErro",
            mensagem: err.response.data.mensagem
          })
        } else {
          setStatus({
            type: "redErro",
            mensagem: "Erro: Tente mais tarde."
          })
        }
      })
    }
    getProdutos();
  },[id])

  return (
    <Container>
      <Menu />
      <ConteudoTitulo>
        <Titulo>Visualizar</Titulo>
        <BotaoAcao>
          <Link to="/listar">
              <ButtonInfo type="button">Listar</ButtonInfo>
          </Link>{" "}
          <Link to={"/editar/" + data.id}>
              <ButtonWarning type="button">Editar</ButtonWarning>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
      { status.type === 'redErro' ? <Redirect to={{
          pathname: "/listar",
          state: {
            type: "erro",
            mensagem: status.mensagem
          }
        }} /> : ""
      }
      <Hr />
      <ConteudoView>ID: {data.id}</ConteudoView>
      <ConteudoView>Nome: {data.nome}</ConteudoView>
      <ConteudoView>
        Preço de compra: {
          new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }).format(data.preco_compra)}
      </ConteudoView>
      <ConteudoView>
        Preço de venda: {
          new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }).format(data.preco_venda)}
      </ConteudoView>
      <ConteudoView>Quantidade: {data.quantidade}</ConteudoView>
    </Container>
  );
}