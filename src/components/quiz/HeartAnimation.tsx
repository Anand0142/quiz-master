import { useEffect, useState } from "react";

interface HeartAnimationProps {
  show: boolean;
  onComplete: () => void;
}

const HeartAnimation = ({ show, onComplete }: HeartAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-heart-pop">
        <svg
          viewBox="0 0 24 24"
          className="w-40 h-40 md:w-52 md:h-52 drop-shadow-2xl"
          fill="url(#heartGradient)"
        >
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff6b8a" />
              <stop offset="50%" stopColor="#ff4d6d" />
              <stop offset="100%" stopColor="#c9184a" />
            </linearGradient>
            <filter id="heartShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#ff4d6d" floodOpacity="0.5"/>
            </filter>
          </defs>
          <path
            filter="url(#heartShadow)"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeartAnimation;
