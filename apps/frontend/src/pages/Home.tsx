import { motion } from "motion/react";
import { Play } from "lucide-react";
import { Button } from "@repo/ui/components/button";

const backgroundLines = Array.from({ length: 30 }, (_, i) => i);

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-bl from-[#f8f9fb] via-[#f4f7fa] to-[#f6f8fd]">
      {/* Background Motion Lines */}
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full opacity-10 stroke-zinc-300"
          preserveAspectRatio="none"
        >
          {backgroundLines.map((i) => (
            <motion.line
              key={i}
              x1={(i * 5) % 100}
              y1="0"
              x2={(i * 5) % 100}
              y2="100"
              strokeWidth="0.2"
              initial={{ y1: 0, y2: 0 }}
              animate={{ y2: 100 }}
              transition={{ duration: 3, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900">
          The most comprehensive <br />
          <span className="text-black">User Management Platform</span>
        </h1>
        <p className="mt-4 max-w-xl text-zinc-600 text-lg">
          Need more than just a sign-in box? CodeTrek is a complete suite of embeddable UIs,
          flexible APIs, and admin dashboards to authenticate and manage your users.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-semibold">
            Start building for free
          </Button>

          <button className="flex items-center gap-2 text-sm text-zinc-700 hover:underline">
            <Play className="w-4 h-4 fill-zinc-700" />
            Watch demo <span className="text-xs text-zinc-500">2 min</span>
          </button>
        </div>

        {/* Logos placeholder */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 opacity-80">
          {['Browserbase', 'Inngest', 'Braintrust', 'Suno', 'Durable', 'OpenRouter', 'Higgsfield', 'Upstash'].map((logo) => (
            <span key={logo} className="text-sm text-zinc-600 font-medium">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
