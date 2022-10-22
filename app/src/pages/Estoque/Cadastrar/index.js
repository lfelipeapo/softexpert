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

  const [estoque, setEstoque] = useState({
    id: "",
    prod_id: "",
    estoque_qtde: "",
    date_cad: date,
    date_at: null,
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
        setEstoque({
          ...estoque,
          prod_id: responseJson.records[0].id,
        });
      });
  }, [estoque]);

  const cadEstoque = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("http://localhost:8181/estoque/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estoque }),
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
    },
    [getProdutos, estoque]
  );

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <Container className="principal">
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Cadastrar</Titulo>
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

        <Form onSubmit={cadEstoque}>
          <Label>Produto: </Label>
          <Select
            name="prod_id"
            onChange={valorSelect}
            value={estoque.prod_id}
          >
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
            placeholder="Quantidade"
            onChange={valorInput}
          />

          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
