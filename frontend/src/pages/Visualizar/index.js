import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import { Link } from 'react-router-dom';
import {
  Container,
  ConteudoTitulo,
  Titulo, BotaoAcao,
  ButtonInfo,
  ButtonWarning,
  ConteudoView,
  Hr
} from "../../styles/custom_adm";

export const Visualizar = (props) => {

  const [id] = useState(props.match.params.id);
  const [data, setData] = useState("");

  useEffect(() => {

    const getProdutos = async () => {
      setData({
        id: 1,
        nome: "Teclado",
        valor: 120.50,
        quantidade: 30
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
      <Hr />
      <ConteudoView>ID: {data.id}</ConteudoView>
      <ConteudoView>Nome: {data.nome}</ConteudoView>
      <ConteudoView>Valor: {data.valor}</ConteudoView>
      <ConteudoView>Quantidade: {data.quantidade}</ConteudoView>
    </Container>
  );
}