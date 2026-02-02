import { useState, useCallback } from "react";
import { Question } from "@/data/quizQuestions";
import ProgressBar from "./ProgressBar";
import ScoreDisplay from "./ScoreDisplay";
import OptionButton from "./OptionButton";
import FeedbackAlert from "./FeedbackAlert";
import HeartAnimation from "./HeartAnimation";
import ValentineErrorPopup from "./ValentineErrorPopup";
import coupleImage from "@/assets/question-couple.jpg";
import rosesImage from "@/assets/question-roses.jpg";
import chocolateImage from "@/assets/question-chocolate.jpg";

const imageMap: Record<string, string> = {
  couple: coupleImage,
  roses: rosesImage,
  chocolate: chocolateImage,
};

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  onValentineYes?: () => void;
}

const QuizCard = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  onAnswer,
  onNext,
  isLastQuestion,
  onValentineYes,
}: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showValentineError, setShowValentineError] = useState(false);

  const handleOptionClick = (index: number) => {
    if (hasAnswered && !question.isValentineQuestion) return;
    
    // Special handling for Valentine question
    if (question.isValentineQuestion) {
      if (index === 1) { // "No" selected
        setShowValentineError(true);
        return;
      } else { // "Yes" selected
        setSelectedAnswer(index);
        setHasAnswered(true);
        onAnswer(true);
        setShowHeart(true);
        return;
      }
    }
    
    setSelectedAnswer(index);
    setHasAnswered(true);
    
    const isCorrect = index === question.correctAnswer;
    onAnswer(isCorrect);

    if (isCorrect) {
      setShowHeart(true);
    } else {
      setTimeout(() => {
        handleNext();
      }, 1500);
    }
  };

  const handleHeartComplete = useCallback(() => {
    setShowHeart(false);
    if (question.isValentineQuestion && onValentineYes) {
      onValentineYes();
    } else {
      handleNext();
    }
  }, [question.isValentineQuestion, onValentineYes]);

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    onNext();
  };

  const handleCloseError = () => {
    setShowValentineError(false);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;
  const questionImage = question.image ? imageMap[question.image] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Heart Animation */}
      <HeartAnimation show={showHeart} onComplete={handleHeartComplete} />
      
      {/* Valentine Error Popup */}
      <ValentineErrorPopup show={showValentineError} onClose={handleCloseError} />

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
            {/* Question Image */}
            {questionImage && (
              <div className="mb-6 flex justify-center">
                <img 
                  src={questionImage} 
                  alt="Question" 
                  className="w-48 h-48 md:w-56 md:h-56 rounded-xl object-cover shadow-lg"
                />
              </div>
            )}

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
                  showResult={hasAnswered && !question.isValentineQuestion}
                  disabled={hasAnswered && !question.isValentineQuestion}
                  onClick={() => handleOptionClick(index)}
                />
              ))}
            </div>

            {/* Feedback - not for Valentine question */}
            {!question.isValentineQuestion && (
              <FeedbackAlert isCorrect={isCorrect} show={hasAnswered} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizCard;
