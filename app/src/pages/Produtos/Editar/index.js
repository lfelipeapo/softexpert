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
  const [tipos_produtos, setTiposProdutos] = useState({
    id: id,
    nome: "",
    id_imposto: "",
    date_cad: "",
    date_at: "",
  });

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valorInput = (e) =>
    setTiposProdutos({ ...tipos_produtos, [e.target.name]: e.target.value });

  const valorSelect = (e) =>
    setTiposProdutos({ ...tipos_produtos, [e.target.name]: e.target.value });

  const getImpostos = useCallback(async () => {
    fetch("http://localhost:8181/impostos")
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.records);
      });
  }, []);

  const edTiposProdutos = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8181/tipos-produtos/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tipos_produtos: tipos_produtos }),
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
          getImpostos();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Tipo não cadastro com sucesso, tente mais tarde!",
        });
      });
  };

  const getTiposProduto = useCallback(async () => {
    await fetch("http://localhost:8181/tipos-produtos/" + id)
      .then((response) => response.json())
      .then((responseJson) => {
        setTiposProdutos({
          id: id,
          nome: responseJson.tipos_produtos.nome,
          id_imposto: responseJson.tipos_produtos.id_imposto,
          data_cad: responseJson.tipos_produtos.data_cad,
          data_at: date,
        });
      });
  }, [date, id]);

  console.log(tipos_produtos);

  useEffect(getTiposProduto, [id, date, getTiposProduto]);

  useEffect(getImpostos, [getImpostos]);

  return (
    <Container className="principal">
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Editar</Titulo>
          <BotaoAcao>
            <Link to="/tipos-produtos">
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

        <Form onSubmit={edTiposProdutos}>
          <Label>Nome do Tipo do Produto: </Label>
          <Input
            type="text"
            name="nome"
            value={tipos_produtos.nome}
            placeholder="Tipo do Produto"
            onChange={valorInput}
          />

          <Label>Imposto: </Label>
          <Select
            name="id_imposto"
            onChange={valorSelect}
            value={tipos_produtos.id_imposto}
          >
            {Object.values(data).map((imposto) => (
              <option key={imposto.id} value={imposto.id}>
                {imposto.nome}
              </option>
            ))}
          </Select>

          <ButtonSuccess type="submit">Editar</ButtonSuccess>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
