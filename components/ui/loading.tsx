'use client'

import { useEffect, useRef } from 'react'


export default function Loading() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let rotation = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(rotation)

      // Draw three intersecting circles
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(30, 0, 40, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.rotate((Math.PI * 2) / 3)
      }

      ctx.restore()

      rotation += 0.02
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f10]">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="max-w-full max-h-full"
        aria-label="Loading animation"
      />
      <p className="mt-8 text-white text-sm font-bold tracking-widest uppercase">Loading</p>
    </div>
  )
}
