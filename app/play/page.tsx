"use client";

import React from "react";

export default function PlayPage() {
  return (
    <div>
      <div className="grid-cols-12 grid w-[600px] mx-auto border-black border">
        {Array.from({ length: 144 }).map((_, i) => {
          return (
            <div
              key={i}
              className="w-full aspect-square border-black border hover:brightness-90 bg-white cursor-pointer"
            ></div>
          );
        })}
      </div>
    </div>
  );
}
