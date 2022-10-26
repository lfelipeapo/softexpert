import { concat, isEmpty, isNil, isNumber, join, sum, toNumber } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Label, Select } from "../../Estoque/Editar/styles";
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
  const [novoEstoque, setNovoEstoque] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

  const retornaValorPeloIdCliente = (value) => {
    if (value.cli_id === "1") return value;
  };

  let clienteInicialSel = clientes.filter(retornaValorPeloIdCliente);

  const selecionarClienteIniciaLista = () =>
    clienteInicialSel.forEach((clienteInicial) => {
      setCliente(clienteInicial);
    });

  const [pedido, setPedido] = useState({
    itens: [],
    cli_id: "",
    ped_subtotal: 0,
    ped_imposto: 0,
    ped_valor: 0,
    ped_qtde: 0,
    data_ped: "",
    data_pg: "",
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
    if (!isNil(valor) && !isNil(imposto_percentual))
      return (
        toNumber(parseFloat(valor).toFixed(2)) *
        toNumber((toNumber(imposto_percentual) / 100).toFixed(2))
      );
  };

  let obterPedSubTotal = itensCart.reduce((prev, el) => {
    return prev + el.item_ped_qtde * el.item_ped_val_unit;
  }, 0);

  let obterPedImposto = itensCart.reduce((prev, el) => {
    return (
      prev + el.item_val_imposto
    );
  }, 0);

  let obterQtdeItensPed = itensCart.reduce((prev, el) => {
    return prev + el.item_ped_qtde;
  }, 0);

  let obterTotaldoPed = obterPedSubTotal + obterPedImposto;

  const obterPedidoFinal = () => {
    let ped = {
      ...pedido,
      id: "",
      itens: itensCart,
      cli_id: cliente.cli_id,
      ped_subtotal: obterPedSubTotal,
      ped_imposto: obterPedImposto,
      ped_valor: obterTotaldoPed,
      ped_qtde: obterQtdeItensPed,
      data_ped: date,
      data_pg: "",
    };
    setPedido(ped);
  };

  const formatData = (dataSql) => {
    if (!isNil(dataSql)) return dataSql.split("-").reverse().join("/");
  };

  const valorSelect = (e) => {
    setCliente(clientes.find((cliente) => cliente.cli_id === e.target.value));
  };

  const addProducToCart = (id) => {
    let produtos_estoque = [...produtos];
    const copyItensCart = [...itensCart];
    let estoque = produtos_estoque?.find((x) => x?.id === id);
    const item = copyItensCart?.find((x) => x?.prod_id === id);
    let imposto_produto = calcImpostoPorProd(
      toNumber(parseFloat(estoque.preco).toFixed(2)),
      toNumber(parseFloat(estoque.percentual_imposto_tipo).toFixed(2))
    );
    imposto_produto = toNumber(parseFloat(imposto_produto).toFixed(2));

    if (id && estoque && estoque.estoque_qtde !== 0) {
      if (isEmpty(itensCart) || !item) {
        copyItensCart.push({
          estoque_id: estoque.estoque_id,
          prod_id: id,
          item_ped_val_unit: toNumber(estoque.preco),
          item_ped_qtde: 1,
          nome: estoque.nome,
          item_val_imposto: imposto_produto,
          item_ped_valor_total: estoque.preco * 1 + imposto_produto,
        });
        estoque.estoque_qtde--;
      } else {
        item.item_ped_qtde = item.item_ped_qtde + 1;
        item.item_val_imposto = imposto_produto * item.item_ped_qtde;
        item.item_ped_valor_total =
          item.item_val_imposto + item.item_ped_val_unit * item.item_ped_qtde;
        estoque.estoque_qtde--;
      }
    }
    const novo_estoque = {
      id: estoque?.estoque_id ? estoque?.estoque_id : item?.estoque_id,
      prod_id: estoque?.id ? estoque?.id : item?.prod_id,
      estoque_qtde: estoque?.estoque_qtde,
      data_cad: null,
      data_at: date,
    };
    const novos_estoques = [...novoEstoque, novo_estoque];
    setNovoEstoque(novos_estoques);
    setProdutos(produtos_estoque);
    setItensCart(copyItensCart);
  };

  const removeProductToCart = (id) => {
    if (id && itensCart && produtos) {
      const produtos_estoque = [...produtos];
      const copyItensCart = [...itensCart];
      const item = copyItensCart.find((produto) => produto.prod_id === id);
      let estoque = produtos_estoque.find((produto) => produto.id === id);
      let imposto_produto = calcImpostoPorProd(
        estoque.preco,
        estoque.percentual_imposto_tipo
      );
      imposto_produto = toNumber(parseFloat(imposto_produto).toFixed(2));
      if (item) {
        if (
          !isNil(estoque.estoque_qtde) &&
          !isNil(item.item_ped_qtde) &&
          item.item_ped_qtde !== 0
        ) {
          if (
            item.item_ped_qtde > 1 &&
            !isNil(imposto_produto) &&
            isNumber(imposto_produto)
          ) {
            estoque.estoque_qtde++;
            item.item_ped_qtde--;
            item.item_val_imposto = imposto_produto * item.item_ped_qtde;
            toNumber(parseFloat(item.item_val_imposto).toFixed(2));
            item.item_ped_valor_total -=
              item.item_val_imposto + item.item_ped_val_unit;
            toNumber(parseFloat(item.item_ped_valor_total).toFixed(2));
            setItensCart(copyItensCart);
          } else if (item.item_ped_qtde == 1) {
            estoque.estoque_qtde++;
            const arrayFiltered = copyItensCart.filter(
              (produto) => produto.prod_id !== id
            );
            setItensCart(arrayFiltered);
          }
          setProdutos(produtos_estoque);
        }
      }
      const novo_estoque = {
        id: estoque.estoque_id,
        prod_id: estoque.id,
        estoque_qtde: estoque.estoque_qtde,
        data_cad: null,
        data_at: date,
      };
      const novos_estoques = [...novoEstoque, novo_estoque];
      setNovoEstoque(novos_estoques);
    }
  };

  const clearItem = (id) => {
    const estoque = [...produtos];
    const produto = estoque.find((produto) => produto.id === id);

    if (itensCart) {
      const copyItensCart = [...itensCart];
      const item = copyItensCart.find((item) => item.prod_id === id);
      if (
        itensCart &&
        item &&
        !isEmpty(itensCart) &&
        !isEmpty(item) &&
        item.item_ped_qtde !== 0 &&
        !isNil(item.item_ped_qtde) &&
        !isNil(produto.estoque_qtde)
      ) {
        const arrayFiltered = copyItensCart.filter(
          (item) => item.prod_id !== id
        );
        setItensCart(arrayFiltered);
        produto.estoque_qtde += item.item_ped_qtde;
        const novo_estoque = {
          id: produto.estoque_id,
          prod_id: produto.id,
          estoque_qtde: produto.estoque_qtde,
          data_at: date,
        };
        const novos_estoques = [...novoEstoque, novo_estoque];
        setNovoEstoque(novos_estoques);
      }
    }
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

  const atualizaTodoEstoque = useCallback(
    async (novos_estoques) => {
      setIsLoading(true);
      await fetch("http://localhost:8181/estoque/update-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novos_estoques: novos_estoques }),
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
            mensagem: "Estoques não cadastros com sucesso, tente mais tarde!",
          });
          setIsLoading(false);
        });
    },
    [itensCart, date]
  );

  const getClientes = useCallback(async () => {
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
      .finally(() => {
        setHasClientes(true);
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Erro: Lista de clientes não encontrada",
        });
      });
  }, [hasClientes]);

  const cadPedido = useCallback(async () => {
    await fetch("http://localhost:8181/pedidos/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pedido: pedido }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.erro) {
          setStatus({
            type: "erro",
            mensagem: responseJson.mensagem,
          });
        } else
          setStatus({
            type: "success",
            mensagem: responseJson.mensagem,
          });
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem: "Pedido não cadastro com sucesso, tente mais tarde!",
        });
      });
  }, [pedido]);

  const finalizaPedido = (itens) => {
    let ped = { ...pedido };
    const selectCliente = document.getElementById("cli_id");
    if (hasClientes && Object.keys(cliente).length !== 0) {
      if (
        selectCliente.options[selectCliente.selectedIndex].value == "" &&
        ped.cli_id !== ""
      ) {
        alert("Selecione um nome antes de prosseguir");
      } else {
        if (itens && !isEmpty(itens)) {
          obterPedidoFinal();
          const confPed = window.confirm(
            "Gostaria de confirmar seu pedido de valor total de " +
              convertReal(ped.ped_valor) +
              "?"
          );
          if (confPed) {
            ped.data_pg = date;
            setPedido(ped);
            if (cadPedido()) {
              let novos_estoques = novoEstoque;
              // atualizaTodoEstoque(novos_estoques);
              // getEstoquesFromProdutos();
              // window.location.reload(true);
            }
          } else {
            window.location.reload(true);
            return false;
          }
        } else {
          alert("Não é possível finalizar um pedido sem itens no carrinho!");
          window.location.replace("/carrinho");
        }
      }
    } else {
      alert("Por favor faça um cadastro e tente novamente!");
      window.location.replace("/clientes/cadastrar");
    }
  };

  useEffect(getClientes, []);
  console.log(pedido);

  useEffect(() => {
    selecionarClienteIniciaLista();
    getEstoquesFromProdutos();
  }, []);

  useEffect(() => {
    obterPedidoFinal();
  }, [
    itensCart,
    cliente,
    obterPedImposto,
    obterPedSubTotal,
    obterQtdeItensPed,
    obterTotaldoPed,
    date,
  ]);

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
                      <CartRow key={item.prod_id}>
                        <CartRowCellPic>
                          <PicLink onClick={() => clearItem(item.prod_id)}>
                            -
                          </PicLink>

                          <Badge></Badge>
                        </CartRowCellPic>

                        <CartRowDesc>
                          <ProdutoTitulo>{item.nome}</ProdutoTitulo>

                          <ProdutoImp>Imposto por Item</ProdutoImp>
                          <ProdutoImp>
                            {convertReal(item.item_val_imposto)}
                          </ProdutoImp>
                        </CartRowDesc>

                        <CartRowQuant>
                          <NoneList>
                            <ElemList>
                              <ListLink
                                onClick={() =>
                                  removeProductToCart(item.prod_id)
                                }
                              >
                                -
                              </ListLink>
                            </ElemList>

                            <ElemList>
                              {itensCart.find((x) => x.prod_id === item.prod_id)
                                ?.item_ped_qtde
                                ? itensCart.find(
                                    (x) => x.prod_id === item.prod_id
                                  )?.item_ped_qtde
                                : 0}
                            </ElemList>

                            <ElemList>
                              <ListLink
                                onClick={() => addProducToCart(item.prod_id)}
                              >
                                +
                              </ListLink>
                            </ElemList>
                          </NoneList>
                        </CartRowQuant>

                        <CartRowAmount>
                          <Valores>
                            {convertReal(item.item_ped_valor_total)}
                          </Valores>
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
                    {itensCart && convertReal(obterPedSubTotal)}
                  </TotalAmount>
                </Totals>

                <Totals>
                  <TotalLabel>Total de Imposto do Pedido</TotalLabel>

                  <TotalAmount>{convertReal(obterPedImposto)}</TotalAmount>
                </Totals>

                <Totals>
                  <TotalLabel>Total da Compra</TotalLabel>
                  <TotalAmount>{convertReal(obterTotaldoPed)}</TotalAmount>
                </Totals>
              </Footer>
            </CartContainer>
          </Container>

          {hasClientes ? (
            <Box>
              <Titulo>Selecione o seu nome abaixo:</Titulo>
              <Label>Nome do cadastro do cliente: </Label>
              <Select
                id="cli_id"
                name="cli_id"
                onChange={valorSelect}
                value={cliente.cli_id}
              >
                {Object.values(clientes).map((cliente) => (
                  <option key={cliente.cli_id} value={cliente.cli_id}>
                    {cliente.cli_nome}
                  </option>
                ))}
              </Select>
              <ButtonFinal onClick={() => finalizaPedido(itensCart)}>
                Finalizar Compra
              </ButtonFinal>
            </Box>
          ) : (
            <AlertDanger>
              Sem cadastro de clientes encontrado, por favor adicione um para
              finalizar a compra.
            </AlertDanger>
          )}
        </Container>
      </Body>
    </>
  );
};
export default Carrinho;
