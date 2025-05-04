
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  userAnswers: (number | null)[];
  quizComplete: boolean;
  answeredQuestions: number[];
  questionPerformance: QuestionPerformance[];
  remainingTime: number;
  quizStartTime: number;
}

export interface QuestionResult {
  question: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timeTaken: number;
  performanceRating: number;
}

export interface QuestionPerformance {
  questionIndex: number;
  timeTaken: number;
  performanceRating: number;
  isCorrect: boolean;
}
