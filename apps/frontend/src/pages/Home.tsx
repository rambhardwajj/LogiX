import AnimatedText from "../components/AnimatedText";
import AlertAnimations from "../components/animations/AlertsAnimations";
import { Button } from "@repo/ui/components/button";
import GreetingLottie from "../components/animations/DisplayLottie";

export default function HomePage() {
  return (
    <div className="relative min-h-[92vh] overflow-hidden  ">
      {/* Hero Section */}
      <div className=" z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-6  bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6]">
        <AnimatedText
          text=" Join LogiX built for real-world problem solvers 🔵"
          className="mb-[4vh] w-full max-w-fit mx-auto px-2 sm:px-6 py-1.5 text-xs md:text-xs font-semibold rounded-full text-white bg-gradient-to-r from-neutral-600 via-neutral-800 to-neutral-900 shadow-md ring-1 ring-white/10 backdrop-blur-sm text-center"
        />

        <AnimatedText
          text="A Comprehensive "
          className="text-4xl md:text-6xl font-extrabold text-zinc-900"
        />
        <AnimatedText
          className="text-4xl md:text-6xl font-extrabold text-zinc-900"
          text="Code Practice Platform"
        />

        <AnimatedText
          text="LogiX is your all-in-one coding practice platform with a wide variety of problems, real-time code  execution, leaderboards, and performance insights to help you improve fast."
          className="mt-4 max-w-xl text-zinc-600 text-sm "
        />

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Button className="cursor-pointer bg-violet-900 hover:bg-violet-700 text-white px-6 py-2 rounded-md text-sm font-semibold">
            <AnimatedText text="Start building for free" />
          </Button>
          <Button className="cursor-pointer bg-black text-white px-6 py-2 rounded-md text-sm font-semibold">
            <AnimatedText text=" Explore sheets" />
          </Button>
        </div>
        <div className="mt-20 w-full px-4">
          <p className="text-zinc-500 text-[10px] text-center mb-6">
            Trusted by fast-growing companies around the world
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-6">
            <img
              src="/logos/react.png"
              alt="React"
              className="h-6 object-contain"
            />
            <img
              src="/logos/pg.png"
              alt="PostGreSQL"
              className="h-6 object-contain"
            />
            <img
              src="/logos/uignite.png"
              alt="UIgnite"
              className="h-6 object-contain"
            />
            <img
              src="/logos/authflow.png"
              alt="AuthFlow"
              className="h-6 object-contain"
            />
            <img
              src="/logos/taskflow.png"
              alt="TaskFlow"
              className="h-6 object-contain"
            />
            <img
              src="/logos/node.png"
              alt="Node"
              className="h-6 object-contain"
            />
            <img
              src="/logos/drizzle.png"
              alt="Drizzle"
              className="h-6 object-contain"
            />
            <img
              src="/logos/redis.png"
              alt="Redis"
              className="h-6 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Intro Section  */}
      <div className="   z-10 flex flex-col items-center justify-around h-[80vh] text-center px-6  bg-gradient-to-t from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6]">
        <div className="flex items-center justify-around max-w-[80vw] max-h-[70vh] ">
          <div className="max-w-[40vw] text-left space-y-6">
            <h1 className="text-4xl font-bold text-gray-950 leading-snug">
              Welcome to{" "}
              <span className="text-violet-950">
                Logi<span className="text-purple-900">X</span>
              </span>{" "}
              – Your Ultimate DSA Practice Arena
            </h1>
            <p className="text-lg text-gray-700">
              Master Data Structures and Algorithms with curated problems,
              real-time feedback, and detailed solutions. Whether you're
              preparing for interviews or building problem-solving skills,{" "}
              <span className="font-medium text-violet-900">LogiX</span> has
              everything you need.
            </p>
            <button className="cursor-pointer px-6 py-3 bg-violet-950 hover:bg-violet-900 text-white font-semibold rounded-xl shadow-lg transition duration-300">
              Start Solving Now →
            </button>
          </div>
          <div className="cursor-pointer max-w-[35vw]">
            <GreetingLottie animationPath="/lottie/coding.json" />
          </div>
        </div>
        <div className="mt-[-20vh] ">
          <AlertAnimations />
        </div>
      </div>

      {/* Features Section  */}
      <div>
        
      </div>
    </div>
  );
}
