"use client";

import { useState, useEffect, useRef } from "react";
import { WindowCanvas, InstallationType, MountingType } from "./window-canvas";
import { calcSqm, calcPrice } from "@/lib/utils/price";
import { useOrder } from "@/lib/context/order-context";
import { useLanguage } from "@/lib/context/language-context";

interface Props {
  productId: string;
  productTitle: string;
  pricePerSqm: number;
}

const BLIND_COLORS = [
  { id: "charcoal", hex: "#1E1E1E", name: "Charcoal" },
  { id: "ivory", hex: "#DDD5C4", name: "Ivory" },
  { id: "slate", hex: "#5B6472", name: "Slate" },
  { id: "linen", hex: "#C0AA88", name: "Linen" },
  { id: "bronze", hex: "#7A5C38", name: "Bronze" },
  { id: "sage", hex: "#6A8E6A", name: "Sage" },
];

function RecessedIcon({ active }: { active: boolean }) {
  const c = active ? "#C9A96E" : "#9A9080";
  return (
    <svg width="44" height="36" viewBox="0 0 44 36" fill="none">
      <rect x="4" y="4" width="36" height="28" rx="1" stroke={c} strokeWidth="1.5" fill="none" />
      <rect x="8" y="8" width="28" height="20" rx="0.5" fill={active ? "rgba(201,169,110,.12)" : "rgba(154,144,128,.08)"} stroke={c} strokeWidth="1" />
      <rect x="9" y="8" width="26" height="5" rx="0" fill={active ? "#C9A96E" : "#4A4540"} opacity="0.9" />
      <line x1="9" y1="10" x2="35" y2="10" stroke={active ? "#E2C99A" : "#6A6050"} strokeWidth="0.8" />
      {[13, 15.5, 18, 20.5, 23, 25.5].map((y) => (
        <line key={y} x1="9" y1={y} x2="35" y2={y} stroke={c} strokeWidth="0.8" opacity="0.6" />
      ))}
    </svg>
  );
}

