export const BASE_URL = import.meta.env.VITE_API_URL;
export const AUTH_PATH = "/api/v1/auth";
export const ADMIN_PATH = "/api/v1/admin";
export const DISSCUSS_PATH ="/api/v1/discuss"
export const PROBLEMS_PATH ="/api/v1/problem"

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}



export const dummyProblems = [
  {
    id: "problem-1",
    title: "Two Sum",
    description: "Find two numbers in an array that add up to a specific target.",
    difficulty: "easy",
    tags: ["array", "hashmap"],
    demo: true,
    createdBy: "user-1",
    editorial: {
      content: "Use a hash map to find complements in O(n) time.",
    },
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i], target <= 10^9",
    ],
    hints: ["Use a hash map to store the difference."],
    codeSnippets: {
      javascript: "function twoSum(nums, target) { /* ... */ }",
    },
    referenceSolutions: {
      javascript: "function twoSum(nums, target) { /* ... */ }",
    },
    testcases: [
      {
        input: "[2,7,11,15], 9",
        expectedOutput: "[0,1]",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "problem-2",
    title: "Reverse Linked List",
    description: "Reverse a singly linked list.",
    difficulty: "easy",
    tags: ["linked-list"],
    demo: false,
    createdBy: "user-2",
    editorial: {
      content: "Iteratively reverse pointers of nodes.",
    },
    examples: [
      {
        input: "1 -> 2 -> 3 -> 4 -> 5",
        output: "5 -> 4 -> 3 -> 2 -> 1",
      },
    ],
    constraints: [
      "0 <= length <= 5000",
    ],
    hints: ["Change next pointers as you iterate."],
    codeSnippets: {
      javascript: "function reverseList(head) { /* ... */ }",
    },
    referenceSolutions: {
      javascript: "function reverseList(head) { /* ... */ }",
    },
    testcases: [
      {
        input: "[1,2,3,4,5]",
        expectedOutput: "[5,4,3,2,1]",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "problem-3",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    difficulty: "medium",
    tags: ["string", "sliding-window"],
    demo: false,
    createdBy: "user-3",
    editorial: {
      content: "Use a sliding window with a Set to track characters.",
    },
    examples: [
      {
        input: '"abcabcbb"',
        output: "3",
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
    ],
    hints: ["Use sliding window to avoid duplicates."],
    codeSnippets: {
      javascript: "function lengthOfLongestSubstring(s) { /* ... */ }",
    },
    referenceSolutions: {
      javascript: "function lengthOfLongestSubstring(s) { /* ... */ }",
    },
    testcases: [
      {
        input: '"abcabcbb"',
        expectedOutput: "3",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];


// export const dummyPosts: Post[] = [
//   {
//     id: "post1",
//     title: "Understanding JavaScript Closures",
//     description: "A deep dive into closures in JavaScript with examples and use cases.",
//     views: 150,
//     tags: ["javascript", "closures", "functions"],
//     commentsCount: 8,
//     upvotes: 25,
//     createdAt: new Date("2024-05-01T10:00:00Z"),
//     updatedAt: new Date("2024-05-02T12:00:00Z"),
//     user: {
//       id: "user1",
//       email: "alice@example.com",
//       fullname: "Alice Johnson",
//       avatar: "https://i.pravatar.cc/150?img=1",
//       createdAt: new Date("2023-08-10T09:00:00Z"),
//     },
//   },
//   {
//     id: "post2",
//     title: "Mastering TypeScript Types",
//     description: "Everything you need to know about TypeScript’s type system.",
//     views: 240,
//     tags: ["typescript", "types", "frontend"],
//     commentsCount: 12,
//     upvotes: 40,
//     createdAt: new Date("2024-06-15T14:30:00Z"),
//     updatedAt: new Date("2024-06-16T10:45:00Z"),
//     user: {
//       id: "user2",
//       email: "bob@example.com",
//       fullname: "Bob Smith",
//       avatar: "https://i.pravatar.cc/150?img=2",
//       createdAt: new Date("2023-09-20T11:15:00Z"),
//     },
//   },
//   {
//     id: "post3",
//     title: "How to Optimize React Performance",
//     description: "Learn best practices and techniques for optimizing React apps.",
//     views: 320,
//     tags: ["react", "performance", "hooks"],
//     commentsCount: 20,
//     upvotes: 70,
//     createdAt: new Date("2024-07-01T08:20:00Z"),
//     updatedAt: new Date("2024-07-03T17:00:00Z"),
//     user: {
//       id: "user3",
//       email: "charlie@example.com",
//       fullname: "Charlie Davis",
//       avatar: "https://i.pravatar.cc/150?img=3",
//       createdAt: new Date("2022-12-01T16:40:00Z"),
//     },
//   },
// ];

 export  const dummyDonutData = [
  {
    id: "Medium",
    label: "Medium",
    value: 7,
    color: "hsl(12, 10%, 50%)",
  },
  {
    id: "Easy",
    label: "Easy",
    value: 5,
    color: "hsl(311, 70%, 50%)",
  },
  {
    id: "Hard",
    label: "Hard",
    value: 3,
    color: "hsl(43, 70%, 50%)",
  },
];

export const dummyPieData = [
  {
    id: "python",
    label: "python",
    value: 3,
    color: "hsl(132, 70%, 50%)",
  },
  {
    id: "c++",
    label: "cpp",
    value: 8,
    color: "hsl(247, 70%, 50%)",
  },
 
  {
    id: "java",
    label: "java",
    value: 9,
    color: "hsl(333, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 4,
    color: "hsl(145, 70%, 50%)",
  },
];

export const dummyUserData :any = {
  data: {
    avatar: 'https://res.cloudinary.com/dmnh10etf/image/upload/v1750270944/default_epnleu.png',
    dailyProblemStreak: 3,
    email: "demo@gmail.com",
    fullname: "Demo User",
    githubUrl: "https://github.com/rambhardwajj",
    xUrl: "https://www.x.com/ram_1010",
    linkedInUrl: "https://www.linkedin.com/in/bhardwajram",
    problemSolvedCount: 20, 
    role: "USER",
    isVerified: true
  }
}

export const dummyAllSubmission = [
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(1),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(0),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(161),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(151),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(221),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(191),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(340),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(345),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(325),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(297),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(10),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(2),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Accepted",
    time: "0.134s",
    memory: "15.2MB",
    stdout: "All test cases passed",
    language: "TypeScript",
    TestCaseResult: [{ testCaseId: 1, passed: true }],
    createdAt: daysAgo(1),
    sourceCode: `function add(a: number, b: number): number {
  return a + b;
}`,
  },
  {
    status: "Wrong Answer",
    time: "0.210s",
    memory: "18.6MB",
    stdout: "Test case 2 failed",
    language: "JavaScript",
    TestCaseResult: [{ testCaseId: 2, passed: false }],
    createdAt: daysAgo(1),
    sourceCode: `function sum(a, b) {
  return a + b + 1;
}`,
  },
  {
    status: "Time Limit Exceeded",
    time: ">2s",
    memory: "19.8MB",
    stdout: "",
    language: "Python",
    TestCaseResult: [{ testCaseId: 3, passed: false }],
    createdAt: daysAgo(5),
    sourceCode: `def infinite_loop():
    while True:
        pass`,
  },
  {
    status: "Accepted",
    time: "0.045s",
    memory: "12.3MB",
    stdout: "Output matches expected",
    language: "C++",
    TestCaseResult: [{ testCaseId: 4, passed: true }],
    createdAt: daysAgo(7),
    sourceCode: `int square(int x) {
    return x * x;
}`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(32),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(74),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(84),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(90),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(80),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(34),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(126),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(126),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(126),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(186),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(194),
    sourceCode: `def divide(a, b):
    return a / b`,
  },

  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(170),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(248),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(255),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(299),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(266),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(266),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(266),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(266),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(266),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(286),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(225),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(343),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(321),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(321),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(321),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(321),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(321),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
  {
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(123),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(102),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(100),
    sourceCode: `def divide(a, b):
    return a / b`,
  },{
    status: "Runtime Error",
    time: "0.01s",
    memory: "14.0MB",
    stdout: "ZeroDivisionError",
    language: "Python",
    TestCaseResult: [{ testCaseId: 5, passed: false }],
    createdAt: daysAgo(97),
    sourceCode: `def divide(a, b):
    return a / b`,
  },
];

