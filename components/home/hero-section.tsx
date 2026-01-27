"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"

type TrailPoint = {
  x: number
  y: number
  life: number
  color: string
}

function PixelGrid({
  mouse,
  containerRef,
}: {
  mouse: { x: number; y: number }
  containerRef: React.RefObject<HTMLDivElement>
}) {
  // Deeper colors + higher contrast
  const trailColors = ["#FF1F1F", "#12B76A", "#F5C400", "#FFFFFF"] // deep red, deep green, deep yellow, white
  const [trail, setTrail] = React.useState<TrailPoint[]>([])
  const [gridSize, setGridSize] = React.useState({ cols: 40, rows: 20 })

  // Update grid dynamically based on container size
  React.useEffect(() => {
    function updateGrid() {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      const pixelSize = 25 // px per cell
      const cols = Math.max(10, Math.floor(width / pixelSize))
      const rows = Math.max(10, Math.floor(height / pixelSize))
      setGridSize({ cols, rows })
    }

    updateGrid()
    window.addEventListener("resize", updateGrid)
    return () => window.removeEventListener("resize", updateGrid)
  }, [containerRef])

  React.useEffect(() => {
    if (mouse.x < 0 || mouse.y < 0) return

    setTrail((prev) => {
      const updated = prev
        .map((p) => ({ ...p, life: p.life - 1 }))
        .filter((p) => p.life > 0)

      // more points + longer life => richer trail
      for (let i = 0; i < 6; i++) {
        updated.unshift({
          x: mouse.x,
          y: mouse.y,
          life: 6 - i,
          color: trailColors[i % trailColors.length],
        })
      }

      return updated.slice(0, 90)
    })
  }, [mouse])

  const { cols, rows } = gridSize

  return (
    <div
      className="absolute inset-0 z-[1]"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, index) => {
        const row = Math.floor(index / cols)
        const col = index % cols

        const trailPoint = trail.find((p) => p.x === col && p.y === row)

        // Full opacity on hover cell + deeper visibility overall
        const opacity = trailPoint ? Math.max(0.35, trailPoint.life / 6) : 0

        return (
          <div
            key={`${row}-${col}`}
            className="w-full h-full"
            style={{
              // light outline on each grid cell
              outline: "1px solid rgba(255,255,255,0.06)",
              outlineOffset: "-1px",
            }}
          >
            {trailPoint && (
              <motion.div
                animate={{ opacity }}
                transition={{ duration: 0.08 }}
                className="w-full h-full"
                style={{
                  backgroundColor: trailPoint.color,
                  borderRadius: 0,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export function HeroSection() {
  const [mouse, setMouse] = React.useState({ x: -1, y: -1 })
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="m-4 md:m-8 lg:m-12 bg-background rounded-3xl overflow-hidden">
      <section
        ref={containerRef}
        className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
        onMouseMove={(e) => {
          if (!containerRef.current) return
          const rect = containerRef.current.getBoundingClientRect()
          const pixelSize = 25
          const cols = Math.max(10, Math.floor(rect.width / pixelSize))
          const rows = Math.max(10, Math.floor(rect.height / pixelSize))

          let x = Math.floor(((e.clientX - rect.left) / rect.width) * cols)
          let y = Math.floor(((e.clientY - rect.top) / rect.height) * rows)

          x = Math.min(cols - 1, Math.max(0, x))
          y = Math.min(rows - 1, Math.max(0, y))
          setMouse({ x, y })
        }}
        onMouseLeave={() => setMouse({ x: -1, y: -1 })}
      >
        {/* GRID BACKGROUND */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundSize: "30px 30px",
            backgroundImage:
              "linear-gradient(to right, rgba(128,128,128,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.1) 1px, transparent 1px)",
          }}
        />

        {/* PIXEL GRID */}
        <PixelGrid mouse={mouse} containerRef={containerRef} />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60 z-[2]" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Automation services <br />
            with{" "}
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 bg-clip-text text-transparent">
              RPA Tools
            </span>{" "}
            + APIs
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground">
            Intelligent automation solutions built for scale and speed.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">
                Get Started <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-8">
              <Link href="/services">
                <Icon icon="mdi:play" className="mr-2 h-4 w-4" />
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
