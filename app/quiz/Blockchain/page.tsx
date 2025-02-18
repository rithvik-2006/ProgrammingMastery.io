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

const blockchainQuiz: Question[] = [
  {
    id: 1,
    question: "What is a blockchain?",
    options: [
      "A type of cryptocurrency",
      "A distributed ledger technology",
      "A centralized database system",
      "A type of computer hardware"
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Who is the pseudonymous person or group credited with inventing Bitcoin and blockchain?",
    options: [
      "Vitalik Buterin",
      "Satoshi Nakamoto",
      "Charlie Lee",
      "Nick Szabo"
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the primary purpose of a consensus mechanism in blockchain?",
    options: [
      "To encrypt data",
      "To validate and agree on the state of the network",
      "To store transaction data",
      "To create new cryptocurrencies"
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Which of the following is NOT a characteristic of blockchain technology?",
    options: [
      "Decentralization",
      "Transparency",
      "Immutability",
      "Centralized control"
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What is a smart contract?",
    options: [
      "A legal document",
      "A self-executing contract with the terms directly written into code",
      "A contract between two blockchain companies",
      "A contract that uses artificial intelligence"
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Which consensus algorithm does Bitcoin use?",
    options: [
      "Proof of Stake (PoS)",
      "Proof of Work (PoW)",
      "Delegated Proof of Stake (DPoS)",
      "Practical Byzantine Fault Tolerance (PBFT)"
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "What is a 51% attack in blockchain?",
    options: [
      "When 51% of users leave a blockchain network",
      "When a single entity controls more than 51% of the network's mining power",
      "When 51% of transactions fail",
      "When 51% of nodes are offline"
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "What is the purpose of a public key in blockchain transactions?",
    options: [
      "To sign transactions",
      "To decrypt messages",
      "To receive funds",
      "To create new blocks"
    ],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "What is a fork in blockchain technology?",
    options: [
      "A type of cryptocurrency",
      "A split in the blockchain resulting in two separate chains",
      "A method of mining new coins",
      "A way to reverse transactions"
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Which of the following is NOT a common use case for blockchain technology?",
    options: [
      "Supply chain management",
      "Voting systems",
      "Financial transactions",
      "Centralized data storage"
    ],
    correctAnswer: 3,
  },
  {
    id: 11,
    question: "What is the block time in a blockchain?",
    options: [
      "The time it takes to create a new cryptocurrency",
      "The average time between blocks being added to the chain",
      "The expiration time of a smart contract",
      "The time it takes to mine one coin"
    ],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "What is a permissioned blockchain?",
    options: [
      "A blockchain where anyone can participate",
      "A blockchain where participation is restricted to authorized entities",
      "A blockchain that requires payment to join",
      "A blockchain that only governments can use"
    ],
    correctAnswer: 1,
  },
  {
    id: 13,
    question: "What is the function of a node in a blockchain network?",
    options: [
      "To create new cryptocurrencies",
      "To store and validate the blockchain",
      "To write smart contracts",
      "To regulate the price of cryptocurrencies"
    ],
    correctAnswer: 1,
  },
  {
    id: 14,
    question: "What is a hash in the context of blockchain?",
    options: [
      "A type of blockchain attack",
      "A fixed-length string of characters representing data of arbitrary size",
      "A method of encrypting private keys",
      "A type of smart contract"
    ],
    correctAnswer: 1,
  },
  {
    id: 15,
    question: "What is the primary difference between a public and private blockchain?",
    options: [
      "Public blockchains are faster",
      "Private blockchains are more secure",
      "Public blockchains are open to anyone, while private blockchains restrict access",
      "Private blockchains don't use cryptocurrencies"
    ],
    correctAnswer: 2,
  }
]

export default function BlockchainQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === blockchainQuiz[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const moveToNextQuestion = () => {
    if (currentQuestion + 1 < blockchainQuiz.length) {
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

  const currentQuestionData = blockchainQuiz[currentQuestion]

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl mb-4">
            Your score: {score} out of {blockchainQuiz.length}
          </p>
          <p className="mb-4">
            {score === blockchainQuiz.length
              ? "Perfect score! You're a Blockchain expert!"
              : `You got ${score} questions correct. Keep learning about blockchain technology!`}
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
          <CardTitle>Blockchain Technology Quiz</CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {blockchainQuiz.length}
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
                {currentQuestion + 1 === blockchainQuiz.length ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}