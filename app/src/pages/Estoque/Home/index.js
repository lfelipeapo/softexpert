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

  const getImpostos = async () => {
    fetch("http://localhost:8181/impostos")
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.records));
  };

  const apagarImposto = async (idImposto) => {
    //console.log(idImposto);
    await fetch("http://localhost:8181/impostos/delete/" + idImposto)
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
          getImpostos();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Erro: Imposto não apagado, tente mais tarde",
        });
      });
  };

  useEffect(() => {
    getImpostos();
  }, []);

  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Listar</Titulo>
        <BotaoAcao>
          <Link to="/impostos/cadastrar">
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
            <th>Percentual</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((imposto) => (
            <tr key={imposto.id}>
              <td>{imposto.id}</td>
              <td>{imposto.percentual}%</td>
              <td>
                <Link to={"/impostos/visualizar/" + imposto.id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>
                <Link to={"/impostos/editar/" + imposto.id}>
                  <ButtonWarning>Editar</ButtonWarning>
                </Link>
                <ButtonDanger onClick={() => apagarImposto(imposto.id)}>
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
