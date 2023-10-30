import { useEffect } from "react";
const GoToTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return null;
};

export default GoToTop;
