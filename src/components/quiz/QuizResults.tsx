import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Star } from "lucide-react";
import Confetti from "./Confetti";

interface QuizResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const QuizResults = ({ score, total, onRestart }: QuizResultsProps) => {
  const percentage = (score / total) * 100;
  
  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Keep Practicing! 💪";
    return "Don't Give Up! 📚";
  };

  const getStars = () => {
    if (percentage >= 80) return 3;
    if (percentage >= 50) return 2;
    if (percentage >= 20) return 1;
    return 0;
  };

  return (
    <>
      {percentage >= 60 && <Confetti />}
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 md:p-10 animate-bounce-in border border-border">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center animate-glow-pulse">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Quiz Complete!
            </h1>
            
            <p className="text-muted-foreground font-body text-lg mb-6">
              {getMessage()}
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 transition-all duration-300 ${
                    i < getStars()
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground/30"
                  }`}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            <div className="bg-secondary rounded-xl p-6 mb-8">
              <p className="text-muted-foreground font-body text-sm mb-2">
                Your Score
              </p>
              <p className="font-heading text-5xl md:text-6xl font-bold text-primary">
                {score}/{total}
              </p>
              <p className="text-muted-foreground font-body mt-2">
                {percentage.toFixed(0)}% Correct
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

export default QuizResults;
