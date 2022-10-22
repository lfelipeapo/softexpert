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
  const date = new Date().toJSON().slice(0, 10);
  const [cliente, setCliente] = useState({
    cli_id: "",
    cli_nome: "",
    data_cad: date,
    data_at: null,
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valorInput = (e) =>
    setCliente({ ...cliente, [e.target.name]: e.target.value });

  const cadCliente = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8181/clientes/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cliente }),
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
          mensagem: "Cliente não cadastro com sucesso, tente mais tarde!",
        });
      });
  };

  return (
    <Container className="principal">
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Cadastrar</Titulo>
          <BotaoAcao>
            <Link to="/clientes">
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

        <Form onSubmit={cadCliente}>
          <Label>Nome do Cliente:</Label>
          <Input
            type="text"
            name="cli_nome"
            placeholder="Nome do Cliente"
            onChange={valorInput}
          />

          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
