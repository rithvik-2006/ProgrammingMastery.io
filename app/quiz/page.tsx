"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const sampleQuiz: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of quicksort in the average case?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which data structure is typically used to implement a priority queue?",
    options: ["Array", "Linked List", "Binary Search Tree", "Heap"],
    correctAnswer: 3,
  },
  {
    id: 3,
    question: "What is the primary advantage of using a hash table?",
    options: [
      "Ordered data storage",
      "Constant-time average case for insert and lookup",
      "Guaranteed worst-case performance",
      "Low memory usage",
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "In the context of graph algorithms, what does DFS stand for?",
    options: ["Data Flow Search", "Depth-First Search", "Direct Feedback System", "Distributed File System"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Which of the following is NOT a principle of object-oriented programming?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Fragmentation"],
    correctAnswer: 3,
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === sampleQuiz[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const moveToNextQuestion = () => {
    if (currentQuestion + 1 < sampleQuiz.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
  }

  const currentQuestionData = sampleQuiz[currentQuestion]
  const progress = ((currentQuestion + 1) / sampleQuiz.length) * 100

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl mb-4">
            Your score: {score} out of {sampleQuiz.length}
          </p>
          <Progress value={(score / sampleQuiz.length) * 100} className="w-full h-3 mb-4" />
          <p className="mb-4">
            {score === sampleQuiz.length
              ? "Perfect score! You've mastered these concepts."
              : `You got ${score} questions correct. Keep practicing to improve your skills!`}
          </p>
          <Button onClick={restartQuiz}>Restart Quiz</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Advanced Programming Concepts Quiz</CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {sampleQuiz.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full h-3 mb-4" />
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
              <div
                className={`p-4 rounded-md ${selectedAnswer === currentQuestionData.correctAnswer ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}
              >
                {selectedAnswer === currentQuestionData.correctAnswer ? (
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" />
                    <span>Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <XCircle className="text-red-500 mr-2" />
                    <span>
                      Incorrect. The correct answer is: {currentQuestionData.options[currentQuestionData.correctAnswer]}
                    </span>
                  </div>
                )}
              </div>
              <Button onClick={moveToNextQuestion} className="mt-4">
                {currentQuestion + 1 === sampleQuiz.length ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

