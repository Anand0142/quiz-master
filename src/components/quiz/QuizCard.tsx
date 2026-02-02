import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Question } from "@/data/quizQuestions";
import ProgressBar from "./ProgressBar";
import ScoreDisplay from "./ScoreDisplay";
import OptionButton from "./OptionButton";
import FeedbackAlert from "./FeedbackAlert";

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizCard = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  onAnswer,
  onNext,
  isLastQuestion,
}: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(index);
    setHasAnswered(true);
    
    const isCorrect = index === question.correctAnswer;
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    onNext();
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-xl text-foreground">
            Quiz Time
          </h1>
          <ScoreDisplay score={score} total={totalQuestions} />
        </div>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-3xl">
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border animate-slide-up">
            {/* Question */}
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 md:space-y-4 mb-6">
              {question.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={selectedAnswer === index}
                  isCorrect={index === question.correctAnswer}
                  showResult={hasAnswered}
                  disabled={hasAnswered}
                  onClick={() => handleOptionClick(index)}
                />
              ))}
            </div>

            {/* Feedback */}
            <FeedbackAlert isCorrect={isCorrect} show={hasAnswered} />

            {/* Next Button */}
            {hasAnswered && (
              <div className="mt-6 animate-slide-up">
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="w-full font-heading font-semibold text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLastQuestion ? "See Results" : "Next Question"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizCard;
