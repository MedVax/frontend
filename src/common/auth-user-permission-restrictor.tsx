import { forwardRef } from "react";
import useAuthUserPermissionRestrictor from "hooks/use-auth-user-permission-restrictor";
import PermissionRestrictor, {
  PermissionRestrictorProps,
} from "./permission-restrictor";

const AuthUserPermissionRestrictor = forwardRef<any, AuthUserPermissionRestrictorProps>(
  function AuthUserPermissionRestrictor(
    props: AuthUserPermissionRestrictorProps,
    ref: any
  ) {
    const { permissions, negateValidation, validateAll, ...rest } = props;
    const permissionValidator = useAuthUserPermissionRestrictor();

    const permitted = validateAll
      ? negateValidation
        ? !permissionValidator.every(permissions)
        : permissionValidator.every(permissions)
      : negateValidation
        ? !permissionValidator.some(permissions)
        : permissionValidator.some(permissions);

    return <PermissionRestrictor {...{ ref, ...rest, permitted }} />;
  }
);

export default AuthUserPermissionRestrictor;

export type AuthUserPermissionRestrictorProps = {
  permissions: string[];
  validateAll?: boolean;
  negateValidation?: boolean;
} & Omit<PermissionRestrictorProps, "permitted">;
