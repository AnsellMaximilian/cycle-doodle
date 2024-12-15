"use client";

import { Prompt, TeamKeys, TeamRoleKeys } from "@/types";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { usePlay } from "@/contexts/PlayContext";
import Loading from "./Loading";
import Button from "@/components/Button";
import { FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { normalizeString } from "@/utils/isGuessCorrect";

export default function PromptList() {
  const { prompts, loading, audiences, isAdmin } = usePlay();

  const [filterByRole, setFilterByRole] = useState<TeamRoleKeys | "all">("all");
  const [filterByTeam, setFilterByTeam] = useState<TeamKeys | "none">("none");

  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>(prompts);

  // admin
  const [isAdminUpdating, setIsAdminUpdating] = useState(false);
  const [newPromptName, setNewPromptName] = useState("");
  const [createModalOpen, setcreateModalOpen] = useState(false);

  const handleCreate = async () => {
    if (newPromptName.length < 3) {
      toast.error("Prompt must at least be 3 characters long.");
      return;
    }

    const foundPrompt = prompts.find(
      (p) => normalizeString(p.prompt) === normalizeString(newPromptName)
    );
    if (foundPrompt) {
      toast.error("Prompt already exists.");
      return;
    }

    try {
      setIsAdminUpdating(true);
      const newPrompt: Prompt = {
        content: [],
        drawer: null,
        guess: null,
        guesser: null,
        id: normalizeString(newPromptName),
        prompt: newPromptName,
        score: null,
      };
      const res = await axios.post("/api/update-prompts", {
        featureKey: "prompts",
        variationKey: "main-prompts",
        newPrompts: [...prompts, newPrompt],
      });

      toast.success(`Updated prompts successfully`);
    } catch (err: any) {
      toast.error("Failed to update prompts");

      setIsAdminUpdating(false);

      console.error("Error fetching feature:", err);
    }
    setNewPromptName("");
    setcreateModalOpen(false);
    setIsAdminUpdating(false);
  };

  const handleFilter = () => {
    const filteredPrompts = prompts.filter((p) => {
      if (filterByRole === "all") return true;

      if (filterByRole === "drawer") {
        return p.drawer === filterByTeam;
      }

      if (filterByRole === "guesser") {
        return p.guesser === filterByTeam;
      }

      return false;
    });

    setFilteredPrompts(filteredPrompts);
  };

  useEffect(() => {
    if (filterByRole === "all") setFilterByTeam("none");
  }, [filterByRole]);

  useEffect(() => {
    setFilteredPrompts(prompts);

    setFilterByRole("all");
  }, [prompts]);

  if (loading) return <Loading />;

  return (
    <div className="">
      <div className="font-bold text-2xl mb-8 text-center">Prompt Gallery</div>
      <div className="mb-4 flex gap-4 items-end">
        <div>
          <label htmlFor="role" className="text-xs font-bold">
            Role
          </label>
          <select
            id="role"
            className="w-[100px] md:w-[300px] flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            value={filterByRole}
            onChange={(e) => {
              setFilterByRole(e.target.value as TeamRoleKeys | "all");
            }}
          >
            <option className="" value="all">
              All
            </option>
            <option value="drawer">Drawer</option>
            <option value="guesser">Guesser</option>
          </select>
        </div>
        <div>
          <label htmlFor="role" className="text-xs font-bold">
            Team{" "}
          </label>
          <select
            id="role"
            disabled={filterByRole === "all"}
            className="w-[100px] md:w-[300px] flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            value={filterByTeam}
            onChange={(e) => {
              setFilterByTeam(e.target.value as TeamKeys | "none");
            }}
          >
            <option className="" value="none">
              None
            </option>
            {audiences.map((a) => (
              <option key={a.key} value={a.key}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button
            className="bg-white text-blue-600 border border-blue-600 hover:bg-gray-100"
            onClick={() => {
              setFilteredPrompts(prompts);
              setFilterByRole("all");
            }}
          >
            Reset
          </Button>
          <Button
            disabled={filterByTeam === "none"}
            onClick={() => {
              handleFilter();
            }}
          >
            Filter
          </Button>
        </div>
      </div>
      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrompts.map((p) => {
            return <PromptCard key={p.id} prompt={p} />;
          })}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-600 py-16">
          <p>No prompts matches this filter.</p>
          <Button
            className="bg-white text-blue-600 border border-blue-600 hover:bg-gray-100 mt-8"
            onClick={() => {
              setFilteredPrompts(prompts);
              setFilterByRole("all");
            }}
          >
            Reset
          </Button>
        </div>
      )}

      {isAdmin && (
        <button
          disabled={isAdminUpdating}
          className="hover:opacity-90 fixed bottom-8 right-8 w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center disabled:opacity-70"
          onClick={async () => {
            setcreateModalOpen(true);
            setNewPromptName("");
          }}
        >
          <FaPlus />
        </button>
      )}

      {/* Create Modal */}
      {createModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500/40 flex items-center justify-center z-30"
          onClick={() => {
            setcreateModalOpen(false);
          }}
        >
          <div
            className="p-4 bg-white rounded-md shadow-md border border-gray-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2"
              onClick={() => setcreateModalOpen(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold text-center mb-8">
              Create New Prompt
            </h2>
            <div className="flex flex-col gap-4">
              <input
                placeholder="New Prompt"
                onChange={(e) => setNewPromptName(e.target.value)}
                value={newPromptName}
                className="mx-auto w-[300px] flex h-9 max-w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button disabled={isAdminUpdating} onClick={handleCreate}>
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
