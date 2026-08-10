import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const title = ["W", "O", "R", "D", "L", "E"];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="flex gap-1 mb-8">
        {title.map((letter, i) => (
          <div
            key={i}
            className={`w-12 h-12 flex items-center justify-center text-white text-2xl font-bold border-2 ${
              i % 2 === 0
                ? "bg-[rgb(84,127,73)] border-[rgb(84,127,73)]"
                : "bg-[rgb(170,149,62)] border-[rgb(170,149,62)]"
            }`}
          >
            {letter}
          </div>
        ))}
      </div>

      <h1 className="text-white text-3xl font-bold mb-0">
        Welcome to the Wordle Clone
      </h1>
      <p className="text-[rgb(150,150,150)] mb-10">made by Enes Demirel</p>

      <Link href="/game">
        <Button className="h-12 px-8 text-lg bg-white text-black hover:bg-gray-200">
          Click to play
        </Button>
      </Link>

      <footer className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <p className="text-[rgb(100,100,100)] max-w-lg mx-auto text-xs ">
          Almost all of this code was written without any AI assistance. The
          only AI-written or AI-assisted parts are the UI, like some of this
          page.
        </p>
      </footer>
    </div>
  );
}
