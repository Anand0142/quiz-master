import { useEffect, useState } from "react";

interface SkullAnimationProps {
  show: boolean;
  onComplete: () => void;
}

const SkullAnimation = ({ show, onComplete }: SkullAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-none">
      <div className="flex flex-col items-center scale-110">
        
        {/* Emoji */}
        <div className="text-9xl mb-4 animate-pulse drop-shadow-[0_0_30px_red]">
          😠
        </div>

        {/* Static Error Text */}
        <div className="text-center">
          <p className="mt-3 text-2xl md:text-3xl font-bold text-red-400 drop-shadow-lg">
            KILL YOU AFTER THE TEST 
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkullAnimation;
