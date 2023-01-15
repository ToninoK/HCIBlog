import { useCurrentUser } from "../services/auth/useCurrentUser";

const Profile = () => {
    const user = useCurrentUser();
    console.log(user)
    return <h1>Profile</h1>;
  };
  
  export default Profile;
  