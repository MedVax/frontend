import { Suspense as ReactSuspense } from "react";
import LoadingIndicator from "./loading-Indicator";

/**
 *
 * @param {import('react').SuspenseProps} props
 */
function Suspense(props) {
  return <ReactSuspense {...props} />;
}

Suspense.defaultProps = {
  fallback: (
    <div className="flex justify-center h-[calc(100vh-155px)]  items-center p-8">
      <LoadingIndicator />
    </div>
  ),
};

export default Suspense;
