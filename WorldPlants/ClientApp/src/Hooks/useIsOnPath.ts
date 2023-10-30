import { useLocation } from "react-router-dom";

const useIsOnPath = (paths: string[]) => {
  const { pathname } = useLocation();

  for (let i = 0; i < paths.length; i++) {
    if (!pathname.includes(paths[i])) {
      return false;
    }
  }

  return true;
};

export default useIsOnPath;
