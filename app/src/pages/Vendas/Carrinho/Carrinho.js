import { isEmpty, isNil, isNumber } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { ConteudoForm, Form, Label, Select } from "../../Estoque/Editar/styles";
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
  Box,
} from "./styles";

export const Carrinho = () => {
  const date = new Date().toJSON().slice(0, 10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasClientes, setHasClientes] = useState(false);

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
    ped_subtotal: 0,
    ped_imposto: 0,
    ped_valor: 0,
    ped_qtde: 0,
    data_ped: "",
    data_pg: "",
  });

  const valorSelect = (e) =>
    setClientes({ ...clientes, [e.target.name]: e.target.value });

  const addProducToCart = (id) => {
    let produtos_estoque = [...produtos];
    const copyItensCart = [...itensCart];
    let estoque = produtos_estoque?.find((x) => x?.id === id);
    const item = copyItensCart?.find((x) => x?.id === id);
    let imposto_produto = calcImpostoPorProd(
      estoque.preco,
      estoque.percentual_imposto_tipo
    );
    if (id && estoque && estoque.estoque_qtde !== 0) {
      if (isEmpty(itensCart) || !item) {
        copyItensCart.push({
          estoque_id: estoque.estoque_id,
          id: id,
          qtd: 1,
          nome: estoque.nome,
          preco: parseFloat(estoque.preco),
          imposto: imposto_produto,
          total: estoque.preco * 1 + imposto_produto,
        });
        estoque.estoque_qtde--;
      } else {
        item.qtd = item.qtd + 1;
        item.imposto = imposto_produto * item.qtd;
        item.total = item.imposto + item.preco * item.qtd;
        estoque.estoque_qtde--;
      }
    }
    // const novo_estoque = {
    //   id: estoque?.estoque_id ? estoque?.estoque_id : item?.estoque_id,
    //   prod_id: estoque?.id ? estoque?.id : item?.id,
    //   estoque_qtde: estoque?.estoque_qtde,
    //   data_cad: null,
    //   data_at: date,
    // };
    setProdutos(produtos_estoque);
    setItensCart(copyItensCart);
  };

  const removeProductToCart = (id) => {
    if (id && itensCart && produtos) {
      const produtos_estoque = [...produtos];
      const copyItensCart = [...itensCart];
      const item = copyItensCart.find((produto) => produto.id === id);
      let estoque = produtos_estoque.find((produto) => produto.id === id);
      let imposto_produto = calcImpostoPorProd(
        estoque.preco,
        estoque.percentual_imposto_tipo
      );
      if (item) {
        console.log("entrou");
        if (
          !isNil(estoque.estoque_qtde) &&
          !isNil(item.qtd) &&
          item.qtd !== 0
        ) {
          console.log("aqui");
          console.log(item.qtd);
          if (
            item.qtd > 1 &&
            !isNil(imposto_produto) &&
            isNumber(imposto_produto)
          ) {
            console.log("quantidade maior que 1");
            console.table(item);
            estoque.estoque_qtde++;
            item.qtd--;
            item.imposto = imposto_produto * item.qtd;
            item.total -= item.imposto + item.preco;
            setItensCart(copyItensCart);
          } else if (item.qtd == 1) {
            estoque.estoque_qtde++;
            const arrayFiltered = copyItensCart.filter(
              (produto) => produto.id !== id
            );
            setItensCart(arrayFiltered);
          }
          setProdutos(produtos_estoque);
        }
      }
      // const novo_estoque = {
      //   id: estoque.estoque_id,
      //   prod_id: estoque.id,
      //   estoque_qtde: estoque.estoque_qtde,
      //   data_cad: null,
      //   data_at: date,
      // };
    }
  };

  const clearItem = (id) => {
    const estoque = [...produtos];
    const produto = estoque.find((produto) => produto.id === id);

    if (itensCart) {
      const copyItensCart = [...itensCart];
      const item = copyItensCart.find((item) => item.id === id);
      if (
        itensCart &&
        item &&
        !isEmpty(itensCart) &&
        !isEmpty(item) &&
        item.qtd !== 0 &&
        !isNil(item.qtd) &&
        !isNil(produto.estoque_qtde)
      ) {
        const arrayFiltered = copyItensCart.filter((item) => item.id !== id);
        setItensCart(arrayFiltered);
        console.log(produto.estoque_qtde);
        produto.estoque_qtde += item.qtd;
        const novo_estoque = {
          id: produto.estoque_id,
          prod_id: produto.id,
          estoque_qtde: produto.estoque_qtde,
          data_at: date,
        };
      }
    }
  };

  const preparaPedido = (itens) => {
    if (itens && !isEmpty(itens)) {
      if (clientes && !isEmpty(clientes)) {
      } else {
        return alert("Por favor faça um cadastro e tente novamente!");
        window.location("/clientes/cadastrar");
      }
    } else {
      return alert(
        "Não é permitido finalizar um pedido sem itens, por favor, faça o pedido e tente novamente!"
      );
      window.location("/carrinho/");
    }
  };

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
        body: JSON.stringify({ estoque: new_estoque }),
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
  const getClientes = async () => {
    fetch("http://localhost:8181/clientes")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.erro) {
          setStatus({
            type: "erro",
            mensagem: responseJson.mensagem,
          });
        } else {
          setClientes(responseJson.records);
        }
      })
      .finally(() => { setHasClientes(true); })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Erro: Lista de clientes não encontrada",
        });
      });
  };

  useEffect(() => {
    getEstoquesFromProdutos();
    getClientes();
  }, []);
  return (
    <>
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
      <Body>
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
                          onClick={() => addProducToCart(produto.id)}
                          className="add"
                        >
                          +
                        </ButtonFinal>
                      </CartRowCellPic>
                      <CartRowCellPic>
                        <ButtonFinal
                          onClick={() => removeProductToCart(produto.id)}
                          className="remove"
                        >
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
                          <PicLink onClick={() => clearItem(item.id)}>
                            -
                          </PicLink>

                          <Badge></Badge>
                        </CartRowCellPic>

                        <CartRowDesc>
                          <ProdutoTitulo>{item.nome}</ProdutoTitulo>

                          <ProdutoImp>Imposto por Item</ProdutoImp>
                          <ProdutoImp>{convertReal(item.imposto)}</ProdutoImp>
                        </CartRowDesc>

                        <CartRowQuant>
                          <NoneList>
                            <ElemList>
                              <ListLink
                                onClick={() => removeProductToCart(item.id)}
                              >
                                -
                              </ListLink>
                            </ElemList>

                            <ElemList>
                              {itensCart.find((x) => x.id === item.id)?.qtd
                                ? itensCart.find((x) => x.id === item.id)?.qtd
                                : 0}
                            </ElemList>

                            <ElemList>
                              <ListLink
                                onClick={() => addProducToCart(item.id)}
                              >
                                +
                              </ListLink>
                            </ElemList>
                          </NoneList>
                        </CartRowQuant>

                        <CartRowAmount>
                          <Valores>{convertReal(item.total)}</Valores>
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
                      itensCart.map((item) => {
                        total_subtotal_ped += item.total - item.imposto;
                        console.log(item);
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
              </Footer>
            </CartContainer>
          </Container>

          {hasClientes ? (
            <Box>
              <Titulo>Selecione o seu nome abaixo:</Titulo>
              <Label>Nome do cadastro do cliente: </Label>
              <Select
                name="cli_id"
                onChange={valorSelect}
                value={clientes.cli_id}
              >
                {Object.values(clientes).map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.cli_nome}
                  </option>
                ))}
              </Select>
              <ButtonFinal onClick={() => preparaPedido(itensCart)}>
                Finalizar Compra
              </ButtonFinal>
            </Box>
          ) : (
            <AlertDanger>
              Sem cadastro de clientes encontrado, por favor adicione um para finalizar a compra.
            </AlertDanger>
          )}
        </Container>
      </Body>
    </>
  );
};
export default Carrinho;
