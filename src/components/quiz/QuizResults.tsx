import Confetti from "./Confetti";

interface QuizResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const QuizResults = ({ score, total, onRestart }: QuizResultsProps) => {
  const percentage = (score / total) * 100;

  return (
    <>
      <Confetti />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 md:p-10 animate-bounce-in border border-border shadow-2xl">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-pink-500/20 flex items-center justify-center animate-heart-beat">
              <span className="text-6xl animate-heart-pulse">❤️</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-pink-500 mb-6 animate-text-glow">
              We are perfect match
            </h1>
            
            <div className="flex justify-center gap-3 mb-6 animate-float">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="text-4xl animate-heart-float"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  💕
                </span>
              ))}
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-xl p-6 mb-8 backdrop-blur-sm animate-pulse-slow">
              <p className="text-pink-400 font-body text-sm mb-2 font-semibold">
                Your Score
              </p>
              <p className="font-heading text-5xl md:text-6xl font-bold text-pink-500 animate-scale-pulse">
                {score}/{total}
              </p>
              <p className="text-pink-300 font-body mt-2 text-lg">
                {percentage.toFixed(0)}% Correct
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResults;
