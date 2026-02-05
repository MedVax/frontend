import { ReactNode, forwardRef } from "react";

const PermissionRestrictor = forwardRef<any, PermissionRestrictorProps>(function PermissionRestrictor(
  props: PermissionRestrictorProps,
  ref: any
) {
  const { permitted, disableInteraction, children, altChildren, ...rest } =
    props;

  const _children =
    permitted || disableInteraction
      ? typeof children === "function"
        ? children({ ref, ...rest })
        : children
      : null;

  if (permitted) {
    if (disableInteraction) {
      return <div className="pointer-events-none contents">{_children}</div>;
    }
    return _children;
  }

  return altChildren;
});

export default PermissionRestrictor;

export type PermissionRestrictorProps = {
  children?: any;
  permitted?: boolean;
  disableInteraction?: boolean;
  altChildren?: ReactNode;
};