function SurfaceIcon({ active }: { active: boolean }) {
  const c = active ? "#C9A96E" : "#9A9080";
  return (
    <svg width="44" height="36" viewBox="0 0 44 36" fill="none">
      <rect x="10" y="7" width="24" height="22" rx="0.5" stroke={c} strokeWidth="1.2" fill="none" opacity="0.5" />
      <rect x="7" y="3" width="30" height="26" rx="0.5" fill={active ? "rgba(201,169,110,.12)" : "rgba(154,144,128,.08)"} stroke={c} strokeWidth="1.5" />
      <rect x="8" y="3" width="28" height="5.5" rx="0" fill={active ? "#C9A96E" : "#4A4540"} opacity="0.9" />
      <line x1="8" y1="5.5" x2="36" y2="5.5" stroke={active ? "#E2C99A" : "#6A6050"} strokeWidth="0.8" />
      {[10.5, 13, 15.5, 18, 20.5, 23, 25.5].map((y) => (
        <line key={y} x1="8" y1={y} x2="36" y2={y} stroke={c} strokeWidth="0.8" opacity="0.6" />
      ))}
      <line x1="7" y1="29" x2="37" y2="29" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

function FullWallIcon({ active }: { active: boolean }) {
  const c = active ? "#C9A96E" : "#9A9080";
  return (
    <svg width="44" height="36" viewBox="0 0 44 36" fill="none">
      <rect x="1" y="3" width="42" height="30" rx="0.5" fill={active ? "rgba(201,169,110,.12)" : "rgba(154,144,128,.08)"} stroke={c} strokeWidth="1.5" />
      <rect x="2" y="3" width="40" height="5.5" rx="0" fill={active ? "#C9A96E" : "#4A4540"} opacity="0.9" />
      <line x1="2" y1="5.5" x2="42" y2="5.5" stroke={active ? "#E2C99A" : "#6A6050"} strokeWidth="0.8" />
      {[10, 13, 16, 19, 22, 25, 28, 31].map((y) => (
        <line key={y} x1="2" y1={y} x2="42" y2={y} stroke={c} strokeWidth="0.8" opacity="0.6" />
      ))}
    </svg>
  );
}

function CeilingIcon({ active }: { active: boolean }) {
  const c = active ? "#C9A96E" : "#9A9080";
  return (
    <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
      <rect x="2" y="1" width="28" height="4" rx="0.5" fill={active ? "#C9A96E" : "#4A4540"} opacity="0.8" />
      <line x1="8" y1="5" x2="8" y2="27" stroke={c} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <line x1="24" y1="5" x2="24" y2="27" stroke={c} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <rect x="8" y="5" width="16" height="22" fill={active ? "rgba(201,169,110,.1)" : "rgba(154,144,128,.07)"} stroke={c} strokeWidth="1.2" />
    </svg>
  );
}

function FrameIcon({ active }: { active: boolean }) {
  const c = active ? "#C9A96E" : "#9A9080";
  return (
    <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
      <rect x="6" y="4" width="20" height="20" rx="0.5" stroke={c} strokeWidth="1" fill="none" opacity="0.5" />
      <rect x="8" y="1" width="16" height="22" fill={active ? "rgba(201,169,110,.1)" : "rgba(154,144,128,.07)"} stroke={c} strokeWidth="1.5" />
      <line x1="10" y1="1" x2="22" y2="1" stroke={c} strokeWidth="2" />
      <circle cx="13" cy="1" r="1.5" fill={active ? "#C9A96E" : "#9A9080"} />
      <circle cx="19" cy="1" r="1.5" fill={active ? "#C9A96E" : "#9A9080"} />
    </svg>
  );
}

function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef(0);
  const displayRef = useRef(target);

  useEffect(() => {
    cancelAnimationFrame(frameRef.current);
    function tick() {
      const diff = target - displayRef.current;
      if (Math.abs(diff) < 1) { displayRef.current = target; setDisplay(target); return; }
      displayRef.current += diff * 0.16;
      setDisplay(Math.round(displayRef.current));
      frameRef.current = requestAnimationFrame(tick);
    }
    tick();
    return () => cancelAnimationFrame(frameRef.current);
  }, [target]);

  return display;
}

function Slider({
  label,
  unit,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[11px] text-lb-ash tracking-widest uppercase">{label}</span>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={(e) => {
              const v = Math.min(max, Math.max(min, Number(e.target.value)));
              onChange(v);
            }}
            className="w-14 bg-lb-surface border border-lb-border rounded px-2 py-1 font-numbers text-lb-ivory text-sm text-right focus:outline-none focus:border-lb-gold/60 transition-colors"
          />
          <span className="font-sans text-[11px] text-lb-ash">{unit}</span>
        </div>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-px bg-lb-border" />
        <div
          className="absolute h-px bg-lb-gold transition-all duration-75"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="lb-slider absolute w-full appearance-none bg-transparent cursor-pointer"
        />
      </div>
      <div className="flex justify-between">
        <span className="font-sans text-[10px] text-lb-border/70">{min}</span>
        <span className="font-sans text-[10px] text-lb-border/70">{max}</span>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-lb-ash/70 mb-2.5">{children}</p>
  );
}

