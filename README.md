# XENO - Interactive Quiz Platform- https://xeno-rho.vercel.app/

XENO is a web-based interactive quiz platform designed to test and enhance your knowledge on various subjects. It features a timed quiz with performance analysis and a review of your answers.

## Features and Functionality

*   **Interactive Quizzes:** Engage with multiple-choice questions.
*   **Timed Quiz:** The quiz is timed, adding an element of challenge. A timer is displayed, and the quiz ends when time runs out (120 seconds total time).
*   **Progress Bar:** Visual representation of your progress through the quiz.
*   **Score Tracking:** Real-time score calculation based on correct answers.
*   **Performance Analysis:** Post-quiz analysis including average time per question and a speed rating based on how quickly questions are answered.
*   **Review Answers:** Review your answers after completing the quiz, showing correct answers and your selections.
*   **Dark/Light Mode:** Toggle between light and dark themes for optimal viewing experience. The theme is persisted using local storage.
*   **Responsive Design:**  The platform is designed to be responsive and works on various screen sizes.
*   **Navigation:** Easy navigation with "Exit Quiz" button to return to the landing page.
*   **404 Handling:** Graceful handling of non-existent routes, directing users back to the homepage.

## Technology Stack

*   **React:**  JavaScript library for building the user interface.
*   **TypeScript:** Superset of JavaScript, adding static typing.
*   **Vite:**  Build tool for fast development.
*   **React Router:**  For client-side routing and navigation.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **Radix UI:**  Set of unstyled, accessible UI primitives.
*   **lucide-react:**  Icons library.
*   **clsx & tailwind-merge:** Utilities for constructing class names.
*   **react-day-picker:** Calendar component
*   **embla-carousel-react:** Carousel component
*   **recharts:** Charting library
*   **input-otp:** OTP Input component
*   **vaul:** Drawer component
*   **react-resizable-panels:** Resizable panels component
*   **@radix-ui/react-scroll-area:** Scroll area component
*   **cmdk:** Command Palette component
*   **sonner:** Toast notifications component
*   **next-themes:** Theme management
*   **react-hook-form:** Form management
*   **@tanstack/react-query:** Data fetching and caching.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** (Version 16 or higher recommended)  Download from [nodejs.org](https://nodejs.org/)
*   **npm** or **yarn:** Package managers included with Node.js, or install yarn from [yarnpkg.com](https://yarnpkg.com/)

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Blazehue/XENO.git
    cd XENO
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

## Usage Guide

1.  **Start the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    Or using yarn:

    ```bash
    yarn dev
    ```

2.  **Open in your browser:**

    Navigate to `http://localhost:5173` (or the port specified in the console output) to view the application.

3.  **Take the Quiz:**

    *   Click the "PRESS THIS BUTTON TO START THE QUIZ!" button on the landing page (`src/pages/Landing.tsx`) to start the quiz.
    *   Answer the multiple-choice questions within the given time limit.
    *   A progress bar at the top indicates your current question.
    *   Click the "Next Question" button to proceed.  The text changes to "Finish Quiz" on the last question (`src/components/QuizCard.tsx`).
    *   Once the quiz is complete or time runs out, your score and a performance analysis are displayed.

4.  **Review Your Answers:**

    *   After completing the quiz, click the "Review Answers" button to see a detailed review of your responses.

5.  **Restart the Quiz:**

    *   Click the "Try Again" button to restart the quiz with a fresh timer.

6.  **Toggle Theme**

    *   Click the theme toggle button (Sun/Moon icon) to switch between light and dark modes.

## API Documentation

There are no external API endpoints used in this project. The quiz questions are stored locally in `src/data/quizData.ts`.

## Contributing Guidelines

Contributions are welcome! Here's how you can contribute:

1.  **Fork the repository.**
2.  **Create a new branch for your feature or bug fix:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

3.  **Make your changes and commit them:**

    ```bash
    git add .
    git commit -m "Add: Description of your changes"
    ```

4.  **Push your changes to your forked repository:**

    ```bash
    git push origin feature/your-feature-name
    ```

5.  **Create a pull request to the `main` branch of the original repository.**

Please ensure your code follows the existing style guidelines and includes appropriate tests.

## License Information

License not specified.

## Contact/Support Information

For questions or support, please contact the repository owner through GitHub.
