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

  const convertReal = (number) => {
    const options = {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    };
    const formatNumber = new Intl.NumberFormat("pt-BR", options);
    return formatNumber.format(number);
  };

  const formatData = (dataSql) => {
    if (!isNil(dataSql)) return dataSql.split("-").reverse().join("/");
  };

  const getProdutos = async () => {
    fetch("http://localhost:8181/produtos")
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.records));
  };

  const apagarProduto = async (idProduto) => {
    await fetch("http://localhost:8181/produtos/delete/" + idProduto, {method: "DELETE"})
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
          getProdutos();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Erro: Produto não apagado, tente mais tarde",
        });
      });
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Listar</Titulo>
        <BotaoAcao>
          <Link to="/produtos/cadastrar">
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
            <th>Preço</th>
            <th>Id dos Tipos do Produto</th>
            <th>Data de Cadastro</th>
            <th>Data de Atualização</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{convertReal(produto.preco, produto.preco)}</td>
              <td>{produto.id_tipo_produto}</td>
              <td>{formatData(produto.data_cad)}</td>
              <td>{formatData(produto.data_at)}</td>
              <td>
                <Link to={"/produtos/visualizar/" + produto.id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>
                <Link to={"/produtos/editar/" + produto.id}>
                  <ButtonWarning>Editar</ButtonWarning>
                </Link>
                <ButtonDanger onClick={() => apagarProduto(produto.id)}>
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
