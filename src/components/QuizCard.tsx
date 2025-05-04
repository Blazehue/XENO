
import React, { useState, useEffect } from "react";
import { QuizQuestion } from "../types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (selectedOption: number) => void;
  isLastQuestion: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  isLastQuestion,
  currentQuestionIndex,
  totalQuestions
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowFeedback(false);
  }, [question]);

  const handleOptionSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null && !isAnswered) {
      setIsAnswered(true);
      setShowFeedback(true);
      
      // Add a short delay before moving to the next question
      setTimeout(() => {
        onAnswer(selectedOption);
        setShowFeedback(false);
      }, 1000);
    }
  };

  return (
    <Card className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg transition-all">
      <CardHeader className="bg-quiz-primary text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
        </div>
        <CardTitle className="text-xl mt-2">{question.question}</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-4 text-left rounded-lg transition-all ${
                selectedOption === index 
                  ? showFeedback 
                    ? index === question.correctAnswer 
                      ? "bg-quiz-correct text-white" 
                      : "bg-quiz-incorrect text-white" 
                    : "bg-quiz-light dark:bg-purple-900/30 border-2 border-quiz-primary"
                  : "bg-gray-50 dark:bg-gray-700 dark:text-white hover:bg-quiz-light dark:hover:bg-purple-900/30"
              }`}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="w-full">
          <Button 
            className="w-full bg-quiz-primary hover:bg-quiz-secondary" 
            onClick={handleSubmit}
            disabled={selectedOption === null || isAnswered}
          >
            {isLastQuestion ? "Finish Quiz" : "Next Question"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
