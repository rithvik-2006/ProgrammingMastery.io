"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="w-full flex justify-between items-center px-2">
      <Link href="/" className="text-2xl font-bold">
        Programming Mastery
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/quiz" className="hover:text-primary">
          Quiz
        </Link>
        <Link href="/ChatBot" className="hover:text-primary">
          ChatBot
        </Link>
        <Link href="/docs" className="hover:text-primary">
          Docs
        </Link>
        {/* <Link href="/profile" className="hover:text-primary">
          Profile
        </Link> */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-primary text-primary-foreground"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  )
}

