import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import { PlantScheduleTipWrapper } from "./PlantScheduleTip.styles";

interface Props {
  error: unknown;
  isLoading: boolean;
  tipData: string;
}

const PlantScheduleTip = (props: Props) => {
  const { error, isLoading, tipData } = props;
  return (
    <PlantScheduleTipWrapper>
      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {tipData}
    </PlantScheduleTipWrapper>
  );
};

export default PlantScheduleTip;
