"use client";

import Button from "@/components/Button";
import { usePlay } from "@/contexts/PlayContext";
import axios from "axios";
import clsx from "clsx";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Voter() {
  const {
    teamValues,
    setContent,
    selectedColour,
    content,
    setSelectedColour,
    prompts,
    userTeam,
  } = usePlay();

  const [isVoting, setIsVoting] = useState(false);
  const [score, setScore] = useState(0);

  const promptToVote = prompts.find(
    (p) => p.score === null && p.drawer !== userTeam?.key && p.drawer !== null
  );

  if (!promptToVote) {
    return (
      <div className="text-center min-h-44 flex flex-col items-center justify-center text-lg">
        No prompt to vote for. All prompts drawn by other teams have been
        scored. Please wait for an admin to refresh or extend the list of
        prompts.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center font-bold text-2xl">Vote for This Drawing</h1>
      <div>
        <div
          className={clsx(
            promptToVote.content.length > 100 ? "grid-cols-12" : "grid-cols-10",
            "grid w-[300px] mx-auto"
          )}
        >
          {Array.from({ length: promptToVote.content.length }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-full aspect-square bg-white "
                style={{ backgroundColor: promptToVote.content[i] }}
              ></div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = score >= i + 1;
          return (
            <button key={i} onClick={() => setScore(i + 1)}>
              {filled ? (
                <FaStar size={40} color="yellow" />
              ) : (
                <FaRegStar size={40} />
              )}
            </button>
          );
        })}
      </div>

      <div>
        <Button
          className="mx-auto block"
          disabled={isVoting}
          onClick={async () => {
            if (promptToVote) {
              if (score < 1) {
                toast.error("Score cannot be lower than 1.");
                return;
              }
              try {
                setIsVoting(true);
                const response = await axios.post("/api/vote-drawing", {
                  featureKey: "prompts",
                  variationKey: "main-prompts",
                  promptId: promptToVote.id,
                  score: score,
                });

                toast.success(`Thanks for your vote!`);
              } catch (err: any) {
                toast.error("Failed to vote drawing");

                setIsVoting(false);

                console.error("Error fetching feature:", err);
              }
            }
          }}
        >
          Submit Score
        </Button>
      </div>
    </div>
  );
}
