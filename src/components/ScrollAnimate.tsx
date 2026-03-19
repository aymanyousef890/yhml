import { useRef, useEffect, useState, ReactNode } from 'react';

interface ScrollAnimateProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom-in';
  delay?: number;
  className?: string;
}

const animationClasses: Record<string, string> = {
  'fade-up': 'animate-fade-up',
  'fade-in': 'animate-fade-in',
  'slide-left': 'animate-slide-in-left',
  'slide-right': 'animate-slide-in-right',
  'zoom-in': 'animate-zoom-in',
};

const ScrollAnimate = ({ children, animation = 'fade-up', delay = 0, className = '' }: ScrollAnimateProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? animationClasses[animation] : ''}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
        ...(visible && {
          animation: `${animation} 0.8s ease-out forwards`,
        }),
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimate;
