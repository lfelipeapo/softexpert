import { isNil } from "lodash";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonSuccess,
  Table,
  Titulo,
  ButtonPrimary,
  ButtonDanger,
  AlertSuccess,
  AlertDanger,
} from "./styles";

export const Home = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

   const formatData = (dataSql) => {
     if (!isNil(dataSql)) return dataSql.split("-").reverse().join("/");
   };

  const getPedidos = async () => {
    fetch("http://localhost:8181/pedidos")
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.records));
  };

  const apagarPedido = async (idPedido) => {
    await fetch("http://localhost:8181/pedidos/delete/" + idPedido, {method: "DELETE"})
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.erro) {
          setStatus({
            type: "erro",
            mensagem: responseJson.mensagem,
          });
        } else {
          setStatus({
            type: "success",
            mensagem: responseJson.mensagem,
          });
          getPedidos();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Erro: Pedido não apagado, tente mais tarde",
        });
      });
  };

  useEffect(() => {
    getPedidos();
  }, []);

  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Listar Pedidos</Titulo>
        <BotaoAcao>
          <Link to="/carrinho">
            <ButtonSuccess>Comprar</ButtonSuccess>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>

      {status.type === "erro" ? (
        <AlertDanger>{status.mensagem}</AlertDanger>
      ) : (
        ""
      )}
      {status.type === "success" ? (
        <AlertSuccess>{status.mensagem}</AlertSuccess>
      ) : (
        ""
      )}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID do Cliente</th>
            <th>Valor do Pedido</th>
            <th>Quantidade do Pedido</th>
            <th>Data do Pedido</th>
            <th>Data do Pagamento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cli_id}</td>
              <td>{pedido.ped_valor}</td>
              <td>{pedido.ped_qtde}</td>
              <td>{formatData(pedido.data_ped)}</td>
              <td>{formatData(pedido.data_pg)}</td>
              <td>
                <Link to={"/pedidos/visualizar/" + pedido.id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>
                <ButtonDanger onClick={() => apagarPedido(pedido.id)}>
                  Apagar
                </ButtonDanger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
