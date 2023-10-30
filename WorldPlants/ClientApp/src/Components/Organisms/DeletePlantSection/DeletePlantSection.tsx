import { useParams } from "react-router-dom";
import { PLANT_HEADER_INFORMATION } from "../../../Constants/Constants";
import { PlantHeaderInformation } from "../../../Interfaces/PlantHeaderInformation";
import { useQueryClient } from "react-query";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import DeletePlantForm from "../../Molecules/DeletePlantForm/DeletePlantForm";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const DeletePlantSection = () => {
  const { plantId } = useParams();
  const client = useQueryClient();
  const data = client.getQueryData<PlantHeaderInformation>([
    PLANT_HEADER_INFORMATION,
    plantId,
  ]);
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      {data && (
        <SettingsSectionHeader>{`Usuń roślinę: ${data.name}`}</SettingsSectionHeader>
      )}
      {data && (
        <DeletePlantForm plantName={data?.name} userSiteId={data.userSiteId} />
      )}
      {!data && (
        <NoListContentInfo
          informationHeaderText={"Brak informacji o roślinie"}
          informationText={
            "Nie udało się załadować informacji niezbędnych do usunięcia rośliny"
          }
        />
      )}
    </SettingsSectionWrapper>
  );
};
export default DeletePlantSection;
