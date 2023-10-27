import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const ViewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 180px 0 150px 0;
  justify-content: center;
`;

export const ViewSectionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  align-items: center;
  grid-column: 2/3;
`;
