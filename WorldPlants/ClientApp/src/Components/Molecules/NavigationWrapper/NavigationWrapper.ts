import styled from "styled-components";
import navigationBackground from "../../../Assets/NavigationBackground.svg"

export const NavigationWrapper = styled.nav`
    width: 100%;
    height: 130px;

    background-image: url(${navigationBackground});
    position: fixed;
    background-size:  contain;
    background-repeat: no-repeat;
    z-index: 10;
    top: 0;
    //background-position: 0 -20px;
`;


