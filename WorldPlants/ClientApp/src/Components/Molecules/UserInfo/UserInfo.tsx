import { UserImage, UserInfoWrapper, UserName } from "./UserInfo.styles";
import userImage from "../../../Assets/Person.svg";

const UserInfo = () => {
    return(
        <UserInfoWrapper>
            <UserImage src={userImage}/>
            <UserName>Krzysztof</UserName>
        </UserInfoWrapper>
    )
}

export default UserInfo;