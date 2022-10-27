import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonInfo,
  Titulo,
  ConteudoTip,
  AlertDanger,
  AlertSuccess,
} from "./styles";

export const Visualizar = (props) => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const [id] = useState(props.match.params.id);

  useEffect(() => {
    const getTiposto = async () => {
      await fetch("http://localhost:8181/pedidos/itens/" + id)
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
            setData(responseJson && responseJson.records);
          }
        })
        .catch(() => {
          setStatus({
            type: "erro",
            mensagem: "Sem registros para exibir",
          });
        });
    };
    getTiposto();
  }, [id]);

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
      {Object.values(data).map((item, index) => (
        <Container className="principal">
          <ConteudoTitulo key={item.ped_id}>
            <Titulo>{index+1}. Item do Pedido</Titulo>
            <BotaoAcao>
              <Link to={"/pedidos/visualizar/" + id}>
                <ButtonInfo>Voltar ↵</ButtonInfo>
              </Link>
            </BotaoAcao>
          </ConteudoTitulo>
          <ConteudoTip>ID do Pedido: {item.ped_id}</ConteudoTip>
          <hr />
          <ConteudoTip>ID do Produto: {item.prod_id}</ConteudoTip>
          <hr />
          <ConteudoTip>Valor Unitário: {item.val_unit}</ConteudoTip>
          <hr />
          <ConteudoTip>Quantidade do Item: {item.item_ped_qtde}</ConteudoTip>
          <hr />
          <ConteudoTip>
            Valor do Imposto do Item: {item.item_val_imposto}
          </ConteudoTip>
          <hr />
          <ConteudoTip>Subtotal do Item: {item.valor_total}</ConteudoTip>
        </Container>
      ))}
    </>
  );
};
