"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"

interface UserProgress {
  quizzesTaken: number
  averageScore: number
  topicsCompleted: string[]
}

const dummyUserProgress: UserProgress = {
  quizzesTaken: 15,
  averageScore: 75,
  topicsCompleted: ["Sorting Algorithms", "Binary Trees", "Dynamic Programming"],
}

export default function ProfilePage() {
  const [userProgress, setUserProgress] = useState<UserProgress>(dummyUserProgress)

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar/>
      <Card className="w-full my-7 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Progress Summary</h3>
              <p>Quizzes Taken: {userProgress.quizzesTaken}</p>
              <p>Average Score: {userProgress.averageScore}%</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Completed Topics</h3>
              <ul className="list-disc list-inside">
                {userProgress.topicsCompleted.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
            <Button>Start New Quiz</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

