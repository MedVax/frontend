import useAuthUser from "../hooks/use-auth-user";
import usePermissionRestrictor from "./use-permission-restrictor";
import { useMemo } from "react";

function useAuthUserPermissionRestrictor() {
  const authUser = useAuthUser();
  return usePermissionRestrictor(
    useMemo(() => [authUser?.user?.type], [authUser?.user?.type])
  );
}

export default useAuthUserPermissionRestrictor;
