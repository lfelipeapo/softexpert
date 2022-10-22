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
  const [imposto, setImposto] = useState({
    imposto: {
      id: id,
      percentual: "",
    },
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valorInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setImposto({
      imposto: {
        id: id,
        [nameInput]: value,
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
      body: JSON.stringify(imposto),
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
          setImposto({
            imposto: {
              percentual: responseJson.imposto.percentual,
            },
          });
        });
    };
    getImposto();
  }, [id]);

return <Container>
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

          {imposto && (
            <Form onSubmit={editImposto}>
              <Label>Percentual: </Label>
              <Input
                disabled={status.type.erro}
                type="text"
                name="percentual"
                placeholder="Percentual do Imposto"
                value={
                  imposto.imposto?.percentual ? imposto.imposto?.percentual : ""
                }
                onChange={valorInput}
              />

              <ButtonWarning type="submit">Editar</ButtonWarning>
            </Form>
          )}
        </ConteudoForm>
      </Container>;
  
};
