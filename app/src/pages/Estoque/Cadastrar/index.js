import React, { useState } from "react";
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
} from "./styles";

export const Cadastrar = () => {
  const [imposto, setImposto] = useState({
    id: "",
    percentual: ""
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valorInput = (e) =>
    setImposto({ ...imposto, [e.target.name]: e.target.value });

  const cadImposto = async (e) => {
    e.preventDefault();
    //console.log(percentual.titulo);

    await fetch("http://localhost:8181/impostos/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imposto }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
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
          mensagem: "Imposto não cadastro com sucesso, tente mais tarde!",
        });
      });
  };

  return (
    <Container className="principal">
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Cadastrar</Titulo>
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

        <Form onSubmit={cadImposto}>
          <Label>Valor Percentual: </Label>
          <Input
            type="text"
            name="percentual"
            placeholder="Valor Percentual"
            onChange={valorInput}
          />

          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
