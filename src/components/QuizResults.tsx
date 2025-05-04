
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionPerformance } from "../types/quiz";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onReview: () => void;
  performance: QuestionPerformance[];
  totalTime: number;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  score, 
  totalQuestions, 
  onRestart, 
  onReview,
  performance,
  totalTime
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let feedbackMessage = "";
  let feedbackClass = "";
  
  if (percentage >= 80) {
    feedbackMessage = "Excellent! You're a quiz master!";
    feedbackClass = "text-quiz-correct";
  } else if (percentage >= 60) {
    feedbackMessage = "Good job! You know your stuff!";
    feedbackClass = "text-blue-500";
  } else if (percentage >= 40) {
    feedbackMessage = "Not bad, but there's room for improvement.";
    feedbackClass = "text-yellow-500";
  } else {
    feedbackMessage = "Keep learning and try again!";
    feedbackClass = "text-quiz-incorrect";
  }
  
  // Calculate average time per question
  const averageTime = performance.length > 0
    ? performance.reduce((sum, item) => sum + item.timeTaken, 0) / performance.length
    : 0;
  
  // Calculate average performance rating
  const averageRating = performance.length > 0
    ? performance.reduce((sum, item) => sum + item.performanceRating, 0) / performance.length
    : 0;
  
  // Format the average time to 1 decimal place
  const formattedAvgTime = averageTime.toFixed(1);
  
  // Format the total time (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Card className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="bg-quiz-primary text-white rounded-t-lg text-center pb-6">
        <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold dark:text-white">
            {score} / {totalQuestions}
          </h2>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
            <div 
              className="bg-quiz-primary h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <p className="text-xl font-medium dark:text-white">{percentage}%</p>
          
          <p className={`text-lg ${feedbackClass} font-medium`}>
            {feedbackMessage}
          </p>
          
          <div className="mt-6 space-y-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold dark:text-white">Performance Analysis</h3>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Time</p>
                <p className="font-medium dark:text-white">{formatTime(totalTime)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Time per Question</p>
                <p className="font-medium dark:text-white">{formattedAvgTime}s</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Speed Rating</p>
                <p className="font-medium dark:text-white">
                  {Array(Math.round(averageRating)).fill('⭐').join('')}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Correct Answers</p>
                <p className="font-medium dark:text-white">{score} of {totalQuestions}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-3 p-6">
        <Button 
          className="w-full bg-quiz-primary hover:bg-quiz-secondary"
          onClick={onReview}
        >
          Review Answers
        </Button>
        <Button 
          className="w-full bg-quiz-secondary hover:bg-quiz-primary"
          onClick={onRestart}
        >
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
