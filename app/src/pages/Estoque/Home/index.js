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
  ButtonWarning,
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

  const getEstoque = async () => {
    fetch("http://localhost:8181/estoque")
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.records));
  };

  const apagarEstoque = async (idEstoque) => {
    await fetch("http://localhost:8181/estoque/delete/" + idEstoque, {method: "DELETE"})
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
          getEstoque();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Erro: Estoque não apagado, tente mais tarde",
        });
      });
  };

  useEffect(() => {
    getEstoque();
  }, []);

  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Listar</Titulo>
        <BotaoAcao>
          <Link to="/estoque/cadastrar">
            <ButtonSuccess>Cadastrar</ButtonSuccess>
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
            <th>Produto ID</th>
            <th>Quantidade</th>
            <th>Data do Cadastro</th>
            <th>Data da Atualização</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((estoque) => (
            <tr key={estoque.id}>
              <td>{estoque.id}</td>
              <td>{estoque.prod_id}</td>
              <td>{estoque.estoque_qtde}</td>
              <td>{formatData(estoque.data_cad)}</td>
              <td>{formatData(estoque.data_at)}</td>
              <td>
                <Link to={"/estoque/visualizar/" + estoque.id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>
                <Link to={"/estoque/editar/" + estoque.id}>
                  <ButtonWarning>Editar</ButtonWarning>
                </Link>
                <ButtonDanger
                  onClick={() => apagarEstoque(estoque.id)}
                >
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
