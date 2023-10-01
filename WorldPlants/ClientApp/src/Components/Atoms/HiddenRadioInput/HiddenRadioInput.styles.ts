import { Field } from "formik";
import styled from "styled-components";

export const HiddenRadioInput = styled(Field)`
  position: absolute;
  left: -100%;
  top: 0;
  width: 20px;
  height: 20px;
  justify-self: center;
  opacity: 0;
`;
