import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [itensCart, setItensCart] = useState([]);

  const [pedido, setPedido] = useState({
    itens: {},
    clid_id: "",
    ped_imposto: "",
    ped_valor: "",
    ped_qtde: 0,
    data_ped: "",
    data_pg: "",
  });

  function addProducToCart(id) {
    const copyItensCart = [...itensCart];

    const item = copyItensCart.find((produto) => produto.id === id);

    if (!item) {
      copyItensCart.push({ id: id, qtd: 1 });
    } else {
      item.qtd = item.qtd + 1;
    }

    setItensCart(copyItensCart);
  }

  function removeProductToCart(id) {
    const copyItensCart = [...itensCart];

    const item = copyItensCart.find((produto) => produto.id === id);

    if (item && item.qtd > 1) {
      item.qtd = item.qtd - 1;
      setItensCart(copyItensCart);
    } else {
      const arrayFiltered = copyItensCart.filter(
        (produto) => produto.id !== id
      );
      setItensCart(arrayFiltered);
    }
  }

  function clearCart() {
    setItensCart([]);
  }

  return (
    <CartContext.Provider
      value={{ itensCart, addProducToCart, removeProductToCart, clearCart, setItensCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
