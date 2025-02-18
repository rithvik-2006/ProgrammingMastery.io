"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"
import Navbar from "@/components/Navbar"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const dbmsQuiz: Question[] = [
  {
    id: 1,
    question: "What does DBMS stand for?",
    options: [
      "Data Backup Management System",
      "Database Management System",
      "Data of Binary Management System",
      "Database Management Service"
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which of the following is NOT a characteristic of a DBMS?",
    options: [
      "Data redundancy",
      "Data integrity",
      "Data security",
      "Data independence"
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "Who is credited with creating the first DBMS?",
    options: [
      "Edgar Frank Codd",
      "Charles Bachman",
      "Charles Babbage",
      "Sharon B. Codd"
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Which of the following is a type of database model?",
    options: [
      "Hierarchical",
      "Network",
      "Relational",
      "All of the above"
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Standard Query Language",
      "System Query Language"
    ],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "What is a primary key in a database?",
    options: [
      "The first column in a table",
      "A unique identifier for each record in a table",
      "The most important data in a table",
      "A key that opens the database"
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "What is normalization in database design?",
    options: [
      "The process of creating tables",
      "The process of organizing data to reduce redundancy",
      "The process of adding more data to tables",
      "The process of deleting unnecessary data"
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Which of the following is NOT a type of database index?",
    options: ["Clustered", "Non-clustered", "Bitmap", "Alphabetical"],
    correctAnswer: 3,
  },
  {
    id: 10,
    question: "What is a transaction in DBMS?",
    options: [
      "A unit of work performed in a database",
      "A financial operation",
      "A type of table",
      "A database backup"
    ],
    correctAnswer: 0,
  },
  {
    id: 11,
    question: "Which property ensures that a transaction is completed entirely or not at all?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correctAnswer: 0,
  },
  {
    id: 12,
    question: "What is a foreign key?",
    options: [
      "A key from another country",
      "A primary key in another table",
      "A unique key in the same table",
      "A key that is not important"
    ],
    correctAnswer: 1,
  },
  {
    id: 13,
    question: "What does ACID stand for in the context of database transactions?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Availability, Consistency, Integration, Distribution",
      "Accuracy, Completeness, Integrity, Dependency",
      "Aggregation, Calculation, Indexing, Deletion"
    ],
    correctAnswer: 0,
  },
  {
    id: 14,
    question: "Which of the following is NOT a type of database user?",
    options: [
      "Database Administrator",
      "Application Programmer",
      "Casual User",
      "Database Encoder"
    ],
    correctAnswer: 3,
  },
  {
    id: 15,
    question: "What is the purpose of the COMMIT command in SQL?",
    options: [
      "To start a new transaction",
      "To save the changes made in a transaction",
      "To undo the changes made in a transaction",
      "To delete a transaction"
    ],
    correctAnswer: 1,
  }
]

export default function DBMSQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === dbmsQuiz[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const moveToNextQuestion = () => {
    if (currentQuestion + 1 < dbmsQuiz.length) {
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

  const currentQuestionData = dbmsQuiz[currentQuestion]

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl mb-4">
            Your score: {score} out of {dbmsQuiz.length}
          </p>
          <p className="mb-4">
            {score === dbmsQuiz.length
              ? "Perfect score! You're a DBMS expert!"
              : `You got ${score} questions correct. Keep learning!`}
          </p>
          <Button onClick={restartQuiz}>Restart Quiz</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar/>
      <Card className="w-full my-7 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Database Management Systems (DBMS) Quiz</CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {dbmsQuiz.length}
          </CardDescription>
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
                    <span>
                      Incorrect. The correct answer is: {currentQuestionData.options[currentQuestionData.correctAnswer]}
                    </span>
                  </div>
                )}
              </div>
              <Button onClick={moveToNextQuestion} className="mt-4">
                {currentQuestion + 1 === dbmsQuiz.length ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}