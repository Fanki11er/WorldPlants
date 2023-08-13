import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AddedPlantsWrapper = styled.div`
     background-color: ${(props: AppTheme) => props.theme.colors.mainBlue};
     display: grid;
     justify-items: center;
     align-items: center;
`;