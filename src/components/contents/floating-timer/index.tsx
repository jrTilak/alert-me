import cssText from "data-text:~components/contents/floating-timer/style.css"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import ContentUtils from "~utils/content-utils"

const FloatingTimerIndex = () => {
  const [time, setTime] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (
    e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const parent = containerRef?.current?.parentElement
    if (parent && isDragging) {
      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight
      const x = e.clientX - parent.offsetLeft - containerWidth / 2
      const y = e.clientY - parent.offsetTop - containerHeight / 2
      containerRef.current.style.left = `${x}px`
      containerRef.current.style.top = `${y}px`
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
    }
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isDragging])

  return (
    <>
      <style>{cssText}</style>
      <motion.div
        ref={containerRef}
        layout
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5, type: "spring" }
        }}
        exit={{ scale: 0, opacity: 0 }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className="container">
        <span className="timer">{ContentUtils.secToMinAndSec(time)}</span>
      </motion.div>
      {/* {isDragging && (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="dragging">
            Dragging
          </motion.div>
        </AnimatePresence>
      )} */}
    </>
  )
}
export default FloatingTimerIndex
