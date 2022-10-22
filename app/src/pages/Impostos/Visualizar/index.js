import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { Container, ConteudoTitulo, BotaoAcao, ButtonInfo, Titulo, ConteudoImp } from './styles';

export const Visualizar = (props) => {

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    useEffect(() => {
        const getImposto = async () => {
            await fetch("http://localhost:8181/impostos/" + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.imposto);
                });
        }
        getImposto();
    }, [id]);
    return (
      <Container className="principal">
        <ConteudoTitulo>
          <Titulo>Visualizar</Titulo>
          <BotaoAcao>
            <Link to="/impostos">
              <ButtonInfo>Listar</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>
        <ConteudoImp>ID: {data.id}</ConteudoImp>
        <ConteudoImp>Nome do Imposto: {data.nome}</ConteudoImp>
        <ConteudoImp>Percentual: {data.percentual} %</ConteudoImp>
      </Container>
    );
}