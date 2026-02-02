import { useState, useCallback } from "react";
import { quizQuestions } from "@/data/quizQuestions";
import QuizCard from "@/components/quiz/QuizCard";
import QuizResults from "@/components/quiz/QuizResults";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

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

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsCompleted(false);
  }, []);

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
    />
  );
};

export default Index;
