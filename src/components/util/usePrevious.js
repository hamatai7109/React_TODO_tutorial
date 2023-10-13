import { useEffect, useRef } from "react";

// useRefを用いて値を保持する。再レンダリングされない固定値。
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
