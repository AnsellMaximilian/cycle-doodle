import Button from "@/components/Button";
import { usePlay } from "@/contexts/PlayContext";
import axios from "axios";
import clsx from "clsx";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Guesser() {
  const {
    teamValues,
    setContent,
    selectedColour,
    content,
    setSelectedColour,
    prompts,
    userTeam,
  } = usePlay();

  const [isGuessing, setIsGuessing] = useState(false);

  const [guess, setGuess] = useState("");

  const promptToGuess = prompts.find(
    (p) => p.drawer !== null && p.guesser === null && p.drawer !== userTeam?.key
  );

  if (!promptToGuess) {
    return (
      <div className="text-center min-h-44 flex flex-col items-center justify-center text-lg">
        No prompt to guess. All drawings have been guessed. Please wait for an
        admin to refresh or extend the list of prompts.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center font-bold text-2xl">Guess This Drawing</h1>

      <div>
        <div
          className={clsx(
            promptToGuess.content.length > 100
              ? "grid-cols-12"
              : "grid-cols-10",
            "grid w-[300px] mx-auto"
          )}
        >
          {Array.from({ length: promptToGuess.content.length }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-full aspect-square bg-white "
                style={{ backgroundColor: promptToGuess.content[i] }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <input
          onChange={(e) => setGuess(e.target.value)}
          value={guess}
          className="mx-auto w-[300px] flex h-9 max-w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />

        <Button
          className="w-[300px] mx-auto max-w-full"
          disabled={isGuessing}
          onClick={async () => {
            if (promptToGuess) {
              if (!guess) {
                toast.error("Guess cannot be empty.");
                return;
              }
              try {
                setIsGuessing(true);
                const response = await axios.post("/api/guess-drawing", {
                  featureKey: "prompts",
                  variationKey: "main-prompts",
                  promptId: promptToGuess.id,
                  guess: guess,
                  teamKey: userTeam?.key,
                });

                const result = response.data as {
                  correct: boolean;
                  answer: string;
                };

                if (result.correct)
                  toast.success(
                    `You guessed correcty. It was ${result.answer}`
                  );
                else toast.error(`You guessed wrong. It was ${result.answer}`);
              } catch (err: any) {
                toast.error("Failed to submit guess");

                setIsGuessing(false);

                console.error("Error fetching feature:", err);
              }
            }
          }}
        >
          Submit Guess
        </Button>
      </div>
    </div>
  );
}
