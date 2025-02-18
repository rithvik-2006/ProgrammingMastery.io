"use client";

import { useState } from "react";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import PrismStyle from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface DocItem {
  id: number;
  title: string;
  content: string;
  code?: string;
}

const dummyDocs: DocItem[] = [
  {
    id: 1,
    title: "Arrays",
    content:
      "Arrays are fundamental data structures that store elements of the same type in contiguous memory locations",
    code: "```python\nmy_array = [1, 2, 3, 4, 5]\nprint(my_array[2])  # Accessing element at index 2\nmy_array.append(6)  # Adding an element to the end\n```",
  },
  {
    id: 2,
    title: "Binary Search",
    content:
      "Binary Search is an efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half.",
    code: "```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n```",
  },
  {
    id: 3,
    title: "Bubble Sort",
    content:
      "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    code: "```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n```",
  },
  {
    id: 4,
    title: "Linked Lists",
    content:
      "Linked lists consist of nodes, where each node contains data and a reference to the next node.",
    code: "```python\nclass Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n    def append(self, data):\n        new_node = Node(data)\n        if not self.head:\n            self.head = new_node\n            return\n        current = self.head\n        while current.next:\n            current = current.next\n        current.next = new_node\n```",
  },
  {
    id: 5,
    title: "Stacks",
    content:
      "Stacks follow the Last-In-First-Out (LIFO) principle and are useful for managing function calls and undo operations.",
    code: "```python\nclass Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        if not self.is_empty():\n            return self.items.pop()\n\n    def is_empty(self):\n        return len(self.items) == 0\n```",
  },
  {
    id: 6,
    title: "Queues",
    content:
      "Queues follow the First-In-First-Out (FIFO) principle and are used in breadth-first search algorithms and task scheduling.",
    code: "```python\nfrom collections import deque\n\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n\n    def enqueue(self, item):\n        self.items.append(item)\n\n    def dequeue(self):\n        if not self.is_empty():\n            return self.items.popleft()\n\n    def is_empty(self):\n        return len(self.items) == 0\n```",
  },
];

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);

  const filteredDocs = dummyDocs.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <Card className="w-full my-7 max-w-4xl mx-auto">
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
                    <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                        style={
                          {
                          ...dark,
                          'code[class*="language-"]': {
                            background: 'inherit',
                          },
                          } as unknown as PrismStyle
                        }
                        language={match[1]}
                        PreTag="div"
                        {...props}
                        >
                        {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                        {children}
                        </code>
                      );
                      },
                    }}
                    >
                    {selectedDoc.code}
                    </ReactMarkdown>
                </>
              ) : (
                <p>Select a topic to view its content.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
