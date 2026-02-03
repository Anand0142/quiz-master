import { useEffect, useState } from "react";

interface NotedAnimationProps {
  show: boolean;
  onComplete: () => void;
  message?: string;
}

const NotedAnimation = ({ show, onComplete, message = "Hammaya! Noted" }: NotedAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-bounce-in relative">
        <p className="text-5xl md:text-7xl font-heading font-extrabold text-yellow-400 drop-shadow-2xl text-center animate-text-glow">
          {message}
        </p>
      </div>
    </div>
  );
};

export default NotedAnimation;
