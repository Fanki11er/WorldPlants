import { useState } from "react";
import { QrScanner, QrScannerWrapper } from "./QrScannerSection.styles";
import { useQuery } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../Router/paths";
import { apiEndpoints } from "../../../Api/endpoints";
import useQueryKey from "../../../Hooks/useQueryKey";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const QrScannerSection = () => {
  const { authorized, selectedPlant } = paths;
  const { checkIfPlantExists } = apiEndpoints;
  const { plantQrQueryKey } = useQueryKey();
  const axiosPrivate = useAxiosPrivate();
  const [isScanning, setIsScanning] = useState(false);
  const [resultPlantId, setResultPlantId] = useState("");
  const navigate = useNavigate();

  const { isLoading, error } = useQuery(
    plantQrQueryKey(),
    async () => {
      const id = resultPlantId;
      setResultPlantId("");
      const result = await axiosPrivate.get(checkIfPlantExists(id));
      return result.data;
    },
    {
      enabled: !!resultPlantId,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      retry: false,

      onSuccess: (data) => {
        navigate(`${authorized}/${selectedPlant}/${data}`);
      },
      onError: () => {
        setResultPlantId("");
      },
    }
  );

  const toggleScanning = () => {
    !isScanning && setResultPlantId("");
    setIsScanning((prev) => !prev);
  };

  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <QrScannerWrapper>
        {isScanning && (
          <QrScanner
            onScan={(result) => {
              if (result) {
                setResultPlantId(result);
                toggleScanning();
              }
            }}
            onError={(error) => {
              console.log(error);
            }}
            facingMode="user"
            delay={300}
            showViewFinder={false}
          />
        )}
      </QrScannerWrapper>
      <ActionButton onClick={toggleScanning}>
        {isScanning ? "Wyłącz" : "Skanuj"}
      </ActionButton>
      {isLoading && <LoadingIndicator />}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
    </SettingsSectionWrapper>
  );
};

export default QrScannerSection;
