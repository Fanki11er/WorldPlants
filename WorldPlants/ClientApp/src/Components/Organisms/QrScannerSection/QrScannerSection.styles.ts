//import QrReader from "react-qr-reader";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import QrReader from "react-qr-reader-es6";

export const QrScannerWrapper = styled.div<AppTheme>`
  display: grid;
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid ${(props: AppTheme) => props.theme.colors.green};
  border-radius: 5px;
  margin-top: 20px;
  overflow: hidden;
`;

export const QrScanner = styled(QrReader)`
  width: 260px;
  position: absolute;
  left: 0;
  top: -30px;
  grid-column: 1/2;
`;
