import React from "react";
import styled from "styled-components";

const NumOfList = ({ number }) => {
  return <NumOfListStyled>{number}</NumOfListStyled>;
};

const NumOfListStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background: #434343;
  color: #b1b1b1;
  margin-left: 1rem;
`;

export default NumOfList;
