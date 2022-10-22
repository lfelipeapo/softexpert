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
  const [estoque, setEstoque] = useState({
    id: id,
    prod_id: "",
    estoque_qtde: "",
    date_cad: "",
    date_at: "",
  });

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valorInput = (e) =>
    setEstoque({ ...estoque, [e.target.name]: e.target.value });

  const valorSelect = (e) =>
    setEstoque({ ...estoque, [e.target.name]: e.target.value });

  const getProdutos = useCallback(async () => {
    fetch("http://localhost:8181/produtos")
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.records);
      });
  }, []);

  const edEstoque = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8181/estoque/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estoque: estoque }),
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
          getProdutos();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Estoque não cadastro com sucesso, tente mais tarde!",
        });
      });
  };

  const getEstoque = useCallback(async () => {
    await fetch("http://localhost:8181/estoque/" + id)
      .then((response) => response.json())
      .then((responseJson) => {
        setEstoque({
          id: id,
          prod_id: responseJson.estoque.prod_id,
          estoque_qtde: responseJson.estoque.estoque_qtde,
          data_cad: responseJson.estoque.data_cad,
          data_at: date,
        });
      });
  }, [date, id]);

  useEffect(getEstoque, [id, date, getEstoque]);

  useEffect(getProdutos, [getProdutos]);

  return (
    <Container className="principal">
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Editar</Titulo>
          <BotaoAcao>
            <Link to="/estoque">
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

        <Form onSubmit={edEstoque}>
          <Label>Produto: </Label>
          <Select name="prod_id" onChange={valorSelect} value={estoque.prod_id}>
            {Object.values(data).map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </Select>

          <Label>Quantidade: </Label>
          <Input
            type="text"
            name="estoque_qtde"
            value={estoque.estoque_qtde}
            placeholder="Quantidade"
            onChange={valorInput}
          />

          <ButtonSuccess type="submit">Editar</ButtonSuccess>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
