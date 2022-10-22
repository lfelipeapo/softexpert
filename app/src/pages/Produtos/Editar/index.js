import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoForm,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  ButtonInfo,
  AlertSuccess,
  AlertDanger,
  Form,
  Label,
  Input,
  ButtonSuccess,
  Select,
} from "./styles";

export const Editar = (props) => {
  const date = new Date().toJSON().slice(0, 10);
  const id = props.match.params.id;
  const [produtos, setProdutos] = useState({
    id: id,
    nome: "",
    preco: "",
    id_tipo_produto: "",
    date_cad: "",
    date_at: "",
  });

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valorNome = (e) =>
    setProdutos({ ...produtos, [e.target.name]: e.target.value });
  
  const valorPreco = (e) =>
    setProdutos({ ...produtos, [e.target.name]: e.target.value });

  const valorSelect = (e) =>
    setProdutos({ ...produtos, [e.target.name]: e.target.value });

  const getTiposProdutos = useCallback(async () => {
    fetch("http://localhost:8181/tipos-produtos")
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.records);
      });
  }, []);

  const edProdutos = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8181/produtos/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ produtos: produtos }),
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
          getTiposProdutos();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Produto não cadastro com sucesso, tente mais tarde!",
        });
      });
  };

  const getProduto = useCallback(async () => {
    await fetch("http://localhost:8181/produtos/" + id)
      .then((response) => response.json())
      .then((responseJson) => {
        setProdutos({
          id: id,
          nome: responseJson.produtos.nome,
          preco: responseJson.produtos.preco,
          id_tipo_produto: responseJson.produtos.id_tipo_produto,
          data_cad: responseJson.produtos.data_cad,
          data_at: date,
        });
      });
  }, [date, id]);

  useEffect(getProduto, [id, date, getProduto]);

  useEffect(getTiposProdutos, [getTiposProdutos]);

  return (
    <Container className="principal">
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Editar</Titulo>
          <BotaoAcao>
            <Link to="/produtos">
              <ButtonInfo>Listar</ButtonInfo>
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

        <Form onSubmit={edProdutos}>
          <Label>Nome do Produto: </Label>
          <Input
            type="text"
            name="nome"
            value={produtos.nome}
            placeholder="Produto"
            onChange={valorNome}
          />

          <Label>Preço: </Label>
          <Input
            type="text"
            name="preco"
            value={produtos.preco}
            placeholder="Preço do Produto"
            onChange={valorPreco}
          />

          <Label>Produto: </Label>
          <Select
            name="id_tipo_produto"
            onChange={valorSelect}
            value={produtos.id_tipo_produto}
          >
            {Object.values(data).map((tipo_produto) => (
              <option key={tipo_produto.id} value={tipo_produto.id}>
                {tipo_produto.nome}
              </option>
            ))}
          </Select>

          <ButtonSuccess type="submit">Editar</ButtonSuccess>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
