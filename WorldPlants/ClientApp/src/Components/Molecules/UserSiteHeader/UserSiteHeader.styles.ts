import styled from "styled-components";

export const UserSiteHeaderWrapper = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  width: 80%;
  color: ${(props) => props.theme.colors.orange};
  background-color: ${(props) => props.theme.colors.navyBlue};
  border-radius: 25px;
  padding: 25px;
  margin: 0;
`;

export const UserSiteHeaderIconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 15px;
`;

export const UserSiteHeaderIcon = styled.img`
  width: 50px;
  height: 50px;
`;
