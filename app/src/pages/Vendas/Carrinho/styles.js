import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto;

  padding: 0;

  background-color: transparent;

  font-family: "Raleway", sans-serif;
`;

export const Container = styled.section`
  width: 500px;
  height: 100%;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  padding: 0px 20px 20px;
`;

export const CartContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 5px 20px rgb(120, 120, 120);
`;

export const CartBody = styled.div`
  background-image: linear-gradient(#f9f9f9, #ccc);
`;

export const CartItem = styled.div`
  padding: 15px 20px 0 20px;
`;

export const CartRow = styled.div`
  display: flex;

  padding: 15px 0;

  flex-direction: row;

  border-bottom: #ccc 1px solid;

  &:last-of-type {
    border-bottom: #bbb 1px solid;
  }
`;

export const CartRowCellPic = styled.div`
  height: 50px;

  flex: 1;

  position: relative;
`;

export const PicLink = styled.a`
  top: -5px;

  left: -5px;

  width: 20px;

  height: 20px;

  color: #000;

  font-size: 1em;

  text-align: center;

  position: absolute;

  border-radius: 10px;

  text-decoration: none;

  display: inline-block;

  background-color: #fff;

  border: #dadada 1px solid;

  box-shadow: 2px 2px 2px rgb(160, 160, 160);
`;

export const Badge = styled.span`
  width: 50px;

  height: 50px;

  border-radius: 30px;

  display: inline-block;

  background-size: contain;

  background-image: url(https://i0.wp.com/techwek.com/wp-content/uploads/2020/12/Imagem-para-perfil.jpg?resize=512%2C473&ssl=1);
`;

export const CartRowDesc = styled.div`
  height: 50px;
  flex: 3;
`;

export const ProdutoTitulo = styled.h5`
  margin: 10px 0 0;
`;

export const ProdutoID = styled.p`
  margin: 5px 0 0;

  font-size: 0.75em;
`;

export const CartRowQuant = styled.div`
  height: 50px;
  flex: 2;
`;

export const NoneList = styled.ul`
  list-style: none;
`;

export const ElemList = styled.li`
  display: inline-block;

  font-size: 1.5em;

  padding: 0 5px;
`;

export const ListLink = styled.a`
  color: #000;
  text-decoration: none;
`;

export const CartRowAmount = styled.div`
  height: 50px;
  flex: 1;
`;

export const CartRowCell = styled.div`
  height: 50px;
`;

export const Valores = styled.p`
  margin: 23px 0 0 0;
`;

export const Totals = styled.div`
  display: flex;

  flex-direction: row;

  p {
    margin: 5px 0;
  }
`;

export const TotalLabel = styled.p`
  flex: 1;
  text-align: left;
`;

export const TotalAmount = styled.p`
  flex: 1;

  text-align: right;
`;

export const Header = styled.header`
  color: #fff;

  background-color: #006cb5;

  border-top-left-radius: 8px;

  border-top-right-radius: 8px;
`;

export const Footer = styled.footer`
  padding: 20px;

  text-align: center;

  background-color: #ccc;

  border-bottom-left-radius: 8px;

  border-bottom-right-radius: 8px;
`;

export const ButtonFinal = styled.button`
  cursor: pointer;
  color: #fff;
  border: none;
  font-size: 1em;
  padding: 5px 15px;
  background-color: #006cb5;
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

export const Titulo = styled.h3`
  margin: 0;
  padding: 20px;
`;
