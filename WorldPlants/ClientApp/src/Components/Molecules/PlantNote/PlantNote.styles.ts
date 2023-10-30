import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantNoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: center;
`;

export const PlantNoteImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  object-fit: cover;
`;

export const PlantNoteCreationDate = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.green};
`;

export const PlantNoteTitle = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  margin: 0;
  text-align: center;
`;

export const PlantNoteContent = styled.p`
  display: flex;
  margin: 0;
  width: 100%;
  height: 180px;
  background-color: ${(props: AppTheme) => props.theme.colors.darkPurple};
  border-radius: 10px;
  padding: 10px 20px;
  overflow-y: scroll;
  color: ${(props: AppTheme) => props.theme.colors.greenSettingsActive};

  &::-webkit-scrollbar {
    width: 15px;
    background-color: ${(props: AppTheme) => props.theme.colors.transparent};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props: AppTheme) => props.theme.colors.gray};
    border-radius: 10px;
    min-height: 100px;
    border: 3px solid ${(props: AppTheme) => props.theme.colors.gray};
    border: none;
  }
`;
