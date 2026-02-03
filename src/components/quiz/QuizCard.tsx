import { useState, useCallback } from "react";
import { Question } from "@/data/quizQuestions";
import ProgressBar from "./ProgressBar";
import ScoreDisplay from "./ScoreDisplay";
import OptionButton from "./OptionButton";
import FeedbackAlert from "./FeedbackAlert";
import HeartAnimation from "./HeartAnimation";
import SkullAnimation from "./SkullAnimation";
import NotedAnimation from "./NotedAnimation";
import ArgumentAlert from "./ArgumentAlert";
import LoveAlert from "./LoveAlert";
import ValentineErrorPopup from "./ValentineErrorPopup";
import coupleImage from "@/assets/question-couple.jpg";

const imageMap: Record<string, string> = {
  couple: coupleImage,
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
  const [showSkull, setShowSkull] = useState(false);
  const [showNoted, setShowNoted] = useState(false);
  const [showValentineError, setShowValentineError] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [argumentAlertMessage, setArgumentAlertMessage] = useState("");
  const [argumentAlertColor, setArgumentAlertColor] = useState<"red" | "yellow">("red");
  const [showArgumentAlert, setShowArgumentAlert] = useState(false);
  const [showBestAlert, setShowBestAlert] = useState(false);
  const [sorryAlertMessage, setSorryAlertMessage] = useState("");
  const [sorryAlertColor, setSorryAlertColor] = useState<"red" | "yellow">("red");
  const [showSorryAlert, setShowSorryAlert] = useState(false);
  const [sorryNotAcceptedAttempts, setSorryNotAcceptedAttempts] = useState(0);
  const [sorryNeverAttempts, setSorryNeverAttempts] = useState(0);
  const [showLoveAlert, setShowLoveAlert] = useState(false);
  const [loveAlertIsYes, setLoveAlertIsYes] = useState(false);

  const handleOptionClick = (index: number) => {
    if (hasAnswered && !question.isValentineQuestion && !question.isNotedQuestion && !question.isArgumentQuestion && !question.isBestQuestion && !question.isSorryQuestion && !question.isLoveQuestion) return;
    
    // Special handling for Love question
    if (question.isLoveQuestion) {
      setSelectedAnswer(index);
      
      if (index === 0) { // "yes" (correct)
        setHasAnswered(true);
        onAnswer(true);
        setLoveAlertIsYes(true);
        setShowLoveAlert(true);
        setTimeout(() => {
          setShowLoveAlert(false);
          if (isLastQuestion) {
            onNext();
          } else {
            handleNext();
          }
        }, 2000);
      } else { // "No" (wrong)
        setLoveAlertIsYes(false);
        setShowLoveAlert(true);
        setTimeout(() => {
          setShowLoveAlert(false);
          setSelectedAnswer(null);
        }, 2000);
      }
      return;
    }
    
    // Special handling for Sorry question
    if (question.isSorryQuestion) {
      setSelectedAnswer(index);
      
      if (index === 0) { // "Yes Accepted" (correct)
        setHasAnswered(true);
        onAnswer(true);
        setSorryAlertMessage("Luv uh 💋");
        setSorryAlertColor("yellow");
        setShowSorryAlert(true);
        setTimeout(() => {
          setShowSorryAlert(false);
          handleNext();
        }, 2000);
      } else if (index === 1) { // "Not Accepted"
        const attempts = sorryNotAcceptedAttempts;
        let message = "";
        let color: "red" | "yellow" = "red";
        
        if (attempts === 0) {
          message = "please Kannamma Accept 🫤";
          color = "red";
          setSorryNotAcceptedAttempts(1);
        } else if (attempts === 1) {
          message = "I will Never Do that Sorry ☹️";
          color = "red";
          setSorryNotAcceptedAttempts(2);
        } else if (attempts >= 2) {
          message = "sorry sorry sorry 😫";
          color = "yellow";
          setSorryNotAcceptedAttempts(0); // Reset for next cycle
        }
        
        setSorryAlertMessage(message);
        setSorryAlertColor(color);
        setShowSorryAlert(true);
        setTimeout(() => {
          setShowSorryAlert(false);
          setSelectedAnswer(null);
        }, 2000);
      } else if (index === 2) { // "Never"
        setSorryAlertMessage("🥺NOOOOOOO");
        setSorryAlertColor("red");
        setShowSorryAlert(true);
        setSorryNeverAttempts(sorryNeverAttempts + 1);
        setTimeout(() => {
          setShowSorryAlert(false);
          setSelectedAnswer(null);
        }, 2000);
      }
      return;
    }
    
    // Special handling for Best question
    if (question.isBestQuestion) {
      setSelectedAnswer(index);
      
      if (index === 0) { // "You" selected (wrong answer)
        setArgumentAlertMessage("No that wrong");
        setArgumentAlertColor("red");
        setShowBestAlert(true);
        setTimeout(() => {
          setShowBestAlert(false);
          setSelectedAnswer(null);
        }, 2000);
      } else { // "Me" selected (correct answer)
        setHasAnswered(true);
        onAnswer(true);
        setShowHeart(true);
      }
      return;
    }
    
    // Special handling for Argument question
    if (question.isArgumentQuestion) {
      setSelectedAnswer(index);
      
      if (index === 0) { // "You" selected (wrong answer)
        if (wrongAttempts === 0) {
          setArgumentAlertMessage("🥲 No That's Wrong! try again");
          setArgumentAlertColor("red");
          setShowArgumentAlert(true);
          setWrongAttempts(1);
          setTimeout(() => {
            setShowArgumentAlert(false);
            setSelectedAnswer(null);
          }, 2000);
        } else if (wrongAttempts === 1) {
          setArgumentAlertMessage("please kannamma select Another option 🫣");
          setArgumentAlertColor("yellow");
          setShowArgumentAlert(true);
          setWrongAttempts(2);
          setTimeout(() => {
            setShowArgumentAlert(false);
            setSelectedAnswer(null);
          }, 2000);
        } else if (wrongAttempts === 2) {
          setArgumentAlertMessage("Okay! that's fine 😓");
          setArgumentAlertColor("yellow");
          setShowArgumentAlert(true);
          setHasAnswered(true);
          onAnswer(false);
          setTimeout(() => {
            setShowArgumentAlert(false);
            handleNext();
          }, 2000);
        }
      } else { // "Me" selected (correct answer)
        setHasAnswered(true);
        onAnswer(true);
        setArgumentAlertMessage("yeah that correct !");
        setArgumentAlertColor("yellow");
        setShowArgumentAlert(true);
        setTimeout(() => {
          setShowArgumentAlert(false);
          handleNext();
        }, 2000);
      }
      return;
    }
    
    // Special handling for Noted question
    if (question.isNotedQuestion) {
      setSelectedAnswer(index);
      setHasAnswered(true);
      onAnswer(true); // Always count as correct
      setShowNoted(true);
      return;
    }
    
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
      setShowSkull(true);
    }
  };

  const handleHeartComplete = useCallback(() => {
    setShowHeart(false);
    if (question.isValentineQuestion && onValentineYes) {
      onValentineYes();
    setShowBestAlert(false);
    setShowLoveAlert(false);
    } else {
      handleNext();
    }
  }, [question.isValentineQuestion, onValentineYes]);

  const handleSkullComplete = useCallback(() => {
    setShowSkull(false);
    handleNext();
  }, []);

  const handleNotedComplete = useCallback(() => {
    setShowNoted(false);
    handleNext();
  }, []);

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setWrongAttempts(0);
    setShowArgumentAlert(false);
    setShowBestAlert(false);
    setShowSorryAlert(false);
    setSorryNotAcceptedAttempts(0);
    setSorryNeverAttempts(0);
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
      
      {/* Skull Animation */}
      <SkullAnimation show={showSkull} onComplete={handleSkullComplete} />
      
      {/* Noted Animation */}
      <NotedAnimation 
        show={showNoted} 
        onComplete={handleNotedComplete} 
        message={question.notedMessage}
      />
      
      {/* Valentine Error Popup */}
      <ValentineErrorPopup show={showValentineError} onClose={handleCloseError} />

      {/* Love Alert */}
      <LoveAlert show={showLoveAlert} isYes={loveAlertIsYes} onComplete={() => {}} />

      {/* Header */}
      <header className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-xl text-foreground">
            Funny Quiz
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
              {question.options.map((option: string, idx: number) => {
                const isLoveQuestion = question.isLoveQuestion;
                const buttonColor = isLoveQuestion 
                  ? (idx === 0 ? "bg-green-600 hover:bg-green-700 border-green-500" : "bg-red-600 hover:bg-red-700 border-red-500")
                  : undefined;

                return (
                  <div key={idx}>
                    {isLoveQuestion ? (
                      <button
                        onClick={() => handleOptionClick(idx)}
                        disabled={selectedAnswer !== null}
                        className={`w-full px-6 py-3 rounded-lg font-heading font-semibold text-lg border-2 transition-all ${buttonColor} text-white disabled:opacity-75`}
                      >
                        {option}
                      </button>
                    ) : (
                      <OptionButton
                        label={option}
                        index={idx}
                        isSelected={selectedAnswer === idx}
                        isCorrect={idx === question.correctAnswer}
                        showResult={hasAnswered && !question.isValentineQuestion && !question.isNotedQuestion && !question.isArgumentQuestion && !question.isBestQuestion && !question.isSorryQuestion && !question.isLoveQuestion}
                        disabled={hasAnswered && !question.isValentineQuestion && !question.isNotedQuestion && !question.isArgumentQuestion && !question.isBestQuestion && !question.isSorryQuestion && !question.isLoveQuestion}
                        onClick={() => handleOptionClick(idx)}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Argument Alert */}
            {question.isArgumentQuestion && showArgumentAlert && (
              <ArgumentAlert
                message={argumentAlertMessage}
                show={showArgumentAlert}
                color={argumentAlertColor}
              />
            )}

            {/* Best Question Alert */}
            {question.isBestQuestion && showBestAlert && (
              <ArgumentAlert
                message={argumentAlertMessage}
                show={showBestAlert}
                color={argumentAlertColor}
              />
            )}

            {/* Sorry Question Alert */}
            {question.isSorryQuestion && showSorryAlert && (
              <ArgumentAlert
                message={sorryAlertMessage}
                show={showSorryAlert}
                color={sorryAlertColor}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizCard;
