"use client";

import { Prompt, TeamKeys, TeamRoleKeys } from "@/types";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { usePlay } from "@/contexts/PlayContext";
import Loading from "./Loading";
import Button from "@/components/Button";

export default function PromptList() {
  const { prompts, loading, audiences } = usePlay();

  const [filterByRole, setFilterByRole] = useState<TeamRoleKeys | "all">("all");
  const [filterByTeam, setFilterByTeam] = useState<TeamKeys | "none">("none");

  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>(prompts);

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

  if (loading) return <Loading />;

  return (
    <div className="">
      <div className="font-bold text-2xl mb-8 text-center">Prompt Gallery</div>
      <div className="mb-4 flex gap-4">
        <div>
          <label htmlFor="role" className="text-xs font-bold">
            Role
          </label>
          <select
            id="role"
            className="w-[300px] flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
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
            className="w-[300px] flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
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
    </div>
  );
}
