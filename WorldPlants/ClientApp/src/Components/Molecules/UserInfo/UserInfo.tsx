import { UserImage, UserInfoWrapper, UserName } from "./UserInfo.styles";
import userImage from "../../../Assets/Person.svg";
import useAuth from "../../../Hooks/useAuth";

const UserInfo = () => {
  const { user } = useAuth();
  return (
    <UserInfoWrapper>
      <UserImage src={userImage} />
      <UserName>{user?.name}</UserName>
    </UserInfoWrapper>
  );
};

export default UserInfo;
