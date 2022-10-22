import { isNil } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonInfo,
  Titulo,
  ConteudoCli,
} from "./styles";

export const Visualizar = (props) => {
  const [data, setData] = useState([]);

  const [cli_id] = useState(props.match.params.id);

  const formatData = (dataSql) => {
    if (!isNil(dataSql)) return dataSql.split("-").reverse().join("/");
  };

  useEffect(() => {
    const getCliente = async () => {
      await fetch("http://localhost:8181/clientes/" + cli_id)
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson.cliente);
        });
    };
    getCliente();
  }, [cli_id]);
  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Visualizar</Titulo>
        <BotaoAcao>
          <Link to="/clientes">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
      <ConteudoCli>ID: {data.cli_id}</ConteudoCli>
      <hr />
      <ConteudoCli>Nome do Cliente: {data.cli_nome}</ConteudoCli>
      <hr />
      <ConteudoCli>Data do Cadastro: {formatData(data.data_cad)}</ConteudoCli>
      <hr />
      <ConteudoCli>Data da Atualização: {formatData(data.data_at)}</ConteudoCli>
    </Container>
  );
};
