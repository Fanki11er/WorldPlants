import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import {
  ButtonsWrapper,
  QrPrintSectionWrapper,
  StyledPage,
} from "./QrPrintSection.styles";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { apiEndpoints } from "../../../Api/endpoints";
import useQueryKey from "../../../Hooks/useQueryKey";
import { QrCodeItem } from "../../../Interfaces/QrCodeItem";
import QrCode from "../../Molecules/QrCode/QrCode";
import { ActionButton, RedActionButton } from "../../Atoms/Buttons/Buttons";

const QrPrintSection = () => {
  const axiosPrivate = useAxiosPrivate();
  const { savedQrCodesQueryKey } = useQueryKey();
  const client = useQueryClient();
  const { getQrCodes, deleteQrCode, deleteAllCodes } = apiEndpoints;
  const { data, isLoading, error } = useQuery<QrCodeItem[]>(
    savedQrCodesQueryKey(),
    async () => {
      const result = await axiosPrivate.get(getQrCodes);
      return result.data;
    }
  );

  const { mutate } = useMutation({
    mutationFn: (qrCodeId: number) => {
      return axiosPrivate.delete(deleteQrCode(qrCodeId));
    },
    onSuccess: () => {
      client.invalidateQueries(savedQrCodesQueryKey());
    },
  });

  const { mutate: reset } = useMutation({
    mutationFn: () => {
      return axiosPrivate.delete(deleteAllCodes);
    },
    onSuccess: () => {
      client.invalidateQueries(savedQrCodesQueryKey());
    },
  });

  const handleDeleteQrCode = (id: number) => {
    mutate(id);
  };

  const renderQrCodeItems = (qrCodeItems: QrCodeItem[]) => {
    return qrCodeItems.map((item) => {
      return <QrCode qrCodeItem={item} deleteFunction={handleDeleteQrCode} />;
    });
  };

  return (
    <QrPrintSectionWrapper>
      {data && data.length > 0 && (
        <ButtonsWrapper>
          <ActionButton onClick={() => window.print()}>Drukuj</ActionButton>
          <RedActionButton onClick={() => reset()}>Resetuj</RedActionButton>
        </ButtonsWrapper>
      )}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && data.length === 0 && (
        <NoListContentInfo
          informationText={"Nie posiadasz kodów Qr do wydrukownia"}
          informationHeaderText="Brak kodów Qr"
        />
      )}
      {isLoading && <LoadingIndicator />}
      {data && data.length > 0 && (
        <StyledPage>{renderQrCodeItems(data)}</StyledPage>
      )}
    </QrPrintSectionWrapper>
  );
};

export default QrPrintSection;
