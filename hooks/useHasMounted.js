import { useEffect, useState } from 'react';

// Client-persisted state (e.g. use-shopping-cart's localStorage-backed cart)
// isn't available during SSR or the client's first paint. Gate rendering that
// depends on it behind this so the first client render matches the server
// exactly, avoiding hydration mismatches for values/elements that only exist
// once the persisted state has rehydrated.
const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // "Have we mounted on the client" cannot be known during render -- an
    // effect that flips state on mount is the standard, deliberate way to
    // detect this, not a derived value that could be computed inline.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export default useHasMounted;
