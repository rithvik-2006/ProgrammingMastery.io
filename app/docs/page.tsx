"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DocItem {
  id: number
  title: string
  content: string
}

const dummyDocs: DocItem[] = [
  {
    id: 1,
    title: "Quick Sort Algorithm",
    content:
      "Quick Sort is a highly efficient sorting algorithm based on the divide-and-conquer approach. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot...",
  },
  {
    id: 2,
    title: "Binary Search Trees",
    content:
      "A Binary Search Tree (BST) is a node-based binary tree data structure which has the following properties: The left subtree of a node contains only nodes with keys lesser than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key...",
  },
  // Add more documentation items...
]

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null)

  const filteredDocs = dummyDocs.filter((doc) => doc.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={() => setSearchTerm("")}>Clear</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-r pr-4">
              <h3 className="text-lg font-semibold mb-2">Topics</h3>
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="cursor-pointer hover:bg-secondary p-2 rounded"
                  onClick={() => setSelectedDoc(doc)}
                >
                  {doc.title}
                </div>
              ))}
            </div>
            <div>
              {selectedDoc ? (
                <>
                  <h3 className="text-xl font-semibold mb-2">{selectedDoc.title}</h3>
                  <p>{selectedDoc.content}</p>
                </>
              ) : (
                <p>Select a topic to view its content.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

