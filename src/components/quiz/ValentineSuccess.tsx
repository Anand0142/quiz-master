import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import Confetti from "./Confetti";

interface ValentineSuccessProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ValentineSuccess = ({ score, total, onRestart }: ValentineSuccessProps) => {
  return (
    <>
      <Confetti />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 md:p-10 animate-bounce-in border border-border">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Yay! You're My Valentine!
            </h1>
            
            <div className="text-4xl my-4">🎉💕🎉</div>
            
            <p className="text-foreground font-body text-lg mb-6">
              Thank you for making my day special! ❤️
            </p>

            <div className="bg-secondary rounded-xl p-6 mb-8">
              <p className="text-muted-foreground font-body text-sm mb-2">
                Your Score
              </p>
              <p className="font-heading text-5xl md:text-6xl font-bold text-primary">
                {score}/{total}
              </p>
            </div>

            <Button
              onClick={onRestart}
              size="lg"
              className="w-full font-heading font-semibold text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValentineSuccess;
