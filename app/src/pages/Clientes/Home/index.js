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

  const getClientes = async () => {
    fetch("http://localhost:8181/clientes")
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.records));
  };

  const apagarCliente = async (idCliente) => {
    //console.log(idCliente);
    await fetch("http://localhost:8181/clientes/delete/" + idCliente, {
      method: "DELETE",
    })
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
          getClientes();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Erro: Cliente não apagado, tente mais tarde",
        });
      });
  };

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Listar</Titulo>
        <BotaoAcao>
          <Link to="/clientes/cadastrar">
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
            <th>Nome</th>
            <th>Data de Cadastro</th>
            <th>Data da Atualização</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((cliente) => (
            <tr key={cliente.cli_id}>
              <td>{cliente.cli_id}</td>
              <td>{cliente.cli_nome}</td>
              <td>{cliente.data_cad}</td>
              <td>{cliente.data_at}</td>
              <td>
                <Link to={"/clientes/visualizar/" + cliente.cli_id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>
                <Link to={"/clientes/editar/" + cliente.cli_id}>
                  <ButtonWarning>Editar</ButtonWarning>
                </Link>
                <ButtonDanger onClick={() => apagarCliente(cliente.cli_id)}>
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
