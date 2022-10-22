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

export const Cadastrar = () => {
  const date = new Date().toJSON().slice(0, 10);

  const [produtos, setProdutos] = useState({
    id: "",
    nome: "",
    preco: "",
    id_tipo_produto: "",
    data_cad: date,
    data_at: null,
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
        setProdutos({
          ...produtos,
          id_tipo_produto: responseJson.records[0].id,
        });
      });
  }, [produtos]);

  const cadProdutos = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("http://localhost:8181/produtos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ produtos }),
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
            mensagem: "Tipo não cadastro com sucesso, tente mais tarde!",
          });
        });
    },
    [getTiposProdutos, produtos]
  );

  useEffect(() => {
    getTiposProdutos();
  }, []);

  return (
    <Container className="principal">
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Cadastrar</Titulo>
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

        <Form onSubmit={cadProdutos}>
          <Label>Nome do Produto: </Label>
          <Input
            type="text"
            name="nome"
            placeholder="Nome do Produto"
            onChange={valorNome}
          />

          <Label>Preço: </Label>
          <Input
            type="text"
            name="preco"
            placeholder="Preço"
            onChange={valorPreco}
          />

          <Label>Tipo do Produto: </Label>
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

          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
