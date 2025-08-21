"use client";

import { useEffect, useRef } from "react";

type Vec = { x: number; y: number };
type Node = {
  base: Vec;
  pos: Vec;
  phase: number;
  speed: number;
  amp: number;
  neighbors: number[];
};

type Props = {
  className?: string;
  density?: number;
  rings?: number;
  ringPoints?: number;
  attractRadius?: number;
  stickyRadius?: number;
  mergeDistance?: number;
  lineOpacity?: number;
};

export default function HeroFX({
  className,
  density = 0.00010,
  rings = 3,
  ringPoints = 24,
  attractRadius = 140,
  stickyRadius = 36,
  mergeDistance = 28,
  lineOpacity = 0.15
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; inside: boolean }>({ x: 0, y: 0, inside: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const container = canvas.parentElement as HTMLElement;

    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let width = 0, height = 0;

    function setSize(wCSS: number, hCSS: number) {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      width = Math.max(1, Math.floor(wCSS * dpr));
      height = Math.max(1, Math.floor(hCSS * dpr));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${wCSS}px`;
      canvas.style.height = `${hCSS}px`;
    }

    const doc = document.documentElement;
    const getVar = (n: string) => getComputedStyle(doc).getPropertyValue(n).trim();
    const hsl = (n: string) => `hsl(${getVar(n) || "0 0% 0%"} )`;
    let colorPrimary = hsl("--brand-primary");
    let colorCTA = hsl("--brand-cta");
    const contentColor = hsl("--content");

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    let nodes: Node[] = [];
    const dist = (a: Vec, b: Vec) => Math.hypot(a.x - b.x, a.y - b.y);

    function buildNodes() {
      nodes = [];
      const cx = width / 2;
      const cy = height / 2;
      const minDim = Math.min(width, height);
      const ringGap = (minDim * 0.35) / Math.max(1, rings);

      for (let r = 1; r <= rings; r++) {
        const radius = r * ringGap;
        for (let i = 0; i < ringPoints; i++) {
          const t = (i / ringPoints) * Math.PI * 2;
          const bx = cx + Math.cos(t) * radius;
          const by = cy + Math.sin(t) * radius;
          nodes.push({
            base: { x: bx, y: by },
            pos: { x: bx, y: by },
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.6,
            amp: 6 + Math.random() * 10,
            neighbors: []
          });
        }
      }

      const areaCSS = (width / dpr) * (height / dpr);
      const gridCount = Math.floor(areaCSS * density);
      for (let i = 0; i < gridCount; i++) {
        const gx = Math.random() * width;
        const gy = Math.random() * height;
        nodes.push({
          base: { x: gx, y: gy },
          pos: { x: gx, y: gy },
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.5,
          amp: 4 + Math.random() * 8,
          neighbors: []
        });
      }

      const k = 3;
      for (let i = 0; i < nodes.length; i++) {
        const dists: Array<{ j: number; d2: number }> = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].base.x - nodes[j].base.x;
          const dy = nodes[i].base.y - nodes[j].base.y;
          dists.push({ j, d2: dx * dx + dy * dy });
        }
        dists.sort((a, b) => a.d2 - b.d2);
        nodes[i].neighbors = dists.slice(0, k).map((p) => p.j);
      }
    }

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const wCSS = Math.floor(entry.contentRect.width);
        const hCSS = Math.floor(entry.contentRect.height);
        setSize(wCSS, hCSS);
        buildNodes();
      }
    });
    ro.observe(container);

    let t0 = performance.now();
    function render(now: number) {
      const dt = (now - t0) / 1000;
      t0 = now;

      colorPrimary = hsl("--brand-primary");
      colorCTA = hsl("--brand-cta");

      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reduceMotion) n.phase += dt * n.speed;
        const ox = Math.cos(n.phase) * n.amp;
        const oy = Math.sin(n.phase * 0.9) * n.amp;
        const target: Vec = { x: n.base.x + ox, y: n.base.y + oy };

        if (mouseRef.current.inside) {
          const m = mouseRef.current;
          const d = dist(target, m);
          if (d < 140 * dpr) {
            const k = (1 - d / (140 * dpr)) ** 2;
            target.x = target.x + (m.x - target.x) * 0.12 * k;
            target.y = target.y + (m.y - target.y) * 0.12 * k;
            if (d < 36 * dpr) {
              target.x = m.x;
              target.y = m.y;
            }
          }
        }

        n.pos.x += (target.x - n.pos.x) * (reduceMotion ? 1 : 0.22);
        n.pos.y += (target.y - n.pos.y) * (reduceMotion ? 1 : 0.22);
      }

      ctx.lineWidth = 2 * dpr;
      ctx.globalAlpha = lineOpacity;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (const j of a.neighbors) {
          if (j <= i) continue;
          const b = nodes[j];
          const grad = ctx.createLinearGradient(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
          grad.addColorStop(0, colorPrimary);
          grad.addColorStop(1, colorCTA);
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(a.pos.x, a.pos.y);
          ctx.lineTo(b.pos.x, b.pos.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = contentColor;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.pos.x, n.pos.y, 1.2 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouseRef.current.inside) {
        let minI = -1, minD = Infinity;
        const m = mouseRef.current;
        for (let i = 0; i < nodes.length; i++) {
          const d = dist(nodes[i].pos, m);
          if (d < minD) { minD = d; minI = i; }
        }
        if (minI >= 0 && minD < 36 * dpr + 2) {
          const a = nodes[minI];
          let bestJ = -1, bestD = Infinity;
          for (const j of a.neighbors) {
            const d = dist(a.pos, nodes[j].pos);
            if (d < bestD) { bestD = d; bestJ = j; }
          }
          if (bestJ >= 0 && bestD < 28 * dpr) {
            const b = nodes[bestJ];
            const grad = ctx.createLinearGradient(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
            grad.addColorStop(0, colorCTA);
            grad.addColorStop(1, colorPrimary);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 5 * dpr;
            ctx.shadowColor = colorCTA;
            ctx.shadowBlur = 12 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.pos.x, a.pos.y);
            ctx.lineTo(b.pos.x, b.pos.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      rafRef.current = requestAnimationFrame(render);
    }

    function onPointerMove(e: PointerEvent) {
      const r = container.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x >= 0 && y >= 0 && x <= r.width && y <= r.height) {
        mouseRef.current.inside = true;
        mouseRef.current.x = x * dpr;
        mouseRef.current.y = y * dpr;
      } else {
        mouseRef.current.inside = false;
      }
    }
    function onPointerLeave() { mouseRef.current.inside = false; }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    const r0 = container.getBoundingClientRect();
    setSize(r0.width, r0.height);
    buildNodes();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
    };
  }, [density, rings, ringPoints, attractRadius, stickyRadius, mergeDistance, lineOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}