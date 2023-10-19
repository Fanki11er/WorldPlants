import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const QrPrintSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 80%;
  align-items: center;
  grid-column: 2/3;
  overflow: hidden;
  @media print {
    grid-column: 1/3;
    transform: translateY(-100px);
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: fit-content;
  column-gap: 50px;
  @media print {
    display: none;
  }
`;

export const StyledPage = styled.div`
  display: flex;
  flex-flow: wrap row;
  align-content: flex-start;
  padding: 40px 0;
  justify-content: center;
  margin: 50px;
  width: 180mm;
  height: 270mm;
  background-color: ${(props: AppTheme) => props.theme.colors.white};

  @media (max-width: 960px) {
    transform: scale(0.6);
    margin: -160px 0;
  }

  @media screen and (${(props) => props.theme.devices.small}) {
    height: 277mm;
    transform: scale(0.5);
    margin: -220px 0;
    padding: 25px 0;
  }
  @media print {
    transform: scale(1);
    margin: -20px 0 0 0;
  }
`;
