/* eslint-disable react-hooks/exhaustive-deps */
import { useQueryClient } from "react-query";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import {
  AddSiteMultiStepFormSummaryWrapper,
  SectionHeader,
  SunExposureIcon,
  SunExposureInfoWrapper,
  SunExposureName,
} from "./AddSiteMultiStepFormSummary.styles";
import { useEffect, useState } from "react";
import { DEFAULT_SITES, SUN_EXPOSURES } from "../../../Constants/Constants";
import { DefaultSiteDto } from "../../../Interfaces/DefaultSiteDto";
import { SunExposureDto } from "../../../Interfaces/SunExposureDto";
import { useFormikContext } from "formik";
import { AddUserSiteValues } from "../../../Interfaces/AddUserSiteValues";
import { selectSunScaleIcon } from "../../../Utils/Utils";
import InputField from "../InputField/InputField";

interface Props {
  textfieldName: string;
  checkboxFieldName: string;
}

const AddSiteMultiStepFormSummary = (props: Props) => {
  const { textfieldName, checkboxFieldName } = props;
  const queryClient = useQueryClient();
  const { values, setFieldValue } = useFormikContext<AddUserSiteValues>();
  const [selectedSunExposure, setSelectedSunExposure] = useState<
    SunExposureDto | undefined
  >(undefined);
  const [selectedSite, setSelectedSite] = useState<DefaultSiteDto | undefined>(
    undefined
  );

  const handleSetSunExposure = () => {
    const sunExposures = queryClient.getQueryData(
      SUN_EXPOSURES
    ) as SunExposureDto[];

    if (sunExposures) {
      const sunExposure = sunExposures.find((item) => {
        return item.id.toString() === values.sunExposureId;
      });

      setSelectedSunExposure(sunExposure);
    }
  };

  const handleSetSite = () => {
    const sites = queryClient.getQueryData(DEFAULT_SITES) as DefaultSiteDto[];

    if (sites) {
      const site = sites.find((item) => {
        return item.id.toString() === values.defaultSiteId;
      });

      setSelectedSite(site);
    }
  };

  const handleSetFieldValues = () => {
    if (selectedSite) {
      setFieldValue(
        checkboxFieldName,
        selectedSite?.location === "Indoor" ? true : false,
        true
      );

      setFieldValue(textfieldName, selectedSite?.name, true);
    }
  };

  useEffect(() => {
    handleSetSite();
    handleSetSunExposure();
  }, []);

  useEffect(() => {
    handleSetFieldValues();
  }, [selectedSite]);

  return (
    <AddSiteMultiStepFormSummaryWrapper>
      <SectionHeader>Podsumowanie</SectionHeader>
      {selectedSite && (
        <InputField
          name={textfieldName}
          label={"Nazwa miejsca"}
          placeholder="Nazwa miejsca"
        />
      )}
      {selectedSunExposure && (
        <SunExposureInfoWrapper>
          <SunExposureIcon
            src={selectSunScaleIcon(selectedSunExposure.sunScale)}
          />
          <SunExposureName>{selectedSunExposure.name}</SunExposureName>
        </SunExposureInfoWrapper>
      )}
      {selectedSite && selectedSite.location === "Outdoor" && (
        <CheckboxInput id={checkboxFieldName} label="Pod dachem" />
      )}
    </AddSiteMultiStepFormSummaryWrapper>
  );
};
export default AddSiteMultiStepFormSummary;
