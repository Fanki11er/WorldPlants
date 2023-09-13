import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import { Form } from "formik";

export const AuthFormWrapper = styled(Form)`
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  row-gap: 40px;
  justify-items: center;
  border-radius: 25px;
  padding: 30px 20px 50px;
  min-width: 350px;
  max-width: 450px;
  position: relative;

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    min-width: 300px;
    max-width: 300px;
  }
`;

export const ImgAuth = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0;
  left: 230px;
  top: 7%;

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    width: 80px;
    height: 80px;
    left: 210px;
  }
`;
