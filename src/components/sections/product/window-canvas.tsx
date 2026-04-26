"use client";

import { useRef, useEffect } from "react";

export type InstallationType = "recessed" | "surface" | "fullWall";
export type MountingType = "ceiling" | "frame";

interface WindowCanvasProps {
  widthCm: number;
  heightCm: number;
  isOpen: boolean;
  installation: InstallationType;
  mounting: MountingType;
  blindColor?: string;
}

type DrawParams = {
  widthCm: number;
  heightCm: number;
  installation: InstallationType;
  mounting: MountingType;
  blindColor: string;
};

function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (n >> 16) + amt);
  const g = Math.min(255, ((n >> 8) & 0xff) + amt);
  const b = Math.min(255, (n & 0xff) + amt);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function darken(hex: string, amt: number): string {
  return lighten(hex, -amt);
}

function drawCanvas(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  p: DrawParams,
  progress: number,
) {
  const { widthCm, heightCm, installation, mounting, blindColor } = p;

  ctx.clearRect(0, 0, W, H);

  // ── ROOM SCENE ──────────────────────────────────────────
  // Ceiling
  ctx.fillStyle = "#F0EEE9";
  ctx.fillRect(0, 0, W, H * 0.10);

  // Wall — clean architectural neutral
  const wallG = ctx.createLinearGradient(0, H * 0.10, W, H * 0.85);
  wallG.addColorStop(0, "#ECEAE5");
  wallG.addColorStop(0.45, "#F4F1EC");
  wallG.addColorStop(1, "#ECEAE5");
  ctx.fillStyle = wallG;
  ctx.fillRect(0, H * 0.10, W, H * 0.75);

  // Subtle edge vignette on wall
  const wallEdge = ctx.createLinearGradient(0, 0, W, 0);
  wallEdge.addColorStop(0, "rgba(0,0,0,.05)");
  wallEdge.addColorStop(0.18, "rgba(0,0,0,0)");
  wallEdge.addColorStop(0.82, "rgba(0,0,0,0)");
  wallEdge.addColorStop(1, "rgba(0,0,0,.05)");
  ctx.fillStyle = wallEdge;
  ctx.fillRect(0, H * 0.10, W, H * 0.75);

  // Cornice
  ctx.fillStyle = "#E4E0D9";
  ctx.fillRect(0, H * 0.095, W, H * 0.012);
  ctx.fillStyle = "rgba(0,0,0,.07)";
  ctx.fillRect(0, H * 0.095 + H * 0.012, W, 2);

  // Floor — light oak hardwood
  const floorY = H * 0.85;
  const floorH2 = H * 0.15;
  const floorBase = ctx.createLinearGradient(0, floorY, 0, floorY + floorH2);
  floorBase.addColorStop(0, "#B89860");
  floorBase.addColorStop(1, "#9A7D48");
  ctx.fillStyle = floorBase;
  ctx.fillRect(0, floorY, W, floorH2);

  // Floor planks (vertical dividers)
  const plankW = W / 7;
  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.035)";
    ctx.fillRect(i * plankW, floorY, plankW, floorH2);
    ctx.strokeStyle = "rgba(0,0,0,.09)";
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(i * plankW, floorY); ctx.lineTo(i * plankW, floorY + floorH2); ctx.stroke();
  }

  // Floor grain lines
  ctx.strokeStyle = "rgba(80,50,15,.10)";
  ctx.lineWidth = 0.4;
  for (let i = 1; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(0, floorY + (floorH2 / 5) * i);
    ctx.lineTo(W, floorY + (floorH2 / 5) * i);
    ctx.stroke();
  }

  // Floor near-wall highlight
  const floorHL = ctx.createLinearGradient(0, floorY, 0, floorY + floorH2 * 0.28);
  floorHL.addColorStop(0, "rgba(255,255,255,.12)");
  floorHL.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = floorHL;
  ctx.fillRect(0, floorY, W, floorH2 * 0.28);

  // Baseboard
  ctx.fillStyle = "#E0DAD0";
  ctx.fillRect(0, H * 0.838, W, H * 0.016);
  ctx.fillStyle = "rgba(0,0,0,.08)";
  ctx.fillRect(0, H * 0.838 + H * 0.016, W, 2);

  // ── WINDOW / BLIND GEOMETRY ──────────────────────────────
  const aspect = widthCm / heightCm;
  let fX: number, fY: number, fW: number, fH: number;

  if (installation === "fullWall") {
    fW = Math.min(W * 0.86, H * 0.70 * aspect);
    fH = fW / aspect;
    if (fH > H * 0.70) { fH = H * 0.70; fW = fH * aspect; }
    fX = (W - fW) / 2; fY = H * 0.12;
  } else {
    const maxW = W * 0.62; const maxH = H * 0.60;
    fW = Math.min(maxW, maxH * aspect);
    fH = fW / aspect;
    if (fH > maxH) { fH = maxH; fW = fH * aspect; }
    fX = (W - fW) / 2; fY = H * 0.165;
  }

  // Blind bounds — recessed flush at top (bY = fY, no gap)
  let bX: number, bY: number, bW: number, bH: number;
  if (installation === "recessed") {
    bX = fX + 4; bY = fY; bW = fW - 8; bH = fH;
  } else if (installation === "fullWall") {
    bX = fX; bY = fY; bW = fW; bH = fH;
  } else {
    bX = fX - 8; bY = fY - 14; bW = fW + 16; bH = fH + 19;
  }

  // ── RECESSED REVEAL ──────────────────────────────────────
  if (installation === "recessed") {
    const d = 12;
    // Top reveal
    ctx.fillStyle = "#D8D0C4";
    ctx.beginPath();
    ctx.moveTo(fX, fY); ctx.lineTo(fX - d, fY - d);
    ctx.lineTo(fX + fW + d, fY - d); ctx.lineTo(fX + fW, fY);
    ctx.closePath(); ctx.fill();
    const topRevShad = ctx.createLinearGradient(0, fY - d, 0, fY);
    topRevShad.addColorStop(0, "rgba(0,0,0,.10)");
    topRevShad.addColorStop(1, "rgba(0,0,0,.02)");
    ctx.fillStyle = topRevShad;
    ctx.beginPath();
    ctx.moveTo(fX, fY); ctx.lineTo(fX - d, fY - d);
    ctx.lineTo(fX + fW + d, fY - d); ctx.lineTo(fX + fW, fY);
    ctx.closePath(); ctx.fill();
    // Left (in shadow)
    ctx.fillStyle = "#BBAF A2";
    ctx.fillStyle = "#BDB5A8";
    ctx.beginPath();
    ctx.moveTo(fX, fY); ctx.lineTo(fX - d, fY - d);
    ctx.lineTo(fX - d, fY + fH + d); ctx.lineTo(fX, fY + fH);
    ctx.closePath(); ctx.fill();
    // Right (light)
    ctx.fillStyle = "#E2D9CC";
    ctx.beginPath();
    ctx.moveTo(fX + fW, fY); ctx.lineTo(fX + fW + d, fY - d);
    ctx.lineTo(fX + fW + d, fY + fH + d); ctx.lineTo(fX + fW, fY + fH);
    ctx.closePath(); ctx.fill();
    // Bottom reveal
    ctx.fillStyle = "#CEC6B8";
    ctx.beginPath();
    ctx.moveTo(fX, fY + fH); ctx.lineTo(fX - d, fY + fH + d);
    ctx.lineTo(fX + fW + d, fY + fH + d); ctx.lineTo(fX + fW, fY + fH);
    ctx.closePath(); ctx.fill();
  }

  // ── GLASS / OUTDOOR SCENE ────────────────────────────────
  ctx.save();
  ctx.beginPath();
  ctx.rect(fX, fY, fW, fH);
  ctx.clip();

  // Sky gradient
  const skyG = ctx.createLinearGradient(fX, fY, fX, fY + fH * 0.55);
  skyG.addColorStop(0, "#4898C8");
  skyG.addColorStop(0.55, "#88C8E8");
  skyG.addColorStop(1, "#B8E2F6");
  ctx.fillStyle = skyG;
  ctx.fillRect(fX, fY, fW, fH * 0.55);

  // Horizon haze
  const hazeG = ctx.createLinearGradient(fX, fY + fH * 0.45, fX, fY + fH * 0.58);
  hazeG.addColorStop(0, "rgba(255,252,235,.0)");
  hazeG.addColorStop(1, "rgba(255,252,235,.38)");
  ctx.fillStyle = hazeG;
  ctx.fillRect(fX, fY + fH * 0.45, fW, fH * 0.14);

  // Ground
  const groundG = ctx.createLinearGradient(fX, fY + fH * 0.55, fX, fY + fH);
  groundG.addColorStop(0, "#78BC52");
  groundG.addColorStop(0.55, "#5A9C38");
  groundG.addColorStop(1, "#3C7820");
  ctx.fillStyle = groundG;
  ctx.fillRect(fX, fY + fH * 0.55, fW, fH * 0.45);

  // Trees
  ctx.fillStyle = "rgba(35,80,25,.48)";
  const treePositions = [0.12, 0.42, 0.72];
  for (const tx of treePositions) {
    const tBaseX = fX + fW * tx;
    const tBaseY = fY + fH * 0.55;
    const tHt = fH * 0.22;
    // Trunk
    ctx.fillStyle = "rgba(60,40,20,.40)";
    ctx.fillRect(tBaseX - fW * 0.008, tBaseY - tHt * 0.28, fW * 0.016, tHt * 0.28);
    // Tree tiers
    ctx.fillStyle = "rgba(35,80,28,.50)";
    ctx.beginPath(); ctx.moveTo(tBaseX - fW * 0.065, tBaseY - tHt * 0.28); ctx.lineTo(tBaseX + fW * 0.065, tBaseY - tHt * 0.28); ctx.lineTo(tBaseX, tBaseY - tHt * 0.62); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "rgba(30,75,22,.55)";
    ctx.beginPath(); ctx.moveTo(tBaseX - fW * 0.05, tBaseY - tHt * 0.52); ctx.lineTo(tBaseX + fW * 0.05, tBaseY - tHt * 0.52); ctx.lineTo(tBaseX, tBaseY - tHt * 0.86); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "rgba(25,70,18,.55)";
    ctx.beginPath(); ctx.moveTo(tBaseX - fW * 0.034, tBaseY - tHt * 0.74); ctx.lineTo(tBaseX + fW * 0.034, tBaseY - tHt * 0.74); ctx.lineTo(tBaseX, tBaseY - tHt); ctx.closePath(); ctx.fill();
  }

  // Sun
  const sx = fX + fW * 0.78, sy = fY + fH * 0.13;
  const sunG = ctx.createRadialGradient(sx, sy, 0, sx, sy, fW * 0.11);
  sunG.addColorStop(0, "rgba(255,242,100,.95)");
  sunG.addColorStop(0.45, "rgba(255,218,50,.50)");
  sunG.addColorStop(1, "rgba(255,200,30,0)");
  ctx.fillStyle = sunG;
  ctx.beginPath(); ctx.arc(sx, sy, fW * 0.11, 0, Math.PI * 2); ctx.fill();

  // Cloud
  const cs = fW / 180;
  ctx.fillStyle = "rgba(255,255,255,.88)";
  const cx2 = fX + fW * 0.16, cy2 = fY + fH * 0.22;
  ctx.beginPath();
  ctx.arc(cx2, cy2, 9 * cs, 0, Math.PI * 2);
  ctx.arc(cx2 + 12 * cs, cy2 - 4 * cs, 7 * cs, 0, Math.PI * 2);
  ctx.arc(cx2 + 23 * cs, cy2, 9 * cs, 0, Math.PI * 2);
  ctx.fill();

  // Glass glare
  const glareG = ctx.createLinearGradient(fX, fY, fX + fW * 0.28, fY + fH * 0.32);
  glareG.addColorStop(0, "rgba(255,255,255,.10)");
  glareG.addColorStop(0.5, "rgba(255,255,255,.04)");
  glareG.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glareG;
  ctx.fillRect(fX, fY, fW, fH);

  ctx.restore(); // end glass clip

  // ── WINDOW FRAME ─────────────────────────────────────────
  if (installation !== "fullWall") {
    // Frame drop shadow
    ctx.fillStyle = "rgba(0,0,0,.14)";
    ctx.fillRect(fX + 2, fY + 2, fW, fH);

    // Outer frame
    ctx.lineWidth = 4.5; ctx.strokeStyle = "#8A806E";
    ctx.strokeRect(fX, fY, fW, fH);

    // Inner highlight bead
    ctx.lineWidth = 1; ctx.strokeStyle = "#AEA696";
    ctx.strokeRect(fX + 2.5, fY + 2.5, fW - 5, fH - 5);

    // Mullions
    ctx.lineWidth = 3; ctx.strokeStyle = "#8A806E";
    ctx.beginPath(); ctx.moveTo(fX + fW / 2, fY); ctx.lineTo(fX + fW / 2, fY + fH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fX, fY + fH * 0.5); ctx.lineTo(fX + fW, fY + fH * 0.5); ctx.stroke();

    // Window sill (surface only)
    if (installation === "surface") {
      const sillG = ctx.createLinearGradient(0, fY + fH, 0, fY + fH + 13);
      sillG.addColorStop(0, "#D0C8BC");
      sillG.addColorStop(1, "#BCAEA0");
      ctx.fillStyle = sillG;
      ctx.fillRect(fX - 7, fY + fH, fW + 14, 13);
      ctx.strokeStyle = "rgba(0,0,0,.09)"; ctx.lineWidth = 0.5;
      ctx.strokeRect(fX - 7, fY + fH, fW + 14, 13);
    }
  }

  // ── MOUNTING HARDWARE ────────────────────────────────────
  if (mounting === "ceiling" && installation !== "recessed") {
    const bracketG = ctx.createLinearGradient(bX, bY - 13, bX, bY);
    bracketG.addColorStop(0, "#5A5048");
    bracketG.addColorStop(1, "#3C3630");
    ctx.fillStyle = bracketG;
    ctx.fillRect(bX, bY - 13, bW, 13);
    const bc = Math.max(2, Math.floor(bW / 80));
    for (let i = 0; i <= bc; i++) {
      ctx.fillStyle = "#C9A96E";
      ctx.fillRect(bX + (bW / bc) * i - 3, bY - 18, 6, 7);
      ctx.strokeStyle = "#A88840"; ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(bX + (bW / bc) * i - 1, bY - 16);
      ctx.lineTo(bX + (bW / bc) * i + 1, bY - 16);
      ctx.stroke();
    }
  } else if (mounting === "frame" && installation === "surface") {
    const bc = Math.max(2, Math.floor(bW / 70));
    for (let i = 1; i <= bc; i++) {
      const bkX = bX + (bW / (bc + 1)) * i;
      ctx.fillStyle = "#4A4438"; ctx.fillRect(bkX - 7, bY - 8, 14, 10);
      ctx.fillStyle = "#C9A96E"; ctx.fillRect(bkX - 2, bY - 10, 4, 5);
    }
  }

  // ── BLIND ────────────────────────────────────────────────
  // progress=0 → fully closed (blind lowered to bottom)
  // progress=1 → fully open  (blind raised to top, only bundle visible)
  const headerH = 10;
  const bundleH = bH * 0.12; // compressed bundle height when fully raised

  // Bottom edge of blind travels: fully down (bY+bH) → fully up (bY+headerH+bundleH)
  const blindTopY = bY + headerH;
  const closedBottom = bY + bH;
  const openBottom = bY + headerH + bundleH;
  const blindBottomY = closedBottom - (closedBottom - openBottom) * progress;
  const currentBlindH = blindBottomY - blindTopY;

  if (currentBlindH > 1) {
    const totalSlats = Math.max(6, Math.round(heightCm / 5));
    // Fixed slat height (based on full closed size so slats don't stretch)
    const sH = (bH - headerH) / totalSlats;
    const visibleSlats = Math.ceil(currentBlindH / sH);

    // Clip so the bottom partial slat doesn't overdraw
    ctx.save();
    ctx.beginPath();
    ctx.rect(bX, blindTopY, bW, currentBlindH);
    ctx.clip();

    for (let i = 0; i < visibleSlats; i++) {
      const sy2 = blindTopY + i * sH;
      const even = i % 2 === 0;
      const sg = ctx.createLinearGradient(0, sy2, 0, sy2 + sH);
      if (even) {
        sg.addColorStop(0, lighten(blindColor, 18));
        sg.addColorStop(0.4, blindColor);
        sg.addColorStop(1, darken(blindColor, 22));
      } else {
        sg.addColorStop(0, darken(blindColor, 4));
        sg.addColorStop(1, darken(blindColor, 26));
      }
      ctx.fillStyle = sg;
      ctx.fillRect(bX + 1, sy2 + 0.5, bW - 2, sH - 1);

      ctx.fillStyle = `rgba(201,169,110,${even ? 0.22 : 0.06})`;
      ctx.fillRect(bX + 1, sy2 + 0.5, bW - 2, 1.5);

      ctx.fillStyle = "rgba(0,0,0,.20)";
      ctx.fillRect(bX + 1, sy2 + sH - 2, bW - 2, 2);
    }

    // Lateral sheen
    const sheen = ctx.createLinearGradient(bX, 0, bX + bW, 0);
    sheen.addColorStop(0, "rgba(255,255,255,.02)");
    sheen.addColorStop(0.22, "rgba(255,255,255,.09)");
    sheen.addColorStop(0.78, "rgba(255,255,255,.02)");
    sheen.addColorStop(1, "rgba(0,0,0,.07)");
    ctx.fillStyle = sheen;
    ctx.fillRect(bX, blindTopY, bW, currentBlindH);

    ctx.restore(); // end slat clip

    // Bottom hem bar (travels with blind bottom)
    ctx.fillStyle = darken(blindColor, 8);
    ctx.fillRect(bX + 1, blindBottomY - 4, bW - 2, 4);
    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.fillRect(bX + 1, blindBottomY - 1, bW - 2, 1);
  }

  // Header rail (always on top)
  const railG = ctx.createLinearGradient(bX, bY, bX, bY + headerH);
  railG.addColorStop(0, "#252525");
  railG.addColorStop(1, "#181818");
  ctx.fillStyle = railG;
  ctx.fillRect(bX, bY, bW, headerH);
  ctx.fillStyle = "#C9A96E";
  ctx.fillRect(bX + 2, bY + 2.5, bW - 4, 1.5);
  ctx.fillStyle = "rgba(255,255,255,.06)";
  ctx.fillRect(bX, bY, bW, 2);

  // ── CORD ─────────────────────────────────────────────────
  const cordX = bX + bW * 0.86;
  const tassleY = Math.max(blindBottomY - 4, bY + headerH + 8);
  ctx.strokeStyle = "rgba(201,169,110,.55)"; ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(cordX, bY + headerH); ctx.lineTo(cordX, tassleY); ctx.stroke();
  ctx.fillStyle = "#C9A96E";
  ctx.beginPath(); ctx.arc(cordX, tassleY, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.30)";
  ctx.beginPath(); ctx.arc(cordX - 1.2, tassleY - 1.5, 1.2, 0, Math.PI * 2); ctx.fill();

  // ── SIDE CHANNELS (recessed) ─────────────────────────────
  if (installation === "recessed") {
    ctx.fillStyle = "#181818";
    ctx.fillRect(bX - 4, bY, 4, bH);
    ctx.fillRect(bX + bW, bY, 4, bH);
    ctx.fillStyle = "rgba(255,255,255,.04)";
    ctx.fillRect(bX - 4, bY, 1, bH);
    ctx.fillRect(bX + bW + 3, bY, 1, bH);
  }

  // ── DIMENSION ANNOTATIONS ────────────────────────────────
  const ann = 4;

  // Width
  const wAnnY = bY + bH + 20;
  ctx.setLineDash([3, 3]); ctx.strokeStyle = "rgba(201,169,110,.32)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(bX, bY + bH + 2); ctx.lineTo(bX, wAnnY - 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bX + bW, bY + bH + 2); ctx.lineTo(bX + bW, wAnnY - 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = "rgba(201,169,110,.60)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(bX, wAnnY); ctx.lineTo(bX + bW, wAnnY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bX, wAnnY); ctx.lineTo(bX + ann, wAnnY - 3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bX, wAnnY); ctx.lineTo(bX + ann, wAnnY + 3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bX + bW, wAnnY); ctx.lineTo(bX + bW - ann, wAnnY - 3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bX + bW, wAnnY); ctx.lineTo(bX + bW - ann, wAnnY + 3); ctx.stroke();
  ctx.font = "bold 11px 'DM Sans', sans-serif"; ctx.fillStyle = "#C9A96E";
  ctx.textAlign = "center";
  ctx.fillText(`${widthCm} см`, bX + bW / 2, wAnnY + 13);

  // Height
  const hAnnX = bX - 22;
  ctx.setLineDash([3, 3]); ctx.strokeStyle = "rgba(201,169,110,.32)";
  ctx.beginPath(); ctx.moveTo(bX - 2, bY); ctx.lineTo(hAnnX - 2, bY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bX - 2, bY + bH); ctx.lineTo(hAnnX - 2, bY + bH); ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = "rgba(201,169,110,.60)";
  ctx.beginPath(); ctx.moveTo(hAnnX, bY); ctx.lineTo(hAnnX, bY + bH); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hAnnX, bY); ctx.lineTo(hAnnX - 3, bY + ann); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hAnnX, bY); ctx.lineTo(hAnnX + 3, bY + ann); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hAnnX, bY + bH); ctx.lineTo(hAnnX - 3, bY + bH - ann); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hAnnX, bY + bH); ctx.lineTo(hAnnX + 3, bY + bH - ann); ctx.stroke();
  ctx.save();
  ctx.translate(hAnnX - 9, bY + bH / 2); ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center"; ctx.fillStyle = "#C9A96E";
  ctx.fillText(`${heightCm} см`, 0, 0); ctx.restore();
}

