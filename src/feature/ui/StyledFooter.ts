import styled from "styled-components";

export const FooterContainer = styled.div`
  background: #fff;
  height: 80px;
  position: fixed;
  bottom: 0;
  display: flex;
  padding-left: 48px;
  padding-right: 48px;
  flex-direction: column;
  justify-content: center;
  border-radius: 32px 32px 0 0;

  -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.19, 1, 0.22, 1) both;
  animation: slide-in-bottom 0.5s cubic-bezier(0.19, 1, 0.22, 1) both;
  @-webkit-keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    height: 120px;
  }
`;

export const FooterContent = styled.p`
  margin: 0;
  text-align: center;
  align-self: center;
`;

export const FooterLink = styled.a`
  text-decoration: none;
  color: #2997fc;
  font-weight: 600;
`;
