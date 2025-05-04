
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Landing: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#221F26] dark:bg-white text-white dark:text-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 border-[20px] border-purple-500/10 animate-pulse rounded-3xl"></div>
        <div className="absolute inset-4 border-[15px] border-purple-400/5 animate-pulse rounded-3xl" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute inset-8 border-[10px] border-purple-300/5 animate-pulse rounded-3xl" style={{ animationDelay: '1s' }}></div>
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

      <div 
        className={`transition-opacity duration-1000 ease-in-out mb-16 ${
          fadeIn ? "opacity-100" : "opacity-0"
        } z-10`}
      >
        <h1 className="text-8xl font-bold tracking-wider">XENO</h1>
      </div>
      
      <p className="text-lg text-gray-300 dark:text-gray-700 mb-8 z-10">An Interactive Quiz Platform.</p>
      
      <Link to="/quiz" className="z-10">
        <Button 
          className="bg-quiz-primary hover:bg-quiz-secondary text-white dark:text-white transition-all px-6 py-2 rounded-md hover:scale-105"
        >
          <span className="font-bold">PRESS THIS BUTTON TO START THE QUIZ!</span>
        </Button>
      </Link>
    </div>
  );
};

export default Landing;
