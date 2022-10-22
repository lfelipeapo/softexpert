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

  const getTiposProdutos = async () => {
    fetch("http://localhost:8181/tipos-produtos")
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.records));
  };

  const apagarTiposProduto = async (idTiposProduto) => {
    await fetch("http://localhost:8181/tipos-produtos/delete/" + idTiposProduto, {method: "DELETE"})
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
          getTiposProdutos();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Erro: Tipo não apagado, tente mais tarde",
        });
      });
  };

  useEffect(() => {
    getTiposProdutos();
  }, []);

  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Listar</Titulo>
        <BotaoAcao>
          <Link to="/tipos-produtos/cadastrar">
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
            <th>Id do Imposto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((tipos_produtos) => (
            <tr key={tipos_produtos.id}>
              <td>{tipos_produtos.id}</td>
              <td>{tipos_produtos.nome}</td>
              <td>{tipos_produtos.id_imposto}</td>
              <td>
                <Link to={"/tipos-produtos/visualizar/" + tipos_produtos.id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>
                <Link to={"/tipos-produtos/editar/" + tipos_produtos.id}>
                  <ButtonWarning>Editar</ButtonWarning>
                </Link>
                <ButtonDanger
                  onClick={() => apagarTiposProduto(tipos_produtos.id)}
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
