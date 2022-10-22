import React, { useState, useEffect } from "react";
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
  ButtonWarning,
} from "./styles";

export const Editar = (props) => {
  const id = props.match.params.id;
  const [data, setData] = useState({ imposto: {} });
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const [nome, setName] = useState("");
  const [percentual, setPercentual] = useState("");

  const valorName = (e) => {
    setName(e.target.value);
  };
  const valorPercentual = (e) => {
    setPercentual(e.target.value);
  };

  const prepareData = () => {
    setData({
      imposto: {
        id: id,
        percentual: percentual,
        nome: nome,
      },
    });
  };

  const editImposto = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8181/impostos/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Imposto não editado, tente mais tarde!",
        });
      });
  };

  useEffect(() => {
    const getImposto = async () => {
      await fetch("http://localhost:8181/impostos/" + id)
        .then((response) => response.json())
        .then((responseJson) => {
          setName(responseJson.imposto.nome);
          setPercentual(responseJson.imposto.percentual);
        });
    };
    getImposto();
  }, [id]);

  useEffect(prepareData, [id, percentual, nome]);

  return (
    <Container className="principal">
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Editar</Titulo>
          <BotaoAcao>
            <Link to="/impostos">
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

        {data && (
          <Form onSubmit={editImposto}>
            <Label>Nome: </Label>
            <Input
              disabled={status.type.erro}
              type="text"
              nome="nome"
              placeholder="Nome"
              value={nome}
              onChange={valorName}
            />

            <Label>Percentual: </Label>
            <Input
              disabled={status.type.erro}
              type="text"
              nome="percentual"
              placeholder="Percentual do Imposto"
              value={percentual}
              onChange={valorPercentual}
            />

            <ButtonWarning type="submit">Editar</ButtonWarning>
          </Form>
        )}
      </ConteudoForm>
    </Container>
  );
};
