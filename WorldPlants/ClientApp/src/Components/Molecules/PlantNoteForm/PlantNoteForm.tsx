import { Formik } from "formik";
import {
  NoteFormImagePreview,
  PlantNoteFormWrapper,
  SetImageWrapper,
} from "./PlantNoteForm.styles";
import AddPhotoField from "../AddPhotoField/AddPhotoField";
import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import TextareaField from "../TextareaField/TextareaField";
import { useState, ChangeEvent } from "react";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import { compressFile, getErrorMessages } from "../../../Utils/Utils";
import { useParams } from "react-router-dom";
import useQueryKey from "../../../Hooks/useQueryKey";
import InputField from "../InputField/InputField";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";

interface FormValues {
  title: string;
  note: string;
  imageUrl: string;
}

interface Props {
  currentValues: FormValues | null;
  id: string;
  successIndicatorText: string;
  submitEndpoint: (id: string | undefined) => string;
}

const PlantNoteForm = (props: Props) => {
  const { currentValues, submitEndpoint, id, successIndicatorText } = props;
  const { plantId } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();
  const { plantNotesQueryKey } = useQueryKey();

  const { error, isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (values: FormData) => {
      return axiosPrivate.post(submitEndpoint(plantId), values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const newImage = e.target.files[0];
      newImage && setImageFile(newImage);
    }
  };

  const prepareFormData = async (values: FormValues) => {
    const formData = new FormData();

    const entries = Object.entries(values);

    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    if (imageFile) {
      if (imageFile.size > 1048576) {
        formData.append("imageFile", await compressFile(imageFile as File));
      } else {
        formData.append("imageFile", imageFile);
      }
    }
    formData.delete("imageUrl");

    return formData;
  };

  return (
    <Formik
      initialValues={{
        imageUrl: currentValues?.imageUrl || "",
        title: currentValues?.title || "",
        note: currentValues?.note || "",
      }}
      onSubmit={(values: FormValues, { resetForm, setSubmitting }) => {
        prepareFormData(values).then((addNote) => {
          mutate(addNote, {
            onSuccess: async () => {
              client.invalidateQueries(plantNotesQueryKey(plantId));
              resetForm();
            },
          });
        });
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <PlantNoteFormWrapper id={id}>
          <SetImageWrapper>
            {imageFile || values.imageUrl ? (
              <NoteFormImagePreview
                src={
                  imageFile ? URL.createObjectURL(imageFile) : values.imageUrl
                }
              />
            ) : null}
            <AddPhotoField
              label={"Ustaw zdjęcie"}
              fieldName="imageFile"
              handleImageChange={handleImageChange}
            />
          </SetImageWrapper>

          <InputField name="title" placeholder="Tytuł" label="Tytuł notatki" />
          <TextareaField
            label="Treść notatki"
            placeholder="Miejsce na notatkę"
            name={"note"}
            rows={10}
          />
          {isLoading && <LoadingIndicator />}
          {isSuccess && <FormSuccess>{successIndicatorText}</FormSuccess>}
          {error ? (
            <FormRequestError errorValues={getErrorMessages(error)} />
          ) : null}
        </PlantNoteFormWrapper>
      )}
    </Formik>
  );
};

export default PlantNoteForm;
