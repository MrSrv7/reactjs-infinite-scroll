import { useRef, useState } from "react";

const useInfiniteScroll = (onIntersect) => {
  const [loading, setLoading] = useState(false);
  const intersectionObserver = useRef();

  const targetRef = (element) => {
    if (intersectionObserver.current) intersectionObserver.current.disconnect();

    intersectionObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setLoading(true);
        onIntersect().finally(() => setLoading(false));
      }
    });

    if (element) intersectionObserver.current.observe(element);
  };

  return { targetRef, loading };
};

export default useInfiniteScroll;
