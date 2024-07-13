import { useState } from "react"
export function useCounter() {
  const [counter, setCounter] = useState(0)
  const increment = () => setCounter((prev => prev + 1))
  return { counter, increment }
}

export { ConfirmProvider, useConfirm } from "./contexts/confirm"