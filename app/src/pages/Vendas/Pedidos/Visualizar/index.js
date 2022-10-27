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
    const getPedido = async () => {
      await fetch("http://localhost:8181/pedidos/" + id)
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson.pedidos);
        });
    };
    getPedido();
  }, [id]);
  return (
    <>
      <Container className="principal">
        <ConteudoTitulo>
          <Titulo>Visualizar Pedido {id}</Titulo>
          <BotaoAcao>
            <Link to="/pedidos">
              <ButtonInfo>Listar</ButtonInfo>
            </Link>
          </BotaoAcao>
          <BotaoAcao>
            <Link to={"/pedidos/visualizar/" + id + "/itens"}>
              <ButtonInfo>Listar Itens</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>
        <ConteudoTip>ID: {data.id}</ConteudoTip>
        <hr />
        <ConteudoTip>ID do Cliente: {data.cli_id}</ConteudoTip>
        <hr />
        <ConteudoTip>Total do Pedido: {data.ped_valor}</ConteudoTip>
        <hr />
        <ConteudoTip>Quantidade Total: {data.ped_qtde}</ConteudoTip>
        <hr />
        <ConteudoTip>Data do Pedido: {formatData(data.data_ped)}</ConteudoTip>
        <hr />
        <ConteudoTip>Data do Pagamento: {formatData(data.data_pg)}</ConteudoTip>
        <hr />
      </Container>
    </>
  );
};
