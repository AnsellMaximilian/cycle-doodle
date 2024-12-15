import { usePlay } from "@/contexts/PlayContext";
import { Prompt } from "@/types";
import clsx from "clsx";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/cycle-doodle-logo.svg";
import { FaRegStar, FaStar, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import isGuessCorrect from "@/utils/isGuessCorrect";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import axios from "axios";

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const { setSelectedPrompt, audiences, isAdmin, prompts } = usePlay();

  const [isAdminUpdating, setIsAdminUpdating] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState<Prompt | null>(null);
  const drawn = !!prompt.drawer;

  const guessed = !!prompt.guesser;

  const drawer = audiences.find((a) => a.key === prompt.drawer);
  const guesser = audiences.find((a) => a.key === prompt.guesser);
  const score = prompt.score;

  const guessIsCorrect = prompt.guess
    ? isGuessCorrect(prompt.guess, prompt.prompt)
    : false;

  const handleDelete = async () => {
    if (!promptToDelete) return;

    try {
      setIsAdminUpdating(true);

      const res = await axios.post("/api/update-prompts", {
        featureKey: "prompts",
        variationKey: "main-prompts",
        newPrompts: prompts.filter((p) => p.id !== promptToDelete.id),
      });

      toast.success(`Updated prompts successfully`);
    } catch (err: any) {
      toast.error("Failed to update prompts");

      setIsAdminUpdating(false);

      console.error("Error fetching feature:", err);
    }
    setPromptToDelete(null);
    setIsAdminUpdating(false);
  };

  return (
    <>
      <div
        onClick={() => setSelectedPrompt(prompt)}
        className={clsx(
          "p-4 rounded-md border border-gray-200 w-full aspect-square flex flex-col gap-4 items-center hover:scale-105 cursor-pointer transition-all duration-100 shadow-sm relative group"
        )}
      >
        {isAdmin && (
          <button
            disabled={isAdminUpdating}
            className="hidden group-hover:block absolute top-4 right-4 bg-red-600 text-white rounded-md p-3 hover:opacity-90 disabled:opacity-70"
            onClick={(e) => {
              e.stopPropagation();
              setPromptToDelete(prompt);
            }}
          >
            <FaTrash />
          </button>
        )}

        <div className="text-center font-bold text-xl">
          {guessed || isAdmin ? prompt.prompt : "???"}
        </div>
        {drawer ? (
          <div
            className={clsx(
              prompt.content.length > 100 ? "grid-cols-12" : "grid-cols-10",
              "grid w-[150px]",
              prompt.drawer === null ? "h-[150px]" : "h-[150px]"
            )}
          >
            {Array.from({ length: prompt.content.length }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="w-full aspect-square bg-white "
                  style={{ backgroundColor: prompt.content[i] }}
                ></div>
              );
            })}
          </div>
        ) : (
          <div className="h-[150px] w-[150px] flex flex-col justify-center items-center">
            <Image
              src={logo}
              width={100}
              height={100}
              alt="Placeholder"
              className=""
            />
          </div>
        )}
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="font-bold">Guess</div>
            {prompt.guess ? (
              <div className="flex items-center gap-1">
                <span>{prompt.guess}</span>{" "}
                <span
                  className={clsx(
                    "text-white block p-0.5 rounded-full px-2",
                    !guessIsCorrect ? "bg-red-600" : "bg-green-600"
                  )}
                >
                  {guessIsCorrect ? <FaCheck /> : <FaTimes />}
                </span>
              </div>
            ) : (
              <div className="italic">N/A</div>
            )}{" "}
          </div>
          <div className="flex justify-between w-full">
            <div className="font-bold">Guesser</div>
            {guesser?.name ? (
              <div>{guesser.name}</div>
            ) : (
              <div className="italic">N/A</div>
            )}{" "}
          </div>
          <div className="flex justify-between w-full">
            <div className="font-bold">Drawer</div>
            {drawer?.name ? (
              <div>{drawer.name}</div>
            ) : (
              <div className="italic">N/A</div>
            )}
          </div>
          <div className="flex justify-between w-full">
            <div className="font-bold">Score</div>
            {score !== null ? (
              <div className="flex justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = score >= i + 1;
                  return (
                    <button key={i}>
                      {filled ? (
                        <FaStar size={20} color="yellow" />
                      ) : (
                        <FaRegStar size={20} />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="italic">N/A</div>
            )}
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      {promptToDelete && (
        <div
          className="fixed inset-0 bg-gray-500/40 flex items-center justify-center z-30"
          onClick={() => {
            setPromptToDelete(null);
          }}
        >
          <div
            className="p-4 bg-white rounded-md shadow-md border border-gray-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2"
              onClick={() => setPromptToDelete(null)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold text-center mb-8">
              Delete Prompt {promptToDelete.prompt}?
            </h2>
            <p className="mb-4">
              Are you sure you want to delete this prompt and its associated
              data?
            </p>
            <div className="flex flex-col gap-4">
              <Button disabled={isAdminUpdating} onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
