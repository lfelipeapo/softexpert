import { isNil } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../Produtos/Home/styles";
import {
  Badge,
  Body,
  ButtonFinal,
  CartBody,
  CartContainer,
  CartItem,
  CartRow,
  CartRowCellPic,
  CartRowDesc,
  Container,
  Footer,
  Header,
  ProdutoTitulo,
  PicLink,
  Titulo,
  TotalAmount,
  TotalLabel,
  Totals,
  ProdutoID,
  CartRowQuant,
  NoneList,
  ElemList,
  ListLink,
  CartRowAmount,
  Valores,
  AlertSuccess,
  AlertDanger,
} from "./styles";

const Carrinho = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const convertReal = (number) => {
    const options = {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    const formatNumber = new Intl.NumberFormat("pt-BR", options);
    return formatNumber.format(number);
  };

  const calcImpostoPorProd = (valor, imposto_percentual) => {
    if (!isNil(valor) && !isNil(imposto_percentual)) {
      return parseFloat(valor) * (parseFloat(imposto_percentual) / 100);
    }
  };

  const formatData = (dataSql) => {
    if (!isNil(dataSql)) return dataSql.split("-").reverse().join("/");
  };

  const getEstoques = async () => {
    fetch("http://localhost:8181/estoque/produtos")
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.records));
  };

  useEffect(() => {
    getEstoques();
    console.log(data);
  }, []);

  return (
    <Body>
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
      <Container>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Tipo de Produto</th>
              <th>Preço</th>
              <th>Valor do Imposto</th>
              <th>Quantidade Disponível em Estoque</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(data).map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.tipo}</td>
                <td>{convertReal(produto.preco)}</td>
                <td>
                  {convertReal(
                    calcImpostoPorProd(
                      produto.preco,
                      produto.percentual_imposto_tipo
                    )
                  )}
                </td>
                <td>{produto.estoque_qtde}</td>

                {/* <td>
                  <Link to={"/produtos/visualizar/" + produto.id}>
                    <ButtonFinal>Visualizar</ButtonFinal>
                  </Link>
                  <Link to={"/produtos/editar/" + produto.id}>
                    <ButtonFinal>Editar</ButtonFinal>
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Container>
        <CartContainer>
          <Header>
            <Titulo>Carrinho de Compras</Titulo>
          </Header>

          <CartBody>
            <CartItem>
              <CartRow>
                <CartRowCellPic>
                  <PicLink href="#">-</PicLink>

                  <Badge></Badge>
                </CartRowCellPic>

                <CartRowDesc>
                  <ProdutoTitulo>Gabinete Gamer</ProdutoTitulo>

                  <ProdutoID>#41345755</ProdutoID>
                </CartRowDesc>

                <CartRowQuant>
                  <NoneList>
                    <ElemList>
                      <ListLink href="#">-</ListLink>
                    </ElemList>

                    <ElemList>2</ElemList>

                    <ElemList>
                      <ListLink href="#">+</ListLink>
                    </ElemList>
                  </NoneList>
                </CartRowQuant>

                <CartRowAmount>
                  <Valores>R$13,87</Valores>
                </CartRowAmount>
              </CartRow>

              <CartRow>
                <CartRowCellPic>
                  <PicLink href="#">-</PicLink>

                  <Badge></Badge>
                </CartRowCellPic>

                <CartRowDesc>
                  <ProdutoTitulo>Gabinete Gamer</ProdutoTitulo>

                  <ProdutoID>#41345755</ProdutoID>
                </CartRowDesc>

                <CartRowQuant>
                  <NoneList>
                    <ElemList>
                      <ListLink href="#">-</ListLink>
                    </ElemList>

                    <ElemList>2</ElemList>

                    <ElemList>
                      <ListLink href="#">+</ListLink>
                    </ElemList>
                  </NoneList>
                </CartRowQuant>

                <CartRowAmount>
                  <Valores>R$13,87</Valores>
                </CartRowAmount>
              </CartRow>

              <CartRow>
                <CartRowCellPic>
                  <PicLink href="#">-</PicLink>

                  <Badge></Badge>
                </CartRowCellPic>

                <CartRowDesc>
                  <ProdutoTitulo>Gabinete Gamer</ProdutoTitulo>

                  <ProdutoID>#41345755</ProdutoID>
                </CartRowDesc>

                <CartRowQuant>
                  <NoneList>
                    <ElemList>
                      <ListLink href="#">-</ListLink>
                    </ElemList>

                    <ElemList>2</ElemList>

                    <ElemList>
                      <ListLink href="#">+</ListLink>
                    </ElemList>
                  </NoneList>
                </CartRowQuant>

                <CartRowAmount>
                  <Valores>R$13,87</Valores>
                </CartRowAmount>
              </CartRow>
            </CartItem>
          </CartBody>

          <Footer>
            <Totals>
              <TotalLabel>Subtotal</TotalLabel>

              <TotalAmount>R$13,87</TotalAmount>
            </Totals>

            <Totals>
              <TotalLabel>Taxa</TotalLabel>

              <TotalAmount>R$2,00</TotalAmount>
            </Totals>

            <Totals>
              <TotalLabel>Total</TotalLabel>

              <TotalAmount>R$15,87</TotalAmount>
            </Totals>

            <ButtonFinal>Finalizar Compra</ButtonFinal>
          </Footer>
        </CartContainer>
      </Container>
    </Body>
  );
};

export default Carrinho;
