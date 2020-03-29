import React from "react";
import styled from "styled-components";

export const YoTeCocinoStyle = styled.a`
  font-family: "Pacifico", cursive;
  color: #303240;
  text-decoration: none;
`
const YoTeCocinoLogo: React.FC = () => {
  return <YoTeCocinoStyle href="/">#yotecocino</YoTeCocinoStyle>
}

export default YoTeCocinoLogo;