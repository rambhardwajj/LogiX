import AnimatedText from "../components/AnimatedText";
import { Button } from "@repo/ui/components/button";
import GreetingLottie from "../components/animations/DisplayLottie";
import Analytics from "../components/animations/Analytics";
import { FAQs } from "../components/FAQs";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-6 bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6]">
        <AnimatedText
          text="Join LogiX built for real-world problem solvers 🔵"
          className="mb-20 w-full max-w-fit mx-auto px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full text-white bg-gradient-to-r from-neutral-600 via-neutral-800 to-neutral-900 shadow-md ring-1 ring-white/10 backdrop-blur-sm"
        />

        <AnimatedText
          text="A Comprehensive "
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-zinc-900"
        />
        <AnimatedText
          text="Code Practice Platform"
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-zinc-900"
        />

        <AnimatedText
          text="LogiX is your all-in-one coding practice platform with a wide variety of problems, real-time code execution, leaderboards, and performance insights to help you improve fast."
          className="mt-4 max-w-xl text-zinc-600 text-sm md:text-base"
        />

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Button className="bg-violet-900 hover:bg-violet-700 text-white px-6 py-2 rounded-md text-sm font-semibold">
            <AnimatedText text="Start building for free" />
          </Button>
          <Button className="bg-black text-white px-6 py-2 rounded-md text-sm font-semibold">
            <AnimatedText text="Explore sheets" />
          </Button>
        </div>

        <div className="mt-20 w-full px-4">
          <p className="text-zinc-500 text-xs text-center mb-6">
            Trusted by fast-growing companies around the world
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            {[
              "react",
              "pg",
              "uignite",
              "authflow",
              "taskflow",
              "node",
              "drizzle",
              "redis",
            ].map((logo) => (
              <img
                key={logo}
                src={`/logos/${logo}.png`}
                alt={logo}
                className="h-6 object-contain"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="z-10 pb-5  flex flex-col items-center  px-4 bg-gradient-to-t from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6]">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-12">
          <div className="w-full lg:w-1/2 text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 leading-snug">
              Welcome to{" "}
              <span className="text-violet-950">
                Logi<span className="text-purple-900">X</span>
              </span>{" "}
              – Your Ultimate DSA Practice Arena
            </h1>
            <p className="text-base text-gray-700">
              Master Data Structures and Algorithms with curated problems,
              real-time feedback, and detailed solutions. Whether you're
              preparing for interviews or building problem-solving skills,{" "}
              <span className="font-medium text-violet-900">LogiX</span> has
              everything you need.
            </p>
            <button className="px-6 py-3 bg-violet-950 hover:bg-violet-900 text-white font-semibold rounded-xl shadow-lg transition duration-300">
              Start Solving Now →
            </button>
          </div>
          <div className="w-full lg:w-1/2">
            <GreetingLottie animationPath="/lottie/coding.json" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="min-h-screen flex flex-col items-center px-4 py-16  bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6] ">
        <h2 className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-neutral-900 to-violet-950 text-center mb-10 pb-3">
          Explore Powerful Features of{" "}
          <span>
            Logi<span>X</span>
          </span>
        </h2>
        <div className="grid text-center w-full max-w-6xl  auto-rows-[192px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={` bg-gradient-to-bl  row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 
              ${i === 5 ? "lg:col-span-2" : ""}
              ${i === 2 ? "lg:row-span-2" : ""}
              ${i === 7 ? "lg:col-span-3 lg:row-span-2" : ""}
              `}
            >
              {i == 0 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl border hover:scale-103 ease-in-out duration-100 border-slate-200 bg-white p-6 text-left shadow-md">
                  {/* Background dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none rounded-xl" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      Structured DSA Practice
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v14a2 2 0 01-2 2z"
                        />
                      </svg>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Filter problems based on Topic, Difficulty level or
                      company-specific patterns to align your preparation with
                      your target job.
                    </p>
                  </div>
                </div>
              )}

              {i == 1 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl border hover:scale-103 ease-in-out duration-100 border-slate-200 bg-white p-6 text-left shadow-md">
                  {/* Background dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none rounded-xl" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      Discussion Forum
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v14a2 2 0 01-2 2z"
                        />
                      </svg>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Engage with a vibrant community of coders. Ask doubts,
                      discuss problem-solving techniques, and share your
                      experiences.
                    </p>
                  </div>
                </div>
              )}

              {i == 2 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl border hover:scale-103 ease-in-out duration-100 border-slate-200 bg-white p-6 text-left shadow-md">
                  {/* Background dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none rounded-xl" />

                  {/* Card content */}
                  <div className="relative z-10  ">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      Profile Dashboard
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-violet-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v14a2 2 0 01-2 2z"
                        />
                      </svg>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed  ">
                      Track solved problems, monitor your daily streak, and
                      analyze submission trends through interactive graphs. View
                      recent submissions, contribution history.
                    </p>
                    <div className="hidden lg:block">
                      <Analytics />
                    </div>
                  </div>
                </div>
              )}

              {i == 3 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl border hover:scale-103 ease-in-out duration-100 border-slate-200 bg-white p-6 text-left shadow-md">
                  {/* Background dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none rounded-xl" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      Practice Sheets
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v14a2 2 0 01-2 2z"
                        />
                      </svg>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Access curated practice sheets for different topics and
                      difficulty levels, or create your own personalized problem
                      sets.
                    </p>
                  </div>
                </div>
              )}

              {i == 4 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl border hover:scale-103 ease-in-out duration-100 border-slate-200 bg-white p-6 text-left shadow-md">
                  {/* Background dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none rounded-xl" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      Daily Streak Feature
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-amber-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v14a2 2 0 01-2 2z"
                        />
                      </svg>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Stay consistent with a gamified daily streak system. The
                      system highlights progres over time to spot weak areas and
                      celebrate growth.
                    </p>
                  </div>
                </div>
              )}

              {i == 5 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl border hover:scale-103 ease-in-out duration-100 border-slate-200 bg-white p-6 text-left shadow-md">
                  {/* Background dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none rounded-xl" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <div className="flex  gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                          Discuss with AlgoAI
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-cyan-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v14a2 2 0 01-2 2z"
                            />
                          </svg>
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                          Initiate a conversation with AlgoAI assistant designed
                          to explain concepts, guide you through solution steps,
                          and answer questions contextually.
                        </p>
                      </div>
                      <div className="hidden lg:block w-[50vw] mt-[-10vh] mx-[-4vw] h-[2vh]">
                        <GreetingLottie animationPath="/lottie/build.json" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {i == 6 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl border hover:scale-103 ease-in-out duration-100 border-slate-200 bg-white p-6 text-left shadow-md">
                  {/* Background dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none rounded-xl" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      Company wise questions
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v14a2 2 0 01-2 2z"
                        />
                      </svg>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      Solve problem related to company wise questions and
                      prepare for you dream company now.
                    </p>
                  </div>
                </div>
              )}

              {i == 7 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl border hover:scale-102 ease-in-out duration-100 border-slate-200 bg-white p-6 text-left shadow-md">
                  {/* Background dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none rounded-xl" />

                  {/* Card content */}
                  <div className="relative z-10  ">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      Code Editors
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-green-400 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v14a2 2 0 01-2 2z"
                        />
                      </svg>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed  ">
                      Write, test, and run code in a feature-rich environment
                      built for competitive programming and interview
                      preparation.
                      <span className="hidden lg:block">
                        The editor supports multiple languages, intelligent
                        autocompletion, and real-time feedback.
                      </span>
                    </p>
                    <div className="hidden lg:block w-[15vw] ">
                      <GreetingLottie animationPath="/lottie/skills/cloudinfra.json" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* FAQ */}
      <div className="min-h-screen flex flex-col items-center px-4 py-16  bg-gradient-to-t from-[#fefefe] via-[#f6f7fb] to-[#c4bdf6] ">
        <FAQs />
      </div>
    </div>
  );
}
