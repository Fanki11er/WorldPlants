import { useContext } from "react";
import { SearchPhraseContext } from "../Providers/SearchPhraseProvider";

const useSearchPhrase = () => {
  return useContext(SearchPhraseContext);
};

export default useSearchPhrase;
