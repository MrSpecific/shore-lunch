import { useRef, useState, useEffect } from 'react';

const isElement = (o) => {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement //DOM2
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string';
};

const getBreakpoint = (element) => {
  if (!isElement(element)) return null;

  const style = window.getComputedStyle(element);

  return style.getPropertyValue('--breakpoint').trim();
};

const useBreakpoint = (existingRef) => {
  const newRef = useRef(null);
  const ref = existingRef || newRef;
  const [value, setValue] = useState(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      const breakpoint = getBreakpoint(ref.current);
      setValue(breakpoint);
    };

    updateBreakpoint();

    if (typeof window === 'undefined') return;

    window.addEventListener('resize', updateBreakpoint, { passive: true });

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, [ref]);

  return [value, ref];
};

export default useBreakpoint;
