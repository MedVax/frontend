import { toggleSideMenuAction } from "configs/store-slice";
import { GlobalInitialStateType } from "types/global";
import { useSelector, useDispatch } from "react-redux";

function useSideMenu() {
  const dispatch = useDispatch();
  const isSideMenu = useSelector(
    (state: { global: GlobalInitialStateType }) => state.global.isSideMenu
  );

  function toggleSideMenu(payload?: any) {
    dispatch(
      toggleSideMenuAction(typeof payload === "boolean" ? payload : !isSideMenu)
    );
  }

  return { isSideMenu, toggleSideMenu };
}

export default useSideMenu;
