import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center place-items-center h-[80dvh]">
      <CircularProgress />
    </div>
  );
}

export default Loading;
