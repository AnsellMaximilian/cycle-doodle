"use client";

import { usePlay } from "@/contexts/PlayContext";
import React from "react";
import PromptList from "../play/PromptList";

export default function AdminControl() {
  const { audiences } = usePlay();
  return (
    <div>
      <PromptList />
    </div>
  );
}
