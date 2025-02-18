"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const aiQuiz: Question[] = [
  {
    id: 1,
    question: "What is the primary goal of Artificial Intelligence?",
    options: [
      "To create robots",
      "To implement human intelligence in machines",
      "To automate repetitive tasks",
      "To enhance data processing speeds",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which programming language is most commonly used for AI development?",
    options: ["Java", "Python", "C++", "PHP"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Who is known as the 'Father of Artificial Intelligence'?",
    options: ["Alan Turing", "John McCarthy", "Marvin Minsky", "Andrew Ng"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "What does NLP stand for in AI?",
    options: [
      "Natural Language Programming",
      "Neural Language Processing",
      "Natural Language Processing",
      "None of the above",
    ],
    correctAnswer: 2,
  },
];

export default function AIQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === aiQuiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const moveToNextQuestion = () => {
    if (currentQuestion + 1 < aiQuiz.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  const currentQuestionData = aiQuiz[currentQuestion];

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl mb-4">Your score: {score} out of {aiQuiz.length}</p>
          <Button onClick={restartQuiz}>Restart Quiz</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <Card className="w-full my-7 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AI & Core Concepts Quiz</CardTitle>
          <CardDescription>Question {currentQuestion + 1} of {aiQuiz.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{currentQuestionData.question}</p>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => handleAnswer(Number.parseInt(value))}
            className="space-y-2"
          >
            {currentQuestionData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {!showExplanation && (
            <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="mt-4">
              Check Answer
            </Button>
          )}
          {showExplanation && (
            <div className="mt-4">
              <div className={`p-4 rounded-md ${selectedAnswer === currentQuestionData.correctAnswer ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}>
                {selectedAnswer === currentQuestionData.correctAnswer ? (
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" />
                    <span>Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <XCircle className="text-red-500 mr-2" />
                    <span>Incorrect. The correct answer is: {currentQuestionData.options[currentQuestionData.correctAnswer]}</span>
                  </div>
                )}
              </div>
              <Button onClick={moveToNextQuestion} className="mt-4">
                {currentQuestion + 1 === aiQuiz.length ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
