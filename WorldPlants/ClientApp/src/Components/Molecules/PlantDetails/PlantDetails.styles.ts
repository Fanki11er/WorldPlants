import styled from "styled-components";

export const PlantDetailsWrapper = styled.article`
  background-color: #071d53;
  border-radius: 15px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 15px;
`;

export const PlantDetailsHeaderSection = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-rows: auto auto auto 1fr;
  row-gap: 15px;
  column-gap: 20px;
`;

export const PLantsDetailsImage = styled.img`
  width: 100%;
  max-height: 350px;
  grid-column: 1/2;
  grid-row: 1/5;
  border-radius: 15px;
`;

export const PlantDetailsName = styled.h2`
  color: #fe7a35;
  margin: 0;
  grid-column: 2/3;
  grid-row: 1/2;
`;

export const PlantDetailsScientificName = styled.h3`
  color: #3ca023;
  margin: 0;
  grid-column: 2/3;
  grid-row: 2/3;
`;

export const PlantDetailsOtherName = styled.span`
  color: #ffc643;
  margin: 0;
`;

export const PlantDetailsDescription = styled.p`
  color: #fe7a35;
  margin: 0;
  grid-column: 2/3;
  grid-row: 4/5;
`;
