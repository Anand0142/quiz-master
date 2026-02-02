import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface FeedbackAlertProps {
  isCorrect: boolean;
  show: boolean;
}

const FeedbackAlert = ({ isCorrect, show }: FeedbackAlertProps) => {
  if (!show) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl animate-bounce-in",
        isCorrect ? "bg-success/20 border-2 border-success" : "bg-destructive/20 border-2 border-destructive"
      )}
    >
      {isCorrect ? (
        <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
      ) : (
        <XCircle className="w-6 h-6 text-destructive shrink-0" />
      )}
      <span className={cn(
        "font-heading font-semibold text-lg",
        isCorrect ? "text-success" : "text-destructive"
      )}>
        {isCorrect ? "Correct Answer!" : "Wrong Answer!"}
      </span>
    </div>
  );
};

export default FeedbackAlert;
