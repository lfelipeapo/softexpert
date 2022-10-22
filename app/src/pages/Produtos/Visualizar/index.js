import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonInfo,
  Titulo,
  ConteudoProduto,
} from "./styles";

export const Visualizar = (props) => {
  const [data, setData] = useState([]);

  const [id] = useState(props.match.params.id);

  useEffect(() => {
    const getProduto = async () => {
      await fetch("http://localhost:8181/produtos/" + id)
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson.produtos);
        });
    };
    getProduto();
  }, [id]);
  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Visualizar</Titulo>
        <BotaoAcao>
          <Link to="/produtos">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
      <ConteudoProduto>ID: {data.id}</ConteudoProduto>
      <hr />
      <ConteudoProduto>Nome: {data.nome}</ConteudoProduto>
      <hr />
      <ConteudoProduto>Preço: {data.preco}</ConteudoProduto>
      <hr />
      <ConteudoProduto>
        ID do Tipo do Produto: {data.id_tipo_produto}
      </ConteudoProduto>
      <hr />
      <ConteudoProduto>Data de Cadastro: {data.data_cad}</ConteudoProduto>
      <hr />
      <ConteudoProduto>Data de Atualização: {data.data_at}</ConteudoProduto>
      
    </Container>
  );
};
