import styled from "styled-components";

export const TableWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

export const AddButton = styled.button`
  width: 250px;
  background-color: antiquewhite;
`;

export const TableHead = styled.th`
  padding: 10px;
  background-color: #76b1ff;
`;

export const TableRow = styled.tr`
  text-align: center;
  border: 1px solid #000;
  :nth-child(odd) {
    background-color: gray;
  }

  :nth-child(even) {
    background-color: #dedcdc;
  }
`;
