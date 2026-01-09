import { useSelector } from "react-redux";
import { AuthUser } from "../types/user";

function useAuthUser(): AuthUser {
  const authUser = useSelector((state: any) => state?.global?.authUser);

  return authUser ? authUser : null;
}

export default useAuthUser;
