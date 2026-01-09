import { useMemo } from "react";
import { normalizeArray } from "utils/object";

function usePermissionRestrictor(defaultEntityPermissions?: string[]) {
  return useMemo(() => {
    const normalizedDefaultEntityPermission =
      normalizePermissions(defaultEntityPermissions || []) || {};

    function resolveNormalizedPermissions(entityPermissions?: string[]) {
      return entityPermissions
        ? normalizePermissions(entityPermissions)
        : normalizedDefaultEntityPermission;
    }

    function some(permissions: string[] = [], entityPermissions?: string[]) {
      const resolvedNormalizedEntityPermissions =
        resolveNormalizedPermissions(entityPermissions);

      if (!permissions.length) {
        return true;
      }

      if (resolvedNormalizedEntityPermissions) {
        return permissions.some(
          (permission) => !!resolvedNormalizedEntityPermissions[permission]
        );
      }
      return false;
    }

    function every(permissions: string[] = [], entityPermissions?: string[]) {
      const resolvedNormalizedEntityPermissions =
        resolveNormalizedPermissions(entityPermissions);

      if (!permissions.length) {
        return true;
      }
      if (resolvedNormalizedEntityPermissions) {
        return permissions.every(
          (permission) => !!resolvedNormalizedEntityPermissions[permission]
        );
      }
      return false;
    }

    function filter<
      T extends {
        permissions?: string[];
        negateValidation?: boolean;
        validateAll?: boolean;
      }
    >(
      uis: T[] = [],
      options = {} as {
        getPermissions?: (ui: T) => string[];
        isNegateValidation?: (ui: T) => boolean;
        isValidateAll?: (ui: T) => boolean;
      }
    ) {
      const {
        getPermissions = (ui) => ui?.permissions || [],
        isNegateValidation = (ui) => ui?.negateValidation,
        isValidateAll = (ui) => ui?.validateAll,
      } = options;
      return uis.filter(function (ui: T) {
        const permissions = getPermissions(ui);
        const negateValidation = isNegateValidation(ui);
        const validateAll = isValidateAll(ui);
        return validateAll
          ? negateValidation
            ? !every(permissions)
            : every(permissions)
          : negateValidation
          ? !some(permissions)
          : some(permissions);
      });
    }

    return { some, every, filter };
  }, [defaultEntityPermissions]);
}

export default usePermissionRestrictor;

function normalizePermissions(entityPermissions?: string[]) {
  return normalizeArray(entityPermissions, {
    getKey: (key: string) => key,
    getValue: () => true,
  }) as { [x: string]: boolean };
}
