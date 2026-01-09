import { useEffect } from "react";

const useScrollToTop = (effect) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [effect]);

  // eslint-disable-next-line no-useless-return
  return;
};

export default useScrollToTop;
