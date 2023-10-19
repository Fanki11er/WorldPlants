import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const RemoveCodeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: ${(props: AppTheme) => props.theme.colors.transparent};
  color: black;
  border-radius: 5px;
  transition: all 0.5s;
  position: absolute;
  left: 5px;
  top: 5px;
  outline: none;
  border: 2px solid ${(props: AppTheme) => props.theme.colors.black};
  transition: all 0.5s;

  &:hover {
    background-color: ${(props: AppTheme) => props.theme.colors.red};
    color: ${(props: AppTheme) => props.theme.colors.white};
    border: 2px solid ${(props: AppTheme) => props.theme.colors.red};
  }
  @media print {
    display: none;
  }
`;

export const QrCodeWrapper = styled.div`
  display: flex;
  position: relative;
  width: 70mm;
  height: 25mm;
  border: 1px solid ${(props: AppTheme) => props.theme.colors.black};
  background-color: ${(props: AppTheme) => props.theme.colors.white};
  margin: 1px;
  padding-right: 2px;
  transition: all 0.5s;
`;

export const QrCodeFlexColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 53mm;
  height: 25mm;
`;

export const Qr = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 65px;
  height: 65px;
  align-self: center;
`;
export const QrDescriptionLabel = styled.label`
  font-weight: bolder;
  text-align: center;
  margin: 0 2px 0 4px;
`;
