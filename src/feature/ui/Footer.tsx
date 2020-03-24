import React from "react";
import styled from "styled-components";

const CreatorsDiv = styled.div`
  background: #fff;
  height: 80px;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px -8px 0px rgba(0, 0, 0, 0.1);
`;
const Creators = styled.p`
  margin: 0;
  text-align: center;
  align-self: center;
`;

const Creator = styled.a`
  text-decoration: none;
  color: #2997fc;
  font-weight: 600;
`;

const Footer: React.FC = () => {
    return (
        <CreatorsDiv>
            <Creators>
                Created with ❤️ by{" "}
                <Creator href="https://twitter.com/Serchinastico">
                    @Serchinastico
                </Creator>
                , <Creator href="https://twitter.com/delr3ves">@delr3ves</Creator> y{" "}
                <Creator href="https://www.linkedin.com/in/aliciacarbajalzapater/">
                    @alicarbajal
                </Creator>
            </Creators>
        </CreatorsDiv>
    );
};

export default Footer;
