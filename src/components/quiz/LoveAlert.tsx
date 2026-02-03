import { cn } from "@/lib/utils";

interface LoveAlertProps {
  show: boolean;
  isYes: boolean;
  onComplete: () => void;
}

const LoveAlert = ({ show, isYes, onComplete }: LoveAlertProps) => {
  if (!show) return null;

  if (isYes) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
        <div className="bg-green-900/95 border-2 border-green-500 rounded-lg p-8 max-w-md animate-bounce-in shadow-2xl">
          <div className="text-center">
            <p className="text-4xl mb-4">🎉</p>
            <h3 className="text-3xl font-heading font-bold text-green-400 mb-4">
              Yay! You're Mine!
            </h3>
            <p className="text-lg text-green-300">
              Thank you for making my day special! ❤️
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
      <div className="bg-red-900/95 border-2 border-red-500 rounded-lg p-8 max-w-md animate-bounce-in shadow-2xl">
        <div className="text-center">
          <p className="text-4xl mb-4">✗</p>
          <h3 className="text-xl font-heading font-bold text-red-400 mb-2">
            Invalid choice.
          </h3>
          <p className="text-lg text-red-300">
            Choose Correct Answer 🤓 
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoveAlert;
