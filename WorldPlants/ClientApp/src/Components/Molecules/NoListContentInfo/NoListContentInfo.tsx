import {
  NoListContentInfoHeader,
  NoListContentInfoText,
  NoListContentInfoWrapper,
} from "./NoListContentInfo.styles";

interface Props {
  informationHeaderText: string;
  informationText: string;
}

const NoListContentInfo = (props: Props) => {
  const { informationHeaderText, informationText } = props;
  return (
    <NoListContentInfoWrapper>
      <NoListContentInfoHeader>{informationHeaderText}</NoListContentInfoHeader>
      <NoListContentInfoText>{informationText}</NoListContentInfoText>
    </NoListContentInfoWrapper>
  );
};

export default NoListContentInfo;
