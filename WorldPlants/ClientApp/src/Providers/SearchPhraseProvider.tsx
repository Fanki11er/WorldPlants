import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { PlantRecognizeResult } from "../Interfaces/PlantRecognizeResult";

interface ContextValue {
  searchPhrase: string;
  plantRecognizeResult: PlantRecognizeResult | null;
  handleSetSearchPhrase: (searchPhrase: string) => void;
  handleSetPlantRecognizeResult: (result: PlantRecognizeResult | null) => void;
}

export const SearchPhraseContext = createContext<ContextValue>({
  searchPhrase: "",
  plantRecognizeResult: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleSetSearchPhrase(searchPhrase: string) {
    searchPhrase;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleSetPlantRecognizeResult(result: PlantRecognizeResult | null) {
    result;
  },
});

const SearchPhraseProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [searchPhrase, setSearchPhrase] = useState("");
  const [plantRecognizeResult, setPlantRecognizeResult] =
    useState<PlantRecognizeResult | null>(null);

  const handleSetSearchPhrase = (searchPhrase: string) => {
    setSearchPhrase(searchPhrase);
  };

  const handleSetPlantRecognizeResult = (
    result: PlantRecognizeResult | null
  ) => {
    setPlantRecognizeResult(result);
  };

  const values = useMemo(
    () => ({
      searchPhrase,
      plantRecognizeResult,
      handleSetSearchPhrase,
      handleSetPlantRecognizeResult,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchPhrase, plantRecognizeResult]
  );

  return (
    <SearchPhraseContext.Provider value={values}>
      {children}
    </SearchPhraseContext.Provider>
  );
};

export default SearchPhraseProvider;
