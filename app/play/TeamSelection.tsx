"use client";

import Button from "@/components/Button";
import { TEAM_IMAGES, TEAM_PERKS } from "@/const";
import { Audience, TeamKeys } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";

export default function TeamSelection({
  audiences,
  setAudiences,
}: {
  audiences: Audience[];
  setAudiences: React.Dispatch<React.SetStateAction<Audience[]>>;
}) {
  const [selectedTeam, setSelectedTeam] = useState<null | Audience>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChooseTeam = async () => {
    if (!selectedTeam) {
      setError("Please select a team first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/choose-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audienceId: selectedTeam._id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.error || "Failed to choose a team. Please try again."
        );
        setLoading(false);
        return;
      }

      const updatedAudience = await response.json();

      // Update the audiences state to reflect the chosen team
      setAudiences((prevAudiences) =>
        prevAudiences.map((audience) =>
          audience._id === updatedAudience._id ? updatedAudience : audience
        )
      );

      setLoading(false);
    } catch (err) {
      console.error("Error choosing team:", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  console.log(audiences);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Select a Team</h1>
      <div className="text-xl text-center mb-8">
        You haven&apos;t selected a team yet. Select one of the teams below
        before playing. Each team has a unique advantage over the others.
      </div>
      <div className="grid grid-cols-3 gap-4">
        {audiences.map((a) => {
          return (
            <div
              key={a._id}
              className={clsx(
                "rounded-md border-gray-200 p-4 shadow-md flex flex-col border-4 gap-4 items-center hover:scale-105 transition-all duration-100 cursor-pointer hover:bg-gray-100",
                selectedTeam?._id === a._id ? "border-[#323232] " : ""
              )}
              onClick={() => setSelectedTeam(a)}
            >
              <h2 className="text-xl font-bold">{a.name}</h2>
              <Image
                src={TEAM_IMAGES[a.key as TeamKeys]}
                width={100}
                height={100}
                alt={a.name}
              />
              <p className="text-sm text-center">{a.description}</p>
            </div>
          );
        })}
      </div>

      {selectedTeam && (
        <div className="mt-16 flex flex-col gap-8 items-center">
          <div className="text-xl">
            You&apos;ve selected{" "}
            <span className="text-3xl font-bold">{selectedTeam.name}</span>
          </div>
          {/* <Image
            src={TEAM_IMAGES[selectedTeam.key as TeamKeys]}
            width={160}
            height={160}
            alt={selectedTeam.name}
          /> */}
          <p className="text-xl text-center">
            {TEAM_PERKS[selectedTeam.key as TeamKeys]}
          </p>
          <Button onClick={handleChooseTeam} disabled={loading}>
            {loading ? "Choosing..." : "Choose Team"}
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      )}
    </div>
  );
}