export function ProductConfigurator({ productId, productTitle, pricePerSqm }: Props) {
  const { t } = useLanguage();
  const { addItem } = useOrder();

  const [width, setWidth] = useState(120);
  const [height, setHeight] = useState(150);
  const [isOpen, setIsOpen] = useState(false);
  const [installation, setInstallation] = useState<InstallationType>("surface");
  const [mounting, setMounting] = useState<MountingType>("frame");
  const [delivery, setDelivery] = useState(true);
  const [added, setAdded] = useState(false);
  const [blindColor, setBlindColor] = useState(BLIND_COLORS[0].hex);

  const sqm = calcSqm(width, height);
  const price = calcPrice(width, height, pricePerSqm);
  const animatedPrice = useAnimatedNumber(price);

  const handleAdd = () => {
    addItem({ productId, productTitle, widthCm: width, heightCm: height, sqm, pricePerSqm, totalPrice: price, delivery });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const installationOptions: { value: InstallationType; label: string; icon: (a: boolean) => React.ReactNode }[] = [
    { value: "recessed", label: t.configurator.installationRecessed, icon: (a) => <RecessedIcon active={a} /> },
    { value: "surface", label: t.configurator.installationSurface, icon: (a) => <SurfaceIcon active={a} /> },
    { value: "fullWall", label: "Full Wall", icon: (a) => <FullWallIcon active={a} /> },
  ];

  return (
    <>
      <style>{`
        .lb-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #C9A96E;
          border: 2px solid #13110C;
          box-shadow: 0 0 0 1px #C9A96E;
          cursor: pointer;
          transition: transform .15s, box-shadow .15s;
        }
        .lb-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 4px rgba(201,169,110,.18);
        }
        .lb-slider::-moz-range-thumb {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #C9A96E;
          border: 2px solid #13110C;
          cursor: pointer;
        }
        .lb-slider:focus { outline: none; }
      `}</style>

      <div className="rounded-sm overflow-hidden border border-lb-border bg-lb-bg">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-lb-border flex items-center justify-between bg-lb-bg">
          <p className="eyebrow">{t.configurator.eyebrow}</p>
          <span className="font-numbers text-[11px] text-lb-ash/70">
            {sqm} м² · {width}×{height}
          </span>
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px]">

          {/* ── CANVAS PANEL ── */}
          <div className="relative bg-[#EDE8E0]">
            <div className="w-full aspect-[4/5] lg:aspect-auto lg:h-full min-h-[340px]">
              <WindowCanvas
                widthCm={width}
                heightCm={height}
                isOpen={isOpen}
                installation={installation}
                mounting={mounting}
                blindColor={blindColor}
              />
            </div>

            {/* Open / Closed toggle */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex rounded-full border border-lb-border/60 bg-lb-bg/75 backdrop-blur-md overflow-hidden text-[10px] font-sans font-semibold tracking-widest uppercase shadow-lg">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`px-5 py-2 transition-colors ${
                    !isOpen ? "bg-lb-gold text-lb-bg" : "text-lb-ash hover:text-lb-ivory"
                  }`}
                >
                  {t.configurator.closedBlind}
                </button>
                <button
                  onClick={() => setIsOpen(true)}
                  className={`px-5 py-2 transition-colors ${
                    isOpen ? "bg-lb-gold text-lb-bg" : "text-lb-ash hover:text-lb-ivory"
                  }`}
                >
                  {t.configurator.openBlind}
                </button>
              </div>
            </div>
          </div>

          {/* ── CONTROLS PANEL ── */}
          <div className="border-t border-lb-border lg:border-t-0 lg:border-l lg:border-lb-border flex flex-col bg-lb-bg">
            <div className="flex-1 overflow-y-auto p-5 space-y-5">

              {/* Dimensions */}
              <div className="space-y-4">
                <SectionLabel>Хэмжээ</SectionLabel>
                <Slider label={t.configurator.width} unit="см" value={width} min={30} max={400} onChange={setWidth} />
                <Slider label={t.configurator.height} unit="см" value={height} min={30} max={400} onChange={setHeight} />
              </div>

              <div className="h-px bg-lb-border/50" />

              {/* Fabric color */}
              <div>
                <SectionLabel>Өнгө</SectionLabel>
                <div className="flex gap-2.5 flex-wrap">
                  {BLIND_COLORS.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setBlindColor(col.hex)}
                      className="group relative w-9 h-9 rounded-full transition-all duration-150 hover:scale-110 focus:outline-none"
                      style={{ backgroundColor: col.hex }}
                    >
                      {blindColor === col.hex && (
                        <span className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-lb-gold ring-offset-lb-bg pointer-events-none" />
                      )}
                      {/* Tooltip */}
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 rounded-sm bg-lb-surface border border-lb-border/80 text-lb-ivory text-[10px] font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20 shadow-lg tracking-wide">
                        {col.name}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-lb-border/80" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-lb-border/50" />

              {/* Installation type */}
              <div>
                <SectionLabel>{t.configurator.installation}</SectionLabel>
                <div className="grid grid-cols-3 gap-1.5">
                  {installationOptions.map(({ value, label, icon }) => (
                    <button
                      key={value}
                      onClick={() => {
                        setInstallation(value);
                        if (value === "recessed") setMounting("frame");
                        if (value === "fullWall") setMounting("ceiling");
                      }}
                      className={`flex flex-col items-center gap-2 pt-3 pb-2 px-1 rounded border transition-all text-center ${
                        installation === value
                          ? "border-lb-gold bg-lb-gold/8 text-lb-gold"
                          : "border-lb-border bg-lb-card text-lb-ash hover:border-lb-gold/40 hover:text-lb-ivory"
                      }`}
                    >
                      {icon(installation === value)}
                      <span className="font-sans text-[9px] font-semibold tracking-wider leading-tight">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mounting (surface only) */}
              {installation === "surface" && (
                <div>
                  <SectionLabel>{t.configurator.mounting}</SectionLabel>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { value: "ceiling" as MountingType, label: t.configurator.mountingCeiling, icon: (a: boolean) => <CeilingIcon active={a} /> },
                      { value: "frame" as MountingType, label: t.configurator.mountingFrame, icon: (a: boolean) => <FrameIcon active={a} /> },
                    ].map(({ value, label, icon }) => (
                      <button
                        key={value}
                        onClick={() => setMounting(value)}
                        className={`flex flex-col items-center gap-2 pt-3 pb-2 rounded border transition-all ${
                          mounting === value
                            ? "border-lb-gold bg-lb-gold/8 text-lb-gold"
                            : "border-lb-border bg-lb-card text-lb-ash hover:border-lb-gold/40 hover:text-lb-ivory"
                        }`}
                      >
                        {icon(mounting === value)}
                        <span className="font-sans text-[9px] font-semibold tracking-wider">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="h-px bg-lb-border/50" />

              {/* Delivery */}
              <div>
                <SectionLabel>Хүргэлт</SectionLabel>
                <div className="flex gap-2">
                  {[
                    { val: true, label: t.configurator.delivery },
                    { val: false, label: t.configurator.pickup },
                  ].map(({ val, label }) => (
                    <button
                      key={label}
                      onClick={() => setDelivery(val)}
                      className={`flex-1 py-2 px-3 rounded border font-sans text-[11px] font-semibold tracking-wider transition-all ${
                        delivery === val
                          ? "border-lb-gold bg-lb-gold/8 text-lb-gold"
                          : "border-lb-border bg-lb-card text-lb-ash hover:border-lb-gold/40 hover:text-lb-ivory"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── PRICE + CTA ── */}
            <div className="border-t border-lb-border p-5 space-y-4 bg-lb-surface/40">
              <div className="flex items-end justify-between">
                <div className="space-y-0.5">
                  <p className="font-sans text-[10px] text-lb-ash/60 tracking-widest uppercase">
                    {t.configurator.sqm}
                  </p>
                  <p className="font-sans text-xs text-lb-ash/80">
                    {sqm} м² · {pricePerSqm.toLocaleString("mn-MN")} ₮/м²
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-[10px] text-lb-ash/60 tracking-widest uppercase mb-0.5">
                    {t.configurator.price}
                  </p>
                  <p className="font-numbers text-2xl text-lb-gold font-light tabular-nums">
                    ₮{animatedPrice.toLocaleString("mn-MN")}
                  </p>
                </div>
              </div>

              {sqm < 1 && (
                <p className="font-sans text-[10px] text-lb-ash/50 italic">
                  {t.configurator.minSqm}
                </p>
              )}

              <button
                onClick={handleAdd}
                className={`w-full py-3.5 font-sans text-sm font-semibold tracking-widest uppercase rounded transition-all min-h-[50px] flex items-center justify-center gap-2 ${
                  added
                    ? "bg-lb-border text-lb-gold border border-lb-gold/40"
                    : "bg-lb-gold text-lb-bg hover:bg-lb-gold-lt active:scale-[0.99]"
                }`}
              >
                {added ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Нэмэгдлээ
                  </>
                ) : (
                  t.configurator.addToOrder
                )}
              </button>

              {added && (
                <a
                  href="/checkout"
                  className="block text-center font-sans text-xs text-lb-gold/70 hover:text-lb-gold tracking-wide transition-colors"
                >
                  Захиалга харах →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
