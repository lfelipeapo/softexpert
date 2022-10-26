import styled from "styled-components";

export const Body = styled.div`
  column-gap: 200px;
  row-gap: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  font-family: "Raleway", sans-serif;
  section:nth-of-type(2) {
    min-height: fit-content;
    margin: 0;
    padding: 0;
    gap: 40px;
    section:nth-of-type(2) {
      padding: 30px;
      transform: translateY(calc(-25% - 20px));
      font-size: 1.75rem;
      gap: calc(100% + 30px);
      justify-content: flex-start;
      align-self: flex-end;
      margin: 0 auto;
      color: whitesmoke;
      select {
        color: #006cb5;
        background-color: transparent;
        font-size: 1.75rem;
      }
    }
  }
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

export const Box = styled.section`
  box-shadow: 0 5px 20px rgb(120 120 120);
  background-color: #ccc;
  border-radius: 8px;
  width: 300px;
  height: 100%;
  margin: 50px auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: right;
  flex-direction: column;
  min-height: 600px;
  padding: 0px 20px 20px;

  h3 {
    color: darkslategray;
  }

  label {
    color: darkslategray;
  }

  button {
    margin: 12px 12px 0 0;
    align-self: flex-end;
  }
`;

export const CartContainer = styled.div`
  font-size: 1.75rem;
  gap: calc(100% + 10px);
  margin: 0 auto;
  width: fit-content;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgb(130 130 130);
  p {
    margin: 0;
  }
`;

export const CartBody = styled.div`
  background-image: linear-gradient(#f9f9f9, #ccc);
`;

export const CartItem = styled.div`
  padding: 40px 20px 40px 20px;
`;

export const CartRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  font-size: 1.50rem;

  flex-direction: row;

  border-bottom: #ccc 1px solid;

  &:last-of-type {
    border-bottom: #bbb 1px solid;
  }
`;

export const CartRowCellPic = styled.div`
  height: 30px;
  margin: 10px 0;
  cursor: pointer;
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

  background-image: url(\assets\images\remove-item-cart.png);
`;

export const CartRowDesc = styled.div`
  height: 60px;
  flex: 6;
`;

export const ProdutoTitulo = styled.h5`
  margin: 0;
  font-size: 1rem;
`;

export const ProdutoImp = styled.p`
  padding-bottom: 2px;
  margin: 0;
  font-size: 0.5em;
  font-weight: 400;
`;

export const CartRowQuant = styled.div`
  height: 50px;
  flex: 2;
`;

export const NoneList = styled.ul`
  font-size: 0.75em;
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-content: center;
  justify-content: center;
  align-items: center;
  align-self: center;
  list-style: none;
`;

export const ElemList = styled.li`
  display: inline-block;

  font-size: 1.5em;

  padding: 0 5px;
`;

export const ListLink = styled.a`
  cursor: pointer;
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
  font-size: 1.25rem;
  flex: 1;
  text-align: left;
  border-bottom: #dadada 1px solid;
  padding-bottom: 1rem;
`;

export const TotalAmount = styled.p`
  flex: 1;
  font-size: 1.25rem;
  text-align: right;
`;

export const Header = styled.header`
  color: #fff;

  background-color: #006cb5;

  border-top-left-radius: 8px;

  border-top-right-radius: 8px;
`;

export const Footer = styled.footer`
  padding: 30px;

  text-align: center;

  background-color: #ccc;

  border-bottom-left-radius: 8px;

  border-bottom-right-radius: 8px;
`;

export const ButtonFinal = styled.button`
  margin: 15px 0;
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
