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
  const date = new Date().toJSON().slice(0, 10);

  const cli_id = props.match.params.id;
  const [cliente, setCliente] = useState({
    cliente: {
      cli_id: cli_id,
      cli_nome: "",
      dat_cad: "",
      data_at: "",
    },
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valorInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    let data_cad = cliente.cliente.data_cad;
    setCliente({
      cliente: {
        cli_id: cli_id,
        [nameInput]: value,
        data_cad: data_cad,
        data_at: date,
      },
    });
  };

  const editCliente = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8181/clientes/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
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
          mensagem: "Cliente não editado, tente mais tarde!",
        });
      });
  };

  useEffect(() => {
    const getCliente = async () => {
      await fetch("http://localhost:8181/clientes/" + cli_id)
        .then((response) => response.json())
        .then((responseJson) => {
          setCliente({
            cliente: {
              cli_id: cli_id,
              cli_nome: responseJson.cliente.cli_nome,
              data_cad: responseJson.cliente.data_cad,
              data_at: responseJson.cliente.data_at,
            },
          });
        });
    };
    getCliente();
  }, [cli_id]);

  return (
    <Container className="principal">
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Editar</Titulo>
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

        {cliente && (
          <Form onSubmit={editCliente}>
            <Label>Nome do Cliente: </Label>
            <Input
              disabled={status.type.erro}
              type="text"
              name="cli_nome"
              placeholder="Nome do Cliente"
              value={cliente.cliente?.cli_nome ? cliente.cliente?.cli_nome : ""}
              onChange={valorInput}
            />

            <ButtonWarning type="submit">Editar</ButtonWarning>
          </Form>
        )}
      </ConteudoForm>
    </Container>
  );
};
