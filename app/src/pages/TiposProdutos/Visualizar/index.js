import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonInfo,
  Titulo,
  ConteudoTip,
} from "./styles";

export const Visualizar = (props) => {
  const [data, setData] = useState([]);

  const [id] = useState(props.match.params.id);

  useEffect(() => {
    const getTiposto = async () => {
      await fetch("http://localhost:8181/tipos-produtos/" + id)
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson.tipos_produtos);
        });
    };
    getTiposto();
  }, [id]);
  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Visualizar</Titulo>
        <BotaoAcao>
          <Link to="/tipos-produtos">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
      <ConteudoTip>ID: {data.id}</ConteudoTip>
      <ConteudoTip>Nome: {data.nome}</ConteudoTip>
      <ConteudoTip>ID do Imposto: {data.id_imposto}</ConteudoTip>
      <ConteudoTip>Data de Cadastro: {data.data_cad}</ConteudoTip>
      <ConteudoTip>Data de Atualização: {data.data_at}</ConteudoTip>
    </Container>
  );
};
