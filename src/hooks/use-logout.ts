import { logoutAction } from "configs/store-actions";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearAuthCookie } from "utils/auth-cookies";
import { useLogoutMutation } from "apis/auth-api";

function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation();

  const logout = useCallback(
    async function logout() {
      try {
        // Call logout API (optional, for server-side token invalidation)
        await logoutMutation().unwrap();
      } catch {
        // Continue with client-side logout even if API fails
        console.error("Logout API failed, continuing with client-side logout");
      } finally {
        // Clear auth cookie
        clearAuthCookie();
        // Dispatch logout action to clear Redux state
        dispatch(logoutAction());
        // Redirect to signin
        router.push("/signin");
      }
    },
    [dispatch, router, logoutMutation]
  );

  return { logout };
}

export default useLogout;
