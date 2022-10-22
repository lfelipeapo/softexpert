import React from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Content,
  ConteudoTitulo,
  Table,
  Titulo,
  ButtonPrimary,
  SVGHome,
  SVGMouse
} from "./styles";

export const BemVindo = () => {
  return (
    <Container className="principal">
      <ConteudoTitulo>
        <Titulo>Seja Bem-vindo</Titulo>
      </ConteudoTitulo>
      <Content>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to={"/clientes/"}>
                  <ButtonPrimary>Clientes</ButtonPrimary>
                </Link>
              </td>
              <td>
                <Link to={"/impostos/"}>
                  <ButtonPrimary>Impostos</ButtonPrimary>
                </Link>
              </td>
              <td>
                <Link to={"/produtos/"}>
                  <ButtonPrimary>Produtos</ButtonPrimary>
                </Link>
              </td>
              <td>
                <Link to={"/tipos-produtos/"}>
                  <ButtonPrimary>Tipos de Produtos</ButtonPrimary>
                </Link>
              </td>
              <td>
                <Link to={"/estoque/"}>
                  <ButtonPrimary>Estoque</ButtonPrimary>
                </Link>
              </td>
              <td>
                <Link to={"/vendas/"}>
                  <ButtonPrimary>Vendas</ButtonPrimary>
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </Content>
      <Content>
        <SVGHome />
        <SVGMouse className="move" />
      </Content>
    </Container>
  );
};
