import { isEmpty, isNil } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Form } from "../../Estoque/Editar/styles";
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
  ProdutoImp,
  CartRowQuant,
  NoneList,
  ElemList,
  ListLink,
  CartRowAmount,
  Valores,
  AlertSuccess,
  AlertDanger,
} from "./styles";

export const Carrinho = () => {
  const date = new Date().toJSON().slice(0, 10);
  const [isLoading, setIsLoading] = useState(false);

  const [produtos, setProdutos] = useState([]);
  const [itensCart, setItensCart] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const [clientes, setClientes] = useState([]);

  const [pedido, setPedido] = useState({
    itens: [],
    clid_id: "",
    ped_imposto: "",
    ped_valor: "",
    ped_qtde: 0,
    data_ped: "",
    data_pg: "",
  });

  function addProducToCart(id) {
    const copyItensCart = [...itensCart];
    const produtos = [...produtos];

    const estoque_qtde = produtos.find((produto) => {
      return produto.id === id;
    }).estoque_qtde;
    const item = copyItensCart.find((produto) => produto.id === id);
    const imposto = calcImpostoPorProd(item.preco, 1);

    if (!item) {
      copyItensCart.push({
        estoque_id: item.estoque_id,
        id: id,
        qtd: 1,
        nome: item.nome,
        preco: item.preco,
        imposto: imposto,
        item_total: item.preco * 1 + imposto,
      });
      estoque_qtde -= 1;
    } else {
      item.qtd = item.qtd + 1;
      item.imposto = imposto * item.qtd;
      item.total = item.imposto + item.preco * item.qtd;
      estoque_qtde -= 1;
    }
    const novo_estoque = ({ prev }) => ({
      estoque: {
        id: item.estoque_id,
        prod_id: item.id,
        estoque_qtde: estoque_qtde,
        ...prev,
        data_at: date,
      },
    });

    edEstoque(novo_estoque);
    setItensCart(copyItensCart);
  }

  function removeProductToCart(id) {
    const copyItensCart = [...itensCart];
    const produtos = [...produtos];

    const estoque = produtos.find((produto) => {
      return produto.id === id;
    });

    const item = copyItensCart.find((produto) => produto.id === id);

    if (item && item.qtd > 1) {
      item.qtd = item.qtd - 1;
      setItensCart(copyItensCart);
      estoque.estoque_qtde += 1;
    } else {
      const arrayFiltered = copyItensCart.filter(
        (produto) => produto.id !== id
      );
      setItensCart(arrayFiltered);
      estoque.estoque_qtde += 1;
    }
    const novo_estoque = ({ prev }) => ({
      estoque: {
        id: estoque.estoque_id,
        prod_id: estoque.id,
        estoque_qtde: estoque_qtde,
        ...prev,
        data_at: date,
      },
    });

    edEstoque(novo_estoque);
  }

  function clearItem(id) {
    const estoque = [...produtos];
    const item = itensCart.find((item) => item.id === id);
    const produto = estoque.find((produto) => produto.id === id);
    produto.estoque_qtde += item.qtd;
    const index = itensCart.findIndex(item);
    setItensCart((itensCart.item[index] = null));
    const novo_estoque = ({ prev }) => ({
      estoque: {
        id: produto.estoque_id,
        prod_id: produto.id,
        estoque_qtde: produto.estoque_qtde,
        ...prev,
        data_at: date,
      },
    });

    edEstoque(novo_estoque);
  }

  const convertReal = (number) => {
    const options = {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
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
  const getEstoquesFromProdutos = async () => {
    setIsLoading(true);
    await fetch("http://localhost:8181/estoque/produtos")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          setProdutos(responseJson.records);
          setIsLoading(false);
        }
        if (responseJson && responseJson.erro) {
          setStatus({
            type: "erro",
            mensagem: responseJson.mensagem,
          });
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Erro ao processar a requisição.",
        });
        setIsLoading(false);
      });
  };
  const edEstoque = useCallback(
    async (new_estoque) => {
      setIsLoading(true);
      await fetch("http://localhost:8181/estoque/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_estoque,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.erro) {
            setStatus({
              type: "erro",
              mensagem: responseJson.mensagem,
            });
            setIsLoading(false);
          } else {
            setStatus({
              type: "success",
              mensagem: responseJson.mensagem,
            });
            getEstoquesFromProdutos();
            setIsLoading(false);
          }
        })
        .catch(() => {
          setStatus({
            type: "erro",
            mensagem: "Estoque não cadastro com sucesso, tente mais tarde!",
          });
          setIsLoading(false);
        });
    },
    [itensCart, date]
  );
  useEffect(() => {
    getEstoquesFromProdutos();
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              Object.values(produtos).map((produto) => (
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

                  <td>
                    <CartRowCellPic>
                      <ButtonFinal
                        onClick={addProducToCart(id)}
                        className="add"
                      >
                        +
                      </ButtonFinal>
                    </CartRowCellPic>
                    <CartRowCellPic>
                      onClick=
                      {removeProductToCart(id)}
                      <ButtonFinal className="remove" type="submit">
                        -
                      </ButtonFinal>
                    </CartRowCellPic>
                  </td>
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
              {itensCart && !isEmpty(itensCart) ? (
                itensCart.map((item) => (
                  <CartRow key={item.id}>
                    <CartRowCellPic>
                      <PicLink onClick={removeItem(null)}>-</PicLink>

                      <Badge></Badge>
                    </CartRowCellPic>

                    <CartRowDesc>
                      <ProdutoTitulo>Gabinete Gamer</ProdutoTitulo>

                      <ProdutoImp>Imposto por Item</ProdutoImp>
                      <ProdutoImp>{item.imposto}</ProdutoImp>
                    </CartRowDesc>

                    <CartRowQuant>
                      <NoneList>
                        <ElemList>
                          <ListLink onClick={addProducToCart(item.id)}>
                            -
                          </ListLink>
                        </ElemList>

                        <ElemList>
                          {itensCart.find((x) => x.id === item.id)?.qtd
                            ? itensCart.find((x) => x.id === item.id)?.qtd
                            : 0}
                        </ElemList>

                        <ElemList>
                          <ListLink onClick={removeProductToCart(item.id)}>
                            +
                          </ListLink>
                        </ElemList>
                      </NoneList>
                    </CartRowQuant>

                    <CartRowAmount>
                      <Valores>{item.total}</Valores>
                    </CartRowAmount>
                  </CartRow>
                ))
              ) : (
                <AlertDanger>
                  Não existem itens adicionados ao carrinho.
                </AlertDanger>
              )}
            </CartItem>
          </CartBody>
          <Footer>
            <Totals>
              <TotalLabel>Subtotal</TotalLabel>

              <TotalAmount>
                {() => {
                  const total_subtotal_ped = 0;
                  itensCart.forEach((item) => {
                    return (total_subtotal_ped += item.total - item.imposto);
                  });
                }}
              </TotalAmount>
            </Totals>

            <Totals>
              <TotalLabel>Total de Imposto do Pedido</TotalLabel>

              <TotalAmount>
                {() => {
                  const total_imposto_ped = 0;
                  itensCart.forEach((item) => {
                    return (total_imposto_ped += item.imposto);
                  });
                }}
              </TotalAmount>
            </Totals>

            <Totals>
              <TotalLabel>Total da Compra</TotalLabel>

              <TotalAmount>
                {() => {
                  const total_ped = 0;
                  itensCart.forEach((item) => {
                    return (total_ped += item.total);
                  });
                }}
              </TotalAmount>
            </Totals>

            <ButtonFinal>Finalizar Compra</ButtonFinal>
          </Footer>
        </CartContainer>
      </Container>
    </Body>
  );
};
export default Carrinho;
