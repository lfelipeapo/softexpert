import styled from "styled-components";

export const Container = styled.section`
  max-width: 960px;
  margin: 20px auto;
  box-shadow: 0 0 1em #6c757d;
`;

export const ConteudoTitulo = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const BotaoAcao = styled.section`
  margin: 25px 0px;
`;

export const ButtonInfo = styled.button`
  background-color: #fff;
  color: #0dcaf0;
  padding: 6px 9px;
  border: 1px solid #0dcaf0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  :hover {
    background-color: #31d2f2;
    color: #fff;
  }
`;

export const Titulo = styled.h1`
  color: #3e3e3e;
  font-size: 23px;
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

export const ConteudoForm = styled.section`
  max-width: 960px;
  padding: 10px 30px 30px;
`;

export const Form = styled.form`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  width: 100%;
  padding: 12px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  max-width: fit-content;
  border: 1px solid #777;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 0px 12px;
  resize: vertical;
`;

export const Select = styled.select`
  --select-border: #777;
  --select-focus: blue;
  --select-arrow: var(--select-border);
  select::-ms-expand {
    display: none;
  }
  width: 100%;
  min-width: 15ch;
  max-width: fit-content;
  margin: 0 12px;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  cursor: inherit;
  line-height: inherit;
  option: {
    width: 100%;
    height: auto;
  }
`;

export const ButtonSuccess = styled.button`
  background-color: #fff;
  margin: 12px;
  max-width: fit-content;
  color: #198754;
  padding: 8px 12px;
  border: 1px solid #198754;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  :hover {
    background-color: #157347;
    color: #fff;
  }
`;
