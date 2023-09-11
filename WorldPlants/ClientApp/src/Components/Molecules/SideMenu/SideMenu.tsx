import { PropsWithChildren, useState } from "react";
import { MobileButton, SideMenuWrapper } from "./SideMenu.styles";

const SideMenu = (props: PropsWithChildren) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsOpen((current) => !current);
  };
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
