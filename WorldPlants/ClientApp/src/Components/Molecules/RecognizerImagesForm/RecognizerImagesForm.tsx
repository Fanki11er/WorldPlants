import AddPhotoField from "../AddPhotoField/AddPhotoField";
import { ChangeEvent, useState, FormEvent } from "react";
import {
  AddedImageField,
  AddedImagesWrapper,
  ButtonWrapper,
  RecognizerImagesFormWrapper,
  RemoveImageButton,
} from "./RecognizerImagesForm.styles";
import noPhoto from "../../../Assets/ImageFallback.svg";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useMutation } from "react-query";
import { RECOGNIZED_RESULTS } from "../../../Constants/Constants";
import { PlantRecognizeResult } from "../../../Interfaces/PlantRecognizeResult";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import { apiEndpoints } from "../../../Api/endpoints";
import imageCompression from "browser-image-compression";
import { ActionButton, RedActionButton } from "../../Atoms/Buttons/Buttons";

type PhotoFile = File | "";

const compressFile = async (image: File) => {
  try {
    const compressedFile = await imageCompression(
      image,
      imageCompressionOptions
    );
    return compressedFile;
  } catch (e) {
    console.log(e);
    return image;
  }
};

const prepareFormData = async (values: PhotoFile[]) => {
  const formData = new FormData();

  const files = values.filter((value) => {
    return value !== "";
  }) as File[];

  const promises: Promise<File>[] = [];

  files.forEach(async (file) => {
    if (file.size > 1048576) {
      promises.push(compressFile(file as File));
    } else {
      formData.append("imageFile", file);
    }
  });

  return Promise.all(promises)
    .then((data) => {
      data.forEach((file) => {
        formData.append("imageFile", file);
      });
      return formData;
    })
    .catch(() => {
      return formData;
    });
};

const initialValue: PhotoFile[] = ["", "", "", "", ""];

const imageCompressionOptions = {
  maxSizeMB: 2,
  useWebWorker: true,
};

interface Props {
  getResults: (data: PlantRecognizeResult[]) => void;
}
const RecognizerImagesForm = (props: Props) => {
  const { getResults } = props;
  const [imageFiles, setImageFiles] = useState<PhotoFile[]>(initialValue);
  const { recognizePlant } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, error, mutate } = useMutation({
    mutationKey: RECOGNIZED_RESULTS,
    mutationFn: async (data: FormData) => {
      const result = await axiosPrivate.post<PlantRecognizeResult[]>(
        recognizePlant,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return result.data;
    },
    onSuccess: (data) => {
      getResults(data);
      handleResetForm();
    },
  });

  const handleAddNewPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const newImages = [...e.target.files];
      setImageFiles((existingImages) => {
        const imageFiles = [...existingImages];
        newImages.forEach((newImage) => {
          const index = imageFiles.indexOf("");
          if (index >= 0) {
            imageFiles[index] = newImage;
          }
        });
        return imageFiles;
      });
    }
  };

  const handleResetForm = () => {
    setImageFiles(initialValue);
  };

  const handleRemovePhoto = (index: number) => {
    setImageFiles((existingFiles) => {
      const newSet = [...existingFiles];
      newSet.splice(index, 1, "");

      newSet.sort((photoA, photoB) => {
        if (photoA === "") {
          return 1;
        } else if (photoB === "") {
          return -1;
        } else return 0;
      });
      return newSet;
    });
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    prepareFormData(imageFiles).then((data) => {
      mutate(data);
    });
  };

  const renderPhotos = (photos: PhotoFile[]) => {
    return photos.map((photo, index) => {
      return (
        <AddedImageField
          $imageUrl={photo ? URL.createObjectURL(photo) : noPhoto}
          key={index}
          tabIndex={5}
        >
          {!photo && (
            <AddPhotoField
              fieldName=""
              label="Dodaj zdjęcie"
              handleImageChange={handleAddNewPhoto}
              multiple={true}
            />
          )}
          {photo && (
            <RemoveImageButton
              type="button"
              onClick={() => handleRemovePhoto(index)}
              tabIndex={5}
            >
              Usuń
            </RemoveImageButton>
          )}
        </AddedImageField>
      );
    });
  };
  return (
    <RecognizerImagesFormWrapper onSubmit={(e) => handleSubmitForm(e)}>
      <AddedImagesWrapper>{renderPhotos(imageFiles)}</AddedImagesWrapper>

      <ButtonWrapper>
        {error ? (
          <FormRequestError errorValues={getErrorMessages(error)} />
        ) : null}
        {isLoading && <LoadingIndicator />}
        {!isLoading && imageFiles[0] !== "" && (
          <ActionButton type="submit">Roazpoznaj</ActionButton>
        )}
      </ButtonWrapper>
    </RecognizerImagesFormWrapper>
  );
};

export default RecognizerImagesForm;
