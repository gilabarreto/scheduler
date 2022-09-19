import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);

  const transition = setMode

  return { mode, transition };

}