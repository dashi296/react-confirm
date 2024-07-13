import React from "react"
import { useConfirm, useCounter } from "../lib/main"


export default function App() {
  const { counter, increment } = useCounter()
  const { confirm } = useConfirm()
  const handleClick = async () => {
    const result = await confirm({ title: "sample", message: "Are you sure?"})
    if (result) {
      increment()
    }
  }
  return (
    <div>
      {counter}
      <button onClick={handleClick}>increment</button>
    </div>
  )
}