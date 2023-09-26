import { useState, ChangeEvent } from "react";
import { Formik } from "formik";
import FormNumberField from "../FormNumberField/FormNumberField";
import * as Yup from "yup";
import {
  AddPlantFormImagePreview,
  AddPlantFormInputsWrapper,
  AddPlantFormPhotoInputWrapper,
  AddPlantFormWrapper,
} from "./AddPlantForm.styles";
import { useMutation } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {
  getErrorMessages,
  yupAddPlantValidationShape,
} from "../../../Utils/Utils";
import FormRequestError from "../FormRequestError/FormRequestError";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import { apiEndpoints } from "../../../Api/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../Router/paths";
import InputField from "../InputField/InputField";
import AddPhotoField from "../AddPhotoField/AddPhotoField";
import TextareaField from "../TextareaField/TextareaField";
import imgFallback from "../../../Assets/ImageFallback.svg";
import { RedActionButton } from "../../Atoms/Buttons/Buttons";

interface FormValues {
  name: string;
  imageUrl: string;
  potHeight: number;
  potWidth: number;
  plantHeight: number;
  additionalDescription: string;
}

interface Props {
  currentImage: string;
  currentName: string;
  externalId?: number;
}

const AddPlantSchema = Yup.object().shape(yupAddPlantValidationShape);

const AddPlantForm = (props: Props) => {
  const { currentImage, currentName, externalId } = props;
  const { authorized, selectedPlant } = paths;
  const { addPlant } = apiEndpoints;
  const { siteId } = useParams();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const axiosPrivate = useAxiosPrivate();

  const { error, isLoading, mutate } = useMutation({
    mutationFn: (values: FormData) => {
      return axiosPrivate.post(addPlant(siteId), values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });

  const prepareFormData = (values: FormValues) => {
    const formData = new FormData();

    const entries = Object.entries(values);

    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    if (imageFile) {
      formData.append("imageFile", imageFile);
      formData.delete("imageUrl");
    }

    if (externalId) {
      formData.append("externalId", externalId.toString());
    }

    return formData;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const newImage = e.target.files[0];
      newImage && setImageFile(newImage);
    }
  };

  const handleResetImage = () => {
    setImageFile(null);
  };

  return (
    <Formik
      initialValues={{
        name: currentName,
        imageUrl: currentImage,
        potHeight: 0,
        potWidth: 0,
        plantHeight: 0,
        additionalDescription: "",
      }}
      onSubmit={(values: FormValues, { setSubmitting }) => {
        const addPlantValues = prepareFormData(values);

        mutate(addPlantValues, {
          onSuccess: async (response) => {
            const plantId = await response.data;
            setSubmitting(false);
            navigate(`${authorized}/${selectedPlant}/${plantId}`);
          },
          onError: () => {
            setSubmitting(false);
          },
        });
      }}
      validationSchema={AddPlantSchema}
    >
      {({ values }) => (
        <AddPlantFormWrapper id={"AddPlantForm"}>
          <AddPlantFormImagePreview
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : values.imageUrl || imgFallback
            }
          />
          <AddPlantFormInputsWrapper>
            <InputField
              name="name"
              label="Nazwa rośliny"
              placeholder="Podaj nazwę rośliny"
            />
            <AddPlantFormPhotoInputWrapper>
              <AddPhotoField
                fieldName={"imageFile"}
                label={"Ustaw własne zdjęcie"}
                handleImageChange={handleImageChange}
              />
              <RedActionButton onClick={handleResetImage} type="button">
                Usuń zdjecie
              </RedActionButton>
            </AddPlantFormPhotoInputWrapper>
            <FormNumberField
              name="potHeight"
              label={"Wysokość doniczki"}
              scale={"cm"}
              minValue={0}
              maxValue={1000}
            />
            <FormNumberField
              name="potWidth"
              label={"Szerokość doniczki"}
              scale={"cm"}
              minValue={0}
              maxValue={1000}
            />
            <FormNumberField
              name="plantHeight"
              label={"Wysokość rośliny"}
              scale={"cm"}
              minValue={0}
              maxValue={5000}
            />
            <TextareaField
              name={"additionalDescription"}
              label="Dodatkowy opis"
              placeholder="Miejsce na dodatkowy opis"
            />
          </AddPlantFormInputsWrapper>

          {isLoading && <LoadingIndicator />}
          {error ? (
            <FormRequestError errorValues={getErrorMessages(error)} />
          ) : null}
        </AddPlantFormWrapper>
      )}
    </Formik>
  );
};

export default AddPlantForm;
