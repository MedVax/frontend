import useAuthUser from "../hooks/use-auth-user";
import usePermissionRestrictor from "./use-permission-restrictor";
import { useMemo } from "react";

function useAuthUserPermissionRestrictor() {
  const authUser = useAuthUser();
  const type = authUser?.user?.type;

  return usePermissionRestrictor(
    useMemo(() => (type ? [type] : []), [type])
  );
}

export default useAuthUserPermissionRestrictor;
