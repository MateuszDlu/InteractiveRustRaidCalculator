import { useEffect } from "react";

function useLogger<T>(label: string, value: T) {
  useEffect(() => {
    console.log(`[${label}]`, value);
  }, [value, label]);
}

export default useLogger;