export function WindowCanvas({
  widthCm,
  heightCm,
  isOpen,
  installation,
  mounting,
  blindColor = "#2A2A2A",
}: WindowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(isOpen ? 1 : 0);
  const rafRef = useRef(0);
  const propsRef = useRef({ widthCm, heightCm, installation, mounting, blindColor });
  propsRef.current = { widthCm, heightCm, installation, mounting, blindColor };

  function render(prog: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    ctx.save();
    ctx.scale(dpr, dpr);
    drawCanvas(ctx, W, H, propsRef.current, prog);
    ctx.restore();
  }

  useEffect(() => {
    const target = isOpen ? 1 : 0;
    let active = true;
    cancelAnimationFrame(rafRef.current);

    const startProgress = progressRef.current;
    const startTime = performance.now();
    const duration = 500;

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function tick(now: number) {
      if (!active) return;
      const t = Math.min(1, (now - startTime) / duration);
      progressRef.current = startProgress + (target - startProgress) * easeInOutCubic(t);
      render(progressRef.current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = target;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { active = false; cancelAnimationFrame(rafRef.current); };
  }, [isOpen]);

  useEffect(() => {
    render(progressRef.current);
  }, [widthCm, heightCm, installation, mounting, blindColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function setup() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      render(progressRef.current);
    }

    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    setup();
    return () => ro.disconnect();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
