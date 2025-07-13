export const BASE_URL = import.meta.env.VITE_API_URL;
export const AUTH_PATH = "/api/v1/auth";
export const ADMIN_PATH = "/api/v1/admin";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}
export const allSubmission = [
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