
import React from "react";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions }) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
      <div 
        className="bg-quiz-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
