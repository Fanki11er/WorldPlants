import styled from "styled-components";

export const GuestPermissionsViewWrapper = styled.div`
     width: 100%;
     display: grid;
     grid-template-columns: 290px 1fr;
`;
export const FullRowWrapper = styled.div`
  grid-column: 1/3;
`;

export const GuestUserPermissionsViewSideMenuWrapper = styled.menu`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 15px;
  width: 150px;
`;