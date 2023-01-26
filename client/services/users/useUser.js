import { useContext } from "react";
import { UserState } from ".";

const useUser = () => {
  return useContext(UserState);
};

export default useUser;
