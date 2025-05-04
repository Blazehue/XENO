
import React from "react";
import { QuestionResult, QuizQuestion } from "../types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface QuizReviewProps {
  results: QuestionResult[];
  onBack: () => void;
  quizQuestions: QuizQuestion[];
}

const QuizReview: React.FC<QuizReviewProps> = ({ results, onBack, quizQuestions }) => {
  return (
    <div className="w-full max-w-xl z-10">
      <Card className="w-full mb-6 bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader className="bg-quiz-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl">Quiz Review</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {results.map((result, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2 dark:text-white">Question {index + 1}</h3>
                <p className="mb-3 dark:text-gray-300">{result.question}</p>
                
                <div className="space-y-2">
                  {quizQuestions[index].options.map((option, optionIndex) => (
                    <div 
                      key={optionIndex}
                      className={`p-3 rounded-lg ${
                        optionIndex === result.correctAnswer
                          ? "bg-quiz-correct text-white"
                          : optionIndex === result.userAnswer && optionIndex !== result.correctAnswer
                            ? "bg-quiz-incorrect text-white"
                            : "bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                      {optionIndex === result.userAnswer && optionIndex !== result.correctAnswer && (
                        <span className="ml-2">← Your answer</span>
                      )}
                      {optionIndex === result.correctAnswer && (
                        <span className="ml-2">← Correct answer</span>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Performance metrics for this question */}
                <div className="mt-3 flex justify-between items-center px-2 py-1 bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="text-sm dark:text-gray-300">
                    <span className="font-medium">Time:</span> {result.timeTaken.toFixed(1)}s
                  </div>
                  <div className="text-sm">
                    <span className="font-medium dark:text-gray-300">Speed Rating:</span> {Array(result.performanceRating).fill('⭐').join('')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full flex items-center justify-center gap-2 bg-quiz-primary hover:bg-quiz-secondary"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back to Results
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizReview;
