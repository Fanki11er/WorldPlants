import { Outlet } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import AuthorizedNavigation from "../../Components/Molecules/AuthorizedNavigation/AuthorizedNavigation";
import TasksList from "../../Components/Organisms/TasksList/TasksList";
import PlacesList from "../../Components/Organisms/PlacesList/PlacesList";
import SunExposureList from "../../Components/Organisms/SunExposureList/SunExposureList";



const MainLayout = () => {
    return (
        <ViewWrapper>
            <AuthorizedNavigation/>
            <SunExposureList/>
            {/* <PlacesList/> */}
            {/* <TasksList/> */}
            <Outlet/>
        </ViewWrapper>
    )
}

export default MainLayout;