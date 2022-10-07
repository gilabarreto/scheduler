// Custom Hook that allows us to manage the visual mode of the Appointment component.

import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {

    setMode(newMode)
    setHistory([...history, newMode])

    if (replace === true) {
      setHistory([...history])
    }
  };

  const back = () => {
    if (history.length >= 2) {
      let historyCopy = [...history]
      historyCopy.pop()
      setHistory(historyCopy)
      setMode(historyCopy[historyCopy.length - 1])
    }
  };

  return { mode, transition, back };

}