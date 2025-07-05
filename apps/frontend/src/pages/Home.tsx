import AnimatedText from "../components/AnimatedText";
import { Button } from "@repo/ui/components/button";

export default function HomePage() {
  return (
    <div className="relative min-h-[92vh] overflow-hidden bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6]">
      {/* Content */}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-6">
        <AnimatedText
          text="✨ Join LogiX built for real-world problem solvers"
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
          <Button className="bg-violet-900 hover:bg-violet-700 text-white px-6 py-2 rounded-md text-sm font-semibold">
            <AnimatedText text="Start building for free" />
          </Button>
          <Button className="bg-black text-white px-6 py-2 rounded-md text-sm font-semibold">
            <AnimatedText text=" Explore sheets" />
          </Button>
        </div>
        <div className="mt-20 w-full px-4">
          <p className="text-zinc-500 text-xs text-center mb-6">
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
    </div>
  );
}
