'use client';

import { useEffect, useState } from 'react';

type Node = { x: number; y: number; r: number; delay: number };

const NODES: Node[] = [
  { x: 80, y: 90, r: 5, delay: 0 },
  { x: 220, y: 60, r: 7, delay: 0.4 },
  { x: 360, y: 110, r: 6, delay: 0.8 },
  { x: 460, y: 200, r: 9, delay: 1.2 },
  { x: 320, y: 240, r: 5, delay: 0.6 },
  { x: 160, y: 220, r: 6, delay: 0.2 },
  { x: 60, y: 290, r: 5, delay: 1.0 },
  { x: 270, y: 350, r: 7, delay: 0.5 },
  { x: 410, y: 320, r: 5, delay: 1.4 },
  { x: 200, y: 140, r: 4, delay: 0.7 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [4, 7], [7, 8],
  [1, 9], [9, 5], [2, 9], [3, 7], [0, 5], [6, 7],
];

export function NodeGraph() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <svg
      viewBox="0 0 520 400"
      className="h-full w-full"
      role="img"
      aria-label="Network of connected knowledge nodes"
    >
      <defs>
        <radialGradient id="ngGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
      </defs>

      {EDGES.map(([a, b], i) => {
        const A = NODES[a], B = NODES[b];
        const phase = (Math.sin((tick + i * 6) / 12) + 1) / 2;
        return (
          <line
            key={i}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="#2563EB"
            strokeOpacity={0.18 + phase * 0.18}
            strokeWidth={1}
          />
        );
      })}

      {NODES.map((n, i) => {
        const phase = (Math.sin((tick + n.delay * 30) / 8) + 1) / 2;
        return (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r * 4}
              fill="url(#ngGlow)"
              opacity={0.25 + phase * 0.35}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="#2563EB"
              opacity={0.85}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r - 1.5}
              fill="#60A5FA"
              opacity={0.6 + phase * 0.4}
            />
          </g>
        );
      })}
    </svg>
  );
}
