import styled from 'styled-components';

export const Container = styled.section`
    max-width: 960px;
    margin: 20px auto;
    box-shadow: 0 0 1em #6c757d;
    padding: 20px;
`;

export const ConteudoTitulo = styled.section`
display: flex;
justify-content: space-between;
`;

export const BotaoAcao = styled.section`
margin: 20px 0px;
`;

export const ButtonInfo = styled.button`
background-color: #fff;
color: #0dcaf0;
padding: 6px 9px;
border: 1px solid #0dcaf0;
border-radius: 4px;
cursor: pointer;
font-size: 18px;
:hover{
    background-color: #31d2f2;
    color: #fff;
}
`;

export const Titulo = styled.h1`
    color: #3e3e3e;
    font-size: 23px;
`;

export const ConteudoTip = styled.p`
    color: #3e3e3e;
    font-size: 16px;
`;

export const AlertSuccess = styled.p`
  background-color: #d1e7dd;
  color: #0f5132;
  margin: 20px 0;
  border: 1px solid #badbcc;
  border-radius: 4px;
  padding: 7px;
`;

export const AlertDanger = styled.p`
  background-color: #f8d7da;
  color: #842029;
  margin: 20px 0;
  border: 1px solid #f5c2c7;
  border-radius: 4px;
  padding: 7px;
`;