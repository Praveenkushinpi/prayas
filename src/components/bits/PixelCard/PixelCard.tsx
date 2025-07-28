"use client";
import { useEffect, useRef } from "react";
import type { JSX } from "react";
import "./PixelCard.css";

/********************
 * UTILITY CLASSES  *
 *******************/
class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.rand(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.rand(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  private rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private draw() {
    const offset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) this.isShimmer = true;
    this.isShimmer ? this.shimmer() : (this.size += this.sizeStep);
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  private shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

/********************
 * HELPER FUNCTIONS *
 *******************/
function effectiveSpeed(value: number, reduced: boolean) {
  const throttle = 0.001;
  if (reduced || value <= 0) return 0;
  if (value >= 100) return 100 * throttle;
  return value * throttle;
}

/********************
 * VARIANT SETTINGS *
 *******************/
const VARIANTS = {
  default: { activeColor: null, gap: 5, speed: 35, colors: "#f8fafc,#f1f5f9,#cbd5e1", noFocus: false },
  blue:    { activeColor: "#e0f2fe", gap: 10, speed: 25, colors: "#e0f2fe,#7dd3fc,#0ea5e9", noFocus: false },
  yellow:  { activeColor: "#fef08a", gap: 3,  speed: 20, colors: "#fef08a,#fde047,#eab308", noFocus: false },
  pink:    { activeColor: "#fecdd3", gap: 6,  speed: 80, colors: "#fecdd3,#fda4af,#e11d48", noFocus: true  },
} as const;

type VariantName = keyof typeof VARIANTS;
interface PixelCardProps {
  variant?: VariantName;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children: React.ReactNode;
}

/********************
 * PIXEL CARD        *
 *******************/
export default function PixelCard({
  variant = "default",
  gap,
  speed,
  colors,
  noFocus,
  className = "",
  children,
}: PixelCardProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const reducedMotion = useRef(false);

  /* ----------------- Variant defaults ----------------- */
  const cfg = VARIANTS[variant];
  const finalGap = gap ?? cfg.gap;
  const finalSpeed = speed ?? cfg.speed;
  const finalColors = colors ?? cfg.colors;
  const finalNoFocus = noFocus ?? cfg.noFocus;

  /* ----------------- Init ----------------- */
  useEffect(() => {
    if (typeof window !== "undefined") {
      reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const initPixels = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      canvasRef.current.width = w;
      canvasRef.current.height = h;

      const colorArr = finalColors.split(",");
      const pxs: Pixel[] = [];
      for (let x = 0; x < w; x += finalGap) {
        for (let y = 0; y < h; y += finalGap) {
          const color = colorArr[Math.floor(Math.random() * colorArr.length)];
          const dx = x - w / 2;
          const dy = y - h / 2;
          const delay = reducedMotion.current ? 0 : Math.sqrt(dx * dx + dy * dy);
          pxs.push(
            new Pixel(
              canvasRef.current,
              ctx,
              x,
              y,
              color,
              effectiveSpeed(finalSpeed, reducedMotion.current),
              delay
            )
          );
        }
      }
      pixelsRef.current = pxs;
    };

    const animate = (fn: keyof Pixel) => {
      frameRef.current = requestAnimationFrame(() => animate(fn));
      const now = performance.now();
      if (now - lastTimeRef.current < 1000 / 60) return;
      lastTimeRef.current = now;

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !canvasRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      let idle = true;
      pixelsRef.current.forEach((p) => {
        // @ts-ignore
        p[fn]();
        if (!p.isIdle) idle = false;
      });
      if (idle && frameRef.current) cancelAnimationFrame(frameRef.current);
    };

    initPixels();
    const resizeObserver = new ResizeObserver(initPixels);
    containerRef.current && resizeObserver.observe(containerRef.current);

    const onEnter = () => animate("appear");
    const onLeave = () => animate("disappear");

    const el = containerRef.current;
    el?.addEventListener("mouseenter", onEnter);
    el?.addEventListener("mouseleave", onLeave);

    return () => {
      resizeObserver.disconnect();
      el?.removeEventListener("mouseenter", onEnter);
      el?.removeEventListener("mouseleave", onLeave);
      frameRef.current && cancelAnimationFrame(frameRef.current);
    };
  }, [finalGap, finalSpeed, finalColors, finalNoFocus]);

  /* ----------------- Render ----------------- */
  return (
    <div
      ref={containerRef}
      className={`pixel-card relative overflow-hidden ${className}`}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <canvas ref={canvasRef} className="pixel-canvas absolute inset-0" />
      {children}
    </div>
  );
}
