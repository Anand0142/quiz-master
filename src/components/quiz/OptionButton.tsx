import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface OptionButtonProps {
  label: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showResult: boolean;
  disabled: boolean;
  onClick: () => void;
}

const optionLabels = ["A", "B", "C", "D"];

const OptionButton = ({
  label,
  index,
  isSelected,
  isCorrect,
  showResult,
  disabled,
  onClick,
}: OptionButtonProps) => {
  const getStateClasses = () => {
    if (!showResult) {
      return "bg-card border-border hover:border-primary hover:bg-secondary";
    }
    
    if (isCorrect) {
      return "bg-success/20 border-success";
    }
    
    if (isSelected && !isCorrect) {
      return "bg-destructive/20 border-destructive";
    }
    
    return "bg-card border-border opacity-50";
  };

  const getAnimation = () => {
    if (!showResult) return "";
    if (isSelected && !isCorrect) return "animate-shake";
    if (isCorrect) return "animate-success-pulse";
    return "";
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-200",
        "flex items-center gap-4 text-left",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        getStateClasses(),
        getAnimation(),
        !disabled && "cursor-pointer",
        disabled && showResult && "cursor-default",
        disabled && !showResult && "cursor-not-allowed"
      )}
    >
      <span
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center font-heading font-bold text-lg",
          "transition-colors duration-200",
          showResult && isCorrect && "bg-success text-success-foreground",
          showResult && isSelected && !isCorrect && "bg-destructive text-destructive-foreground",
          !showResult && "bg-secondary text-muted-foreground",
          showResult && !isCorrect && !isSelected && "bg-secondary text-muted-foreground"
        )}
      >
        {showResult && isCorrect ? (
          <Check className="w-5 h-5" />
        ) : showResult && isSelected && !isCorrect ? (
          <X className="w-5 h-5" />
        ) : (
          optionLabels[index]
        )}
      </span>
      <span className="font-body text-base md:text-lg text-foreground flex-1">
        {label}
      </span>
    </button>
  );
};

export default OptionButton;
