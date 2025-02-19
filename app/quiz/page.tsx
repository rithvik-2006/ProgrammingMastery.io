"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function QuizPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <h1 className="text-2xl text-center font-bold mt-8">Choose a Quiz</h1>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
        <Card className="w-80 text-center shadow-lg p-4">
          <CardHeader>
            <CardTitle>AI Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/Quiz/AI">
              <Button className="w-full my-4">Start AI Quiz</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-80 text-center shadow-lg p-4">
          <CardHeader>
            <CardTitle>DSA Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/Quiz/DSA">
              <Button className="w-full my-4">Start DSA Quiz</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-80 text-center shadow-lg p-4">
          <CardHeader>
            <CardTitle>DBMS Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/Quiz/DBMS">
              <Button className="w-full my-4">Start DBMS Quiz</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-80 text-center shadow-lg p-4">
          <CardHeader>
            <CardTitle>Blockchain Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/Quiz/Blockchain">
              <Button className="w-full my-4">Start Blockchian Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
