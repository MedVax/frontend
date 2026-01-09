import { LazyExoticComponent, createElement } from "react";

type RouteType = {
  path?: string;
  index?: boolean;
  element: JSX.Element | LazyExoticComponent<() => JSX.Element>;
};

export function configureRoutes(
  routes: RouteType[] = [],
  options: Record<string, unknown> = {}
) {
  const { parentPath } = options;
  return routes.map(configure);
  function configure(route: any) {
    const Element = route.element;
    const element =
      Element.$$typeof === Symbol.for("react.element")
        ? Element
        : createElement(Element);
    const configured = { ...route, element };
    if (configured.path) {
      // @ts-ignore
      configured.path = configured.path.replace(new RegExp(parentPath), "");
    }
    if (route.children?.length) {
      return { ...configured, children: route.children.map(configure) };
    }
    return configured;
  }
}
