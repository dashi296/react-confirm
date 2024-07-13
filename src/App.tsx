import React from "react"
import { useConfirm } from "../lib/main"

import { useState } from "react"
export function useCounter() {
  const [counter, setCounter] = useState(0)
  const increment = () => setCounter((prev => prev + 1))
  const reset = () => setCounter(0)
  return { counter, increment, reset }
}

export default function App() {
  const { counter, increment, reset } = useCounter()
  const { confirm } = useConfirm()
  const handleClick = async () => {
    const result = await confirm({ title: "sample", message: "Are you sure?"})
    if (result) {
      increment()
      return;
    }
    reset();
  }
  return (
    <div>
      {counter}
      <button onClick={handleClick}>increment</button>
    </div>
  )
}