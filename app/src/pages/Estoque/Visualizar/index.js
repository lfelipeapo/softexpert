import { isNil } from "lodash";
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

  const formatData = (dataSql) => {
    if (!isNil(dataSql)) return dataSql.split("-").reverse().join("/");
  };

  useEffect(() => {
    const getEstoque = async () => {
      await fetch("http://localhost:8181/estoque/" + id)
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson.estoque);
        });
    };
    getEstoque();
  }, [id]);
  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Visualizar</Titulo>
        <BotaoAcao>
          <Link to="/estoque">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
      <ConteudoTip>ID: {data.id}</ConteudoTip>
      <hr />
      <ConteudoTip>Produto ID: {data.prod_id}</ConteudoTip>
      <hr />
      <ConteudoTip>Quantidade: {data.estoque_qtde}</ConteudoTip>
      <hr />
      <ConteudoTip>Data de Cadastro: {formatData(data.data_cad)}</ConteudoTip>
      <hr />
      <ConteudoTip>Data de Atualização: {formatData(data.data_at)}</ConteudoTip>
    </Container>
  );
};
