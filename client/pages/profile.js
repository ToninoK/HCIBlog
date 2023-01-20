import { useCurrentUser } from "../services/auth/useCurrentUser";

const Profile = () => {
    const user = useCurrentUser();
    return <h1>Profile</h1>;
  };
  
  export default Profile;
  