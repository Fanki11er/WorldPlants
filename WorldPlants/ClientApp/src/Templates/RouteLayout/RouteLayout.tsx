import { Outlet } from "react-router-dom";
import Footer from "../../Components/Molecules/Footer/Footer";
import { RouteLayoutWrapper } from "./RouteLayout.styles";

const RouteLayout = () => {
  return (
     <RouteLayoutWrapper>
         <Outlet/>
        <Footer/>
     </RouteLayoutWrapper>
  )
};

export default RouteLayout;
