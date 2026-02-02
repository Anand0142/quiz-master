import { useState, useCallback } from "react";
import { quizQuestions } from "@/data/quizQuestions";
import QuizCard from "@/components/quiz/QuizCard";
import QuizResults from "@/components/quiz/QuizResults";
import ValentineSuccess from "@/components/quiz/ValentineSuccess";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showValentineSuccess, setShowValentineSuccess] = useState(false);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentQuestionIndex]);

  const handleValentineYes = useCallback(() => {
    setShowValentineSuccess(true);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsCompleted(false);
    setShowValentineSuccess(false);
  }, []);

  if (showValentineSuccess) {
    return (
      <ValentineSuccess
        score={score}
        total={quizQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  if (isCompleted) {
    return (
      <QuizResults
        score={score}
        total={quizQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <QuizCard
      question={quizQuestions[currentQuestionIndex]}
      currentIndex={currentQuestionIndex}
      totalQuestions={quizQuestions.length}
      score={score}
      onAnswer={handleAnswer}
      onNext={handleNext}
      isLastQuestion={currentQuestionIndex === quizQuestions.length - 1}
      onValentineYes={handleValentineYes}
    />
  );
};

export default Index;
