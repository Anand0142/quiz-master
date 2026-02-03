import { useEffect, useState } from "react";

interface ArgumentAlertProps {
  message: string;
  show: boolean;
  color: "red" | "yellow";
  onComplete?: () => void;
}

const ArgumentAlert = ({ message, show, color, onComplete }: ArgumentAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      if (onComplete) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 1500);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  const textColor = color === "red" ? "text-red-400" : "text-yellow-400";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-bounce-in relative">
        <p className={`text-3xl md:text-4xl font-heading font-extrabold ${textColor} drop-shadow-2xl text-center animate-text-glow`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ArgumentAlert;
