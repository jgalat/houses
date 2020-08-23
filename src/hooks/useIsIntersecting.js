import { useEffect, useState, useRef } from 'react';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

export default function(elementRef) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      observer.current = new IntersectionObserver(
        entries => setIsIntersecting(!!entries[0] && entries[0].isIntersecting),
        options
      );

      observer.current.observe(elementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [elementRef]);

  return isIntersecting;
}
