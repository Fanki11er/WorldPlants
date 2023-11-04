import { PropsWithChildren, useEffect, useState } from "react";
import { MobileButton, SideMenuWrapper } from "./SideMenu.styles";
import { useLocation } from "react-router-dom";

const SideMenu = (props: PropsWithChildren) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const handleToggleMobileMenu = () => {
    setIsOpen((current) => !current);
  };
  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <SideMenuWrapper isOpen={isOpen}>
      <MobileButton onClick={handleToggleMobileMenu} isOpen={isOpen}>
        {">"}
      </MobileButton>
      {children}
    </SideMenuWrapper>
  );
};

export default SideMenu;
