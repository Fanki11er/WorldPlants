import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import loadingPlant from "../../../Assets/Loading.svg";

export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${loadingPlant});
  background-size: cover;
  width: 40px;
  height: 40px;
  animation-name: rotate;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  transform-origin: 50% 50%;
  margin: 10px;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;
