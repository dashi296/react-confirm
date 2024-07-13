import React from "react"
import { useCounter } from "../lib/main"


export default function App() {
  const { counter, increment } = useCounter()
  return (
    <div>
      {counter}
      <button onClick={increment}>increment</button>
    </div>
  )
}