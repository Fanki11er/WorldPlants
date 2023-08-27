import { createContext, PropsWithChildren, useMemo, useState } from "react";

interface ContextValue {
  searchPhrase: string;
  handleSetSearchPhrase: (searchPhrase: string) => void;
}

export const SearchPhraseContext = createContext<ContextValue>({
  searchPhrase: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleSetSearchPhrase(searchPhrase: string) {
    searchPhrase;
  },
});

const SearchPhraseProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSetSearchPhrase = (searchPhrase: string) => {
    setSearchPhrase(searchPhrase);
  };

  const values = useMemo(
    () => ({
      searchPhrase,
      handleSetSearchPhrase,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchPhrase]
  );

  return (
    <SearchPhraseContext.Provider value={values}>
      {children}
    </SearchPhraseContext.Provider>
  );
};

export default SearchPhraseProvider;
