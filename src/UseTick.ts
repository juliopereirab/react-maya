import {useState, useEffect} from "react"

export function useTick(delay: number, initialIndex: number) {
    const [tick, setTick] = useState(initialIndex ? initialIndex : 0);
    useEffect(() => {
      const interval = setInterval(() => {
        if (!document.hidden) {
          setTick((tick) => tick < 150 ? tick+ 1 : 0);
        }
      }, delay);
      return () => clearInterval(interval);
    }, []);
    return tick;
  }