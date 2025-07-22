import type { ProblemDB } from "@/types/problem";
import { BASE_URL, PROBLEMS_PATH } from "../constants";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import axios from "axios";
import {
  ArrowUpDown,
  Check,
  CheckCheck,
  ChevronsDown,
  ChevronsUp,
  CircleCheck,
  Filter,
  Search,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

export const Problems = () => {
  const topicsArray = [
    "All Topics",
    "Array",
    "Dynamic Programming",
    "String",
    "HashMap",
    "Lists",
    "LinkedList",
    "Stack",
    "Queues",
    "Trees",
    "B-Trees",
    "BST",
    "Graph",
    "BFS",
    "DFS",
    "Matrix",
    "Heap",
    "Sliding Window",
    "Topological Sort",
    "Recursion",
    "Backtracking",
    "Bit Manipulation",
    "Maths",
    "Memoization",
    "Union Find",
  ];
  const [expanded, setExpanded] = useState(false);
  const [problems, setProblems] = useState<ProblemDB[]>([]);
  const [solvedProblems, setSolvedProblems] = useState<any>([]);
  const isProblemSolved = (problemId: string) => {
    if (solvedProblems.find((problem: ProblemDB) => problem.id === problemId)) {
      return true;
    }
    return false;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProblems, setFilteredProblems] = useState<ProblemDB[]>([]);

  const fuse = new Fuse(problems, {
    keys: ["title", "tags", "description"],
    threshold: 0.3,
  });

  const handleSearch = (searchInp: string) => {
    const results = fuse.search(searchInp).map(({ item }) => item);
    setFilteredProblems(results);
  };

  useEffect(() => {
    try {
      const getProblems = async () => {
        const res = await axios.get(`${BASE_URL}${PROBLEMS_PATH}/all`);

        if (res.data.data) {
          setProblems(res.data.data);
        }
      };
      const getSolvedProblems = async () => {
        const res = await axios.get(
          `${BASE_URL}${PROBLEMS_PATH}/getSolvedProblem`
        );

        if (res.data.data) {
          setSolvedProblems(res.data.data);
          console.log(solvedProblems);
        }
      };

      getProblems();
      getSolvedProblems();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(problems);
  const totolProblems = problems.length || 0;
  const solvedProblemsCount = solvedProblems.length || 0;
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6] ">
      <div className="max-w-7xl w-full px-4 py-4 flex flex-col gap-3">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]  h-34 w-full">
          Sheets
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-[1fr_4fr] gap-3 w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]  h-80 w-full">
              Companies
            </div>
            <div className="bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]  h-50 w-full">
              Solved/unsolved
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            <div className="relative w-full">
              {/* Badge Container */}
              <div
                className={` bg-white rounded-lg flex items-start p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full overflow-y-hidden transition-all duration-300 
                  ${expanded ? "h-[10vh]" : "h-[5vh]"}`}
              >
                <div className="flex items-start gap-2 flex-wrap mr-4">
                  {topicsArray.map((topic) => (
                    <Badge
                      key={topic}
                      className="bg-neutral-100 cursor-pointer"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Expand/Collapse Button */}
              <div className="absolute right-1 -bottom-1">
                <Button
                  size="sm"
                  className="cursor-pointer px-2"
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  {expanded ? (
                    <ChevronsUp className="text-violet-900" />
                  ) : (
                    <ChevronsDown className="text-violet-900" />
                  )}
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg flex items-center justify-between p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-10 w-full">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-4  text-neutral-900" />
                  <Input
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                    placeholder="Search questions"
                    className="pl-8 pr-2 h-6 pt-2  rounded-full  bg-neutral-100  "
                  />
                </div>

                {/* Sort Icon */}
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <ArrowUpDown className="h-4 w-4 text-gray-600 cursor-pointer " />
                </button>

                {/* Filter Icon */}
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Filter className="h-4 w-4 text-gray-600 cursor-pointer" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-700">
                  <div className="relative flex ">
                    <CheckCheck className="text-green-700 pr-1" />
                  </div>
                  <span className="mr-4">
                    {" "}
                    Solved {solvedProblemsCount}/{totolProblems}{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]  flex-grow min-h-[200px] w-full">
              {(filteredProblems.length > 0 ? filteredProblems : problems).map(
                (problem: ProblemDB) => (
                  <div
                    key={problem.id}
                    className="bg-neutral-100 justify-between rounded-lg m-2 h-10 flex items-center "
                  >
                    <div className="flex items-center gap-2 p-2">
                      <div className="px-3 ">
                        {isProblemSolved(problem.id) ? (
                          <CircleCheck className="border-0 font-bold rounded-[50%] text-green-600 size-6 " />
                        ) : (
                          <div>
                            <CircleCheck className="text-neutral-500" />
                          </div>
                        )}
                      </div>
                      <div className="font-semibold flex ">
                        <div className="text-sm">{problem.title}</div>
                        {problem.demo && (
                          <Badge className="mx-3 bg-teal-500 border-2 border-teal-700 text-white ">
                            Demo
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2">
                      <div
                        className={` text-sm font-bold ${problem.difficulty === "EASY" ? "text-green-500" : problem.difficulty === "MEDIUM" ? "text-yellow-500" : "text-red-500"} `}
                      >
                        {problem.difficulty}
                      </div>
                      <div className="flex items-center gap-2 p-2 ">
                        {isProblemSolved(problem.id) ? (
                          <Star
                            className={`cursor-pointer hover:scale-105 text-amber-400 fill-amber-300`}
                          />
                        ) : (
                          <Star
                            className={`cursor-pointer hover:scale-105 text-amber-400 `}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
