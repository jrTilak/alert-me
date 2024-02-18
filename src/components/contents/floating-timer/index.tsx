import { useEffect, useState } from "react"

const FloatingTimerIndex = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "50%",
        backgroundColor: "white",
        border: "1px solid black",
        height: "50px",
        width: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "1rem",
          color: "black"
        }}>
        {time}
      </h1>
    </div>
  )
}
export default FloatingTimerIndex
