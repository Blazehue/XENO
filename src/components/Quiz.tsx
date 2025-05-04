
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { quizQuestions } from "../data/quizData";
import { QuizState, QuestionResult, QuestionPerformance } from "../types/quiz";
import QuizCard from "./QuizCard";
import ProgressBar from "./ProgressBar";
import QuizResults from "./QuizResults";
import QuizReview from "./QuizReview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const TOTAL_TIME = 120;

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  const initialState: QuizState = {
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: Array(quizQuestions.length).fill(null),
    quizComplete: false,
    answeredQuestions: [],
    questionPerformance: [],
    remainingTime: TOTAL_TIME,
    quizStartTime: Date.now(),
  };
  
  const [quizState, setQuizState] = useState<QuizState>(initialState);
  const [showReview, setShowReview] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  useEffect(() => {
    if (quizState.quizComplete || showReview) return;
    
    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.remainingTime <= 1) {
          clearInterval(timer);
          return {
            ...prev,
            quizComplete: true,
            remainingTime: 0
          };
        }
        return {
          ...prev,
          remainingTime: prev.remainingTime - 1
        };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizState.quizComplete, showReview]);
  
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [quizState.currentQuestionIndex]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleAnswer = useCallback((selectedOption: number) => {
    const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    const endTime = Date.now();
    const timeTaken = (endTime - questionStartTime) / 1000;
    
    let performanceRating = 5;
    
    if (timeTaken > 20) performanceRating = 1;
    else if (timeTaken > 15) performanceRating = 2;
    else if (timeTaken > 10) performanceRating = 3;
    else if (timeTaken > 5) performanceRating = 4;
    
    const newUserAnswers = [...quizState.userAnswers];
    newUserAnswers[quizState.currentQuestionIndex] = selectedOption;
    
    const newPerformance: QuestionPerformance = {
      questionIndex: quizState.currentQuestionIndex,
      timeTaken,
      performanceRating,
      isCorrect
    };
    
    const newAnsweredQuestions = [...quizState.answeredQuestions, quizState.currentQuestionIndex];
    
    setQuizState(prevState => ({
      ...prevState,
      score: isCorrect ? prevState.score + 1 : prevState.score,
      userAnswers: newUserAnswers,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      quizComplete: prevState.currentQuestionIndex === quizQuestions.length - 1,
      answeredQuestions: newAnsweredQuestions,
      questionPerformance: [...prevState.questionPerformance, newPerformance]
    }));
    
    setQuestionStartTime(Date.now());
  }, [questionStartTime, quizState.currentQuestionIndex, quizState.answeredQuestions, quizState.questionPerformance, quizState.userAnswers]);
  
  const restartQuiz = () => {
    setQuizState({
      ...initialState,
      quizStartTime: Date.now(),
      remainingTime: TOTAL_TIME
    });
    setShowReview(false);
    setQuestionStartTime(Date.now());
  };
  
  const toggleReview = () => {
    setShowReview(!showReview);
  };
  
  const exitQuiz = () => {
    navigate('/');
  };
  
  const getQuizResults = (): QuestionResult[] => {
    return quizState.answeredQuestions.map(index => {
      const question = quizQuestions[index];
      const userAnswer = quizState.userAnswers[index] as number;
      const performance = quizState.questionPerformance.find(p => p.questionIndex === index);
      
      return {
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: userAnswer === question.correctAnswer,
        timeTaken: performance?.timeTaken || 0,
        performanceRating: performance?.performanceRating || 0
      };
    });
  };
  
  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex === quizQuestions.length - 1;
  
  if (showReview && quizState.quizComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 border-[20px] border-purple-500/10 animate-pulse rounded-3xl"></div>
          <div className="absolute inset-4 border-[15px] border-purple-400/5 animate-pulse rounded-3xl" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-8 border-[10px] border-purple-300/5 animate-pulse rounded-3xl" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <QuizReview 
          results={getQuizResults()}
          onBack={toggleReview}
          quizQuestions={quizQuestions}
        />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 border-[20px] border-purple-500/10 animate-pulse rounded-3xl"></div>
        <div className="absolute inset-4 border-[15px] border-purple-400/5 animate-pulse rounded-3xl" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute inset-8 border-[10px] border-purple-300/5 animate-pulse rounded-3xl" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={exitQuiz}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Exit Quiz</span>
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      
      <div className="w-full max-w-xl mb-8 z-10">
        <h1 className="text-3xl font-bold text-center text-quiz-dark dark:text-white mb-6">
          Mini Quiz
        </h1>
        
        <div className="mb-4 text-center">
          <span className={`font-bold text-xl ${quizState.remainingTime < 30 ? 'text-red-500 animate-pulse' : ''}`}>
            Time Remaining: {formatTime(quizState.remainingTime)}
          </span>
        </div>
        
        {!quizState.quizComplete ? (
          <>
            <ProgressBar 
              currentQuestion={quizState.currentQuestionIndex + 1} 
              totalQuestions={quizQuestions.length} 
            />
            
            <QuizCard 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              isLastQuestion={isLastQuestion}
              currentQuestionIndex={quizState.currentQuestionIndex}
              totalQuestions={quizQuestions.length}
            />
          </>
        ) : (
          <QuizResults 
            score={quizState.score} 
            totalQuestions={quizQuestions.length} 
            onRestart={restartQuiz}
            onReview={toggleReview}
            performance={quizState.questionPerformance}
            totalTime={TOTAL_TIME - quizState.remainingTime}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
