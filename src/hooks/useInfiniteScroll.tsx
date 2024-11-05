import { useEffect } from "react";
import debounce from "lodash/debounce";

const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10 &&
        hasMore
      ) {
        callback();
      }
    }, 300); // 300 ms debounce time

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, hasMore]);
};

export default useInfiniteScroll;
