import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantPlacesAddedListWrapper = styled.ul`
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        align-items: center;
        column-gap: 50px;
        background-color: ${(props: AppTheme) => props.theme.colors.mainBlue};
`;
