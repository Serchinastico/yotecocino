import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Icon = styled.img`
  height: 48px;
  width: 48px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const HomeButton = () => {
  const history = useHistory();

  return <Icon src="img/ic_home.svg" onClick={() => history.push("/")}></Icon>;
};

export default HomeButton;
