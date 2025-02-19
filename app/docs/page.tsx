// "use client";

// import { useState } from "react";
// import {
//   Prism as SyntaxHighlighter,
//   SyntaxHighlighterProps,
// } from "react-syntax-highlighter";
// import PrismStyle from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Navbar from "@/components/Navbar";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// interface DocItem {
//   id: number;
//   title: string;
//   content: string;
//   code?: string;
// }

// const dummyDocs: DocItem[] = [
//   {
//     id: 1,
//     title: "Arrays",
//     content:
//       "Arrays are fundamental data structures that store elements of the same type in contiguous memory locations",
//     code: "```python\nmy_array = [1, 2, 3, 4, 5]\nprint(my_array[2])  # Accessing element at index 2\nmy_array.append(6)  # Adding an element to the end\n```",
//   },
//   {
//     id: 2,
//     title: "Binary Search",
//     content:
//       "Binary Search is an efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half.",
//     code: "```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n```",
//   },
//   {
//     id: 3,
//     title: "Bubble Sort",
//     content:
//       "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
//     code: "```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n```",
//   },
//   {
//     id: 4,
//     title: "Linked Lists",
//     content:
//       "Linked lists consist of nodes, where each node contains data and a reference to the next node.",
//     code: "```python\nclass Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n    def append(self, data):\n        new_node = Node(data)\n        if not self.head:\n            self.head = new_node\n            return\n        current = self.head\n        while current.next:\n            current = current.next\n        current.next = new_node\n```",
//   },
//   {
//     id: 5,
//     title: "Stacks",
//     content:
//       "Stacks follow the Last-In-First-Out (LIFO) principle and are useful for managing function calls and undo operations.",
//     code: "```python\nclass Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        if not self.is_empty():\n            return self.items.pop()\n\n    def is_empty(self):\n        return len(self.items) == 0\n```",
//   },
//   {
//     id: 6,
//     title: "Queues",
//     content:
//       "Queues follow the First-In-First-Out (FIFO) principle and are used in breadth-first search algorithms and task scheduling.",
//     code: "```python\nfrom collections import deque\n\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n\n    def enqueue(self, item):\n        self.items.append(item)\n\n    def dequeue(self):\n        if not self.is_empty():\n            return self.items.popleft()\n\n    def is_empty(self):\n        return len(self.items) == 0\n```",
//   },
// ];

// export default function DocsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);

//   const filteredDocs = dummyDocs.filter((doc) =>
//     doc.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Navbar />
//       <Card className="w-full my-7 max-w-4xl mx-auto">
//         <CardHeader>
//           <CardTitle>Documentation</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex space-x-2 mb-4">
//             <Input
//               type="text"
//               placeholder="Search documentation..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Button onClick={() => setSearchTerm("")}>Clear</Button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="border-r pr-4">
//               <h3 className="text-lg font-semibold mb-2">Topics</h3>
//               {filteredDocs.map((doc) => (
//                 <div
//                   key={doc.id}
//                   className="cursor-pointer hover:bg-secondary p-2 rounded"
//                   onClick={() => setSelectedDoc(doc)}
//                 >
//                   {doc.title}
//                 </div>
//               ))}
//             </div>
//             <div>
//               {selectedDoc ? (
//                 <>
//                     <ReactMarkdown
//                     remarkPlugins={[remarkGfm]}
//                     components={{
//                       code({ node, className, children, ...props }) {
//                       const match = /language-(\w+)/.exec(className || "");
//                       return match ? (
//                         <SyntaxHighlighter
//                         style={
//                           {
//                           ...dark,
//                           'code[class*="language-"]': {
//                             background: 'inherit',
//                           },
//                           } as unknown as PrismStyle
//                         }
//                         language={match[1]}
//                         PreTag="div"
//                         {...props}
//                         >
//                         {String(children).replace(/\n$/, "")}
//                         </SyntaxHighlighter>
//                       ) : (
//                         <code className={className} {...props}>
//                         {children}
//                         </code>
//                       );
//                       },
//                     }}
//                     >
//                     {selectedDoc.code}
//                     </ReactMarkdown>
//                 </>
//               ) : (
//                 <p>Select a topic to view its content.</p>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
      "Arrays are fundamental data structures that store elements of the same type in contiguous memory locations.",
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
  {
    id: 7,
    title: "Merge Sort",
    content:
      "Merge Sort is a divide-and-conquer algorithm that splits an array into halves, recursively sorts them, and then merges them back together.",
    code: "```python\ndef merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        left = arr[:mid]\n        right = arr[mid:]\n\n        merge_sort(left)\n        merge_sort(right)\n\n        i = j = k = 0\n        while i < len(left) and j < len(right):\n            if left[i] < right[j]:\n                arr[k] = left[i]\n                i += 1\n            else:\n                arr[k] = right[j]\n                j += 1\n            k += 1\n\n        while i < len(left):\n            arr[k] = left[i]\n            i += 1\n            k += 1\n\n        while j < len(right):\n            arr[k] = right[j]\n            j += 1\n            k += 1\n```",
  },
  {
    id: 8,
    title: "Quick Sort",
    content:
      "Quick Sort is a divide-and-conquer algorithm that selects a pivot, partitions the array, and recursively sorts the partitions.",
    code: "```python\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n```",
  },
  {
    id: 9,
    title: "Graph BFS",
    content:
      "Breadth-First Search (BFS) is a graph traversal algorithm that explores all neighbors before moving to the next level.",
    code: "```python\nfrom collections import deque\n\ndef bfs(graph, start):\n    visited = set()\n    queue = deque([start])\n    while queue:\n        vertex = queue.popleft()\n        if vertex not in visited:\n            print(vertex, end=' ')\n            visited.add(vertex)\n            queue.extend(graph[vertex])\n```",
  },
  {
    id: 10,
    title: "Graph DFS",
    content:
      "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along a branch before backtracking.",
    code: "```python\ndef dfs(graph, vertex, visited=None):\n    if visited is None:\n        visited = set()\n    if vertex not in visited:\n        print(vertex, end=' ')\n        visited.add(vertex)\n        for neighbor in graph[vertex]:\n            dfs(graph, neighbor, visited)\n```",
  },
  {
    id: 11,
    title: "Bubble Sort",
    content:
      "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    code: "```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n```",
  },
  {
    id: 12,
    title: "Selection Sort",
    content:
      "Selection Sort repeatedly finds the minimum element and places it in the correct position.",
    code: "```python\ndef selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i+1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n```",
  },
  {
    id: 13,
    title: "Insertion Sort",
    content:
      "Insertion Sort builds a sorted list one element at a time by inserting elements into their correct position.",
    code: "```python\ndef insertion_sort(arr):\n    n = len(arr)\n    for i in range(1, n):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n```",
  },
  {
    id: 14,
    title: "Heap Sort",
    content:
      "Heap Sort is a comparison-based sorting algorithm that uses a binary heap structure to sort elements.",
    code: "```python\ndef heapify(arr, n, i):\n    largest = i\n    left = 2 * i + 1\n    right = 2 * i + 2\n    if left < n and arr[largest] < arr[left]:\n        largest = left\n    if right < n and arr[largest] < arr[right]:\n        largest = right\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)\n\ndef heap_sort(arr):\n    n = len(arr)\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(arr, n, i)\n    for i in range(n - 1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]\n        heapify(arr, i, 0)\n    return arr\n```"
  }
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
                  <p>{selectedDoc.content}</p>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                          <SyntaxHighlighter
                            style={{ ...dark, 'code[class*="language-"]': { background: 'inherit' } }}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>{children}</code>
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
