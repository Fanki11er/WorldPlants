import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface MobileProps {
  isOpen: boolean;
}

export const SideMenuWrapper = styled.div<MobileProps>`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 25px 15px;
  flex-basis: 250px;
  justify-self: flex-start;
  min-height: 300px;
  max-height: 500px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  z-index: 20;
  position: fixed;
  grid-column: 1/2;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-column: 1/2;
    transform: translateX(${(props) => (!props.isOpen ? "-260px" : "0")});
    background-color: rgba(0, 0, 0, 0.5);
    justify-items: flex-start;
    width: 280px;
    transition: all 0.5s;
  }
`;

export const MobileButton = styled.button<MobileProps>`
  visibility: hidden;
  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    visibility: visible;
    border-radius: 50px;
    width: 40px;
    height: 40px;
    position: absolute;
    background-color: ${(props: AppTheme) => props.theme.colors.orange};
    border: none;
    right: 0;
    top: 50%;
    transform: translateY(-50%) translateX(50%)
      rotateY(${(props) => (!props.isOpen ? "0deg" : "180deg")});
    font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
    font-weight: bold;
    transition: all 0.4s 0.5s;
  }
`;
