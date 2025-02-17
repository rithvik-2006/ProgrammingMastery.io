import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-background text-foreground">
      <Navbar/>
      <h1 className="text-4xl font-bold mb-8">Welcome to Programming Mastery</h1>
      <p className="text-xl mb-8">
        Master the toughest programming concepts with interactive quizzes and comprehensive documentation.
      </p>
    </main>
  )
}

