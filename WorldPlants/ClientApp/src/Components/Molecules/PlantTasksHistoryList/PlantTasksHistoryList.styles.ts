import styled from "styled-components";

export const PlantTasksHistoryListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  min-width: 340px;
  max-width: 600px;
  padding: 20px;
  max-height: 800px;
  min-height: 300px;
  overflow-y: scroll;
`;

export const PlantTasksHistoryListItem = styled.li`
  align-items: center;
  width: 100%;
  max-height: 80px;
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-template-rows: 70px;
`;

export const PlantTasksHistoryListItemInformationWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  align-items: center;
  column-gap: 25px;
  row-gap: 5px;
  min-height: 40px;
  max-height: 80px;
  transform: translateX(-15px);
  padding: 5px 5px 5px 35px;
  background-image: linear-gradient(
    93deg,
    #28297b 3%,
    #312061 97%,
    #312061 97%
  );
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
export const PlantTasksHistoryListItemInformation = styled.span`
  color: #fe7a35;
  width: fit-content;
`;

export const PlantTasksHistoryListItemCircle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background-color: #4e4ea5;
  z-index: 2;
`;
