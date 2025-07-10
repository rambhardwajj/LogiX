import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Is this platform free to use?",
    answer:
      "Yes, it is! You can solve problems, track your progress, and learn—all without paying a thing. We’re all about making quality practice accessible. Down the line, we may introduce a few advanced or premium features, but the core experience will always stay free.",
  },
  {
    question: "What kind of problems will I find here?",
    answer:
      "We’ve got a wide range of DSA problems covering topics like arrays, strings, trees, dynamic programming, graphs, and more. They’re neatly organized by topic, difficulty, and even company-specific patterns, so you can practice smarter, not harder.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Absolutely. Your personal dashboard gives you a full view of your journey — problems solved, topics covered, daily streaks, and even trends over time. It’s your own progress report, designed to keep you motivated and focused.",
  },
  {
    question: "Do you offer company-specific problems?",
    answer:
      "Yes — and not just random ones. We’ve curated real questions asked in interviews by companies like Google, Amazon, Meta, and others. If you're targeting a specific job or company, these problems help you align your prep with the real-world expectations.",
  },
  {
    question: "Is this good for interview preparation?",
    answer:
      "100%. This platform is built with interview prep in mind. You’ll find real interview-style questions, hints to nudge you in the right direction, and detailed explanations that help you truly understand the solution — not just memorize it.",
  },
];
export function FAQs() {
  return (
    <div className="flex items-center justify-center w-full   px-4 ">
      <div className="w-full max-w-xl ">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-950 to-purple-600">
          Frequently Asked Questions
        </h2>

        <Accordion
          type="single"
          collapsible
          className="space-y-4 cursor-pointer "
          defaultValue="item-1"
        >
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`${idx}`}
              className="rounded-xl cursor-pointer border-0  px-3 "
            >
              <AccordionTrigger>
                <div
                className="flex justify-between cursor-pointer  w-lg "
                >{faq.question}</div>
               
              </AccordionTrigger>

              <AccordionContent className="px-5 pb-5 pt-0 text-sm text-gray-600 ">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
