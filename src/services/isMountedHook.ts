import { useEffect, useRef } from "react";

export default function useMount() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return () => isMounted.current;
}
