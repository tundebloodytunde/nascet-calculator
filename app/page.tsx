"use client";

import { useState } from "react";

function calculateNascet(stenosisMm: number, distalMm: number): number | null {
  if (!stenosisMm || !distalMm || distalMm <= 0) return null;
  const ratio = stenosisMm / distalMm;
  const stenosisPercent = (1 - ratio) * 100;
  return Math.max(0, Math.min(100, stenosisPercent));
}

function classifySeverity(stenosisPercent: number | null): string {
  if (stenosisPercent === null || Number.isNaN(stenosisPercent)) return "";
  if (stenosisPercent < 50) return "Mild (<50%)";
  if (stenosisPercent < 70) return "Moderate (50–69%)";
  return "Severe (≥70%)";
}

function strokeRiskMessage(stenosisPercent: number | null, symptomatic: boolean): string {
  if (stenosisPercent === null || Number.isNaN(stenosisPercent)) return "";

  if (!symptomatic) {
    if (stenosisPercent < 50) return "Low stroke risk; typically managed with best medical therapy.";
    if (stenosisPercent < 70) return "Intermediate risk; individualized decision-making recommended.";
    return "Higher risk; revascularization may be considered in select patients.";
  }

  if (stenosisPercent < 50) return "Low–moderate risk; symptoms may relate to other etiologies.";
  if (stenosisPercent < 70) return "Moderate stroke risk; revascularization often considered.";
  return "High stroke risk; revascularization strongly considered in appropriate candidates.";
}

export default function HomePage() {
  const [stenosis, setStenosis] = useState("");
  const [distal, setDistal] = useState("");
  const [symptomatic, setSymptomatic] = useState(false);

  const stenosisNum = parseFloat(stenosis);
  const distalNum = parseFloat(distal);

  const nascet = calculateNascet(stenosisNum, distalNum);
  const severity = classifySeverity(nascet ?? null);
  const riskText = strokeRiskMessage(nascet ?? null, symptomatic);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-sky-500 via-purple-500 to-fuchsia-500">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 max-w-xl w-full text-white space-y-6">
        
        <h1 className="text-3xl font-bold drop-shadow-md">
          NASCET Carotid Stenosis Calculator
        </h1>

        <p className="text-sm opacity-90">
          Educational tool for NASCET stenosis and symptom-adjusted stroke risk.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Narrowest ICA lumen (A, mm)</label>
            <input
              type="number"
              step="0.1"
              value={stenosis}
              onChange={(e) => setStenosis(e.target.value)}
              className="mt-1 w-full rounded-xl px-3 py-2 bg-white/30 text-white placeholder-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., 1.2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Distal ICA lumen (B, mm)</label>
            <input
              type="number"
              step="0.1"
              value={distal}
              onChange={(e) => setDistal(e.target.value)}
              className="mt-1 w-full rounded-xl px-3 py-2 bg-white/30 text-white placeholder-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., 4.0"
            />
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium mb-1">Symptomatic Status</label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="symptomatic"
                  checked={!symptomatic}
                  onChange={() => setSymptomatic(false)}
                />
                <span className="text-sm">Asymptomatic</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="symptomatic"
                  checked={symptomatic}
                  onChange={() => setSymptomatic(true)}
                />
                <span className="text-sm">Symptomatic</span>
              </label>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 pt-4 space-y-2">
          <h2 className="text-xl font-semibold drop-shadow-md">Results</h2>

          {nascet !== null && !Number.isNaN(nascet) && distalNum > 0 ? (
            <div className="space-y-1">
              <p><span className="font-semibold">NASCET stenosis:</span> {nascet.toFixed(1)}%</p>
              <p><span className="font-semibold">Severity:</span> {severity}</p>
              <p><span className="font-semibold">Stroke risk:</span> {riskText}</p>
            </div>
          ) : (
            <p className="opacity-80">Enter valid diameters to calculate stenosis.</p>
          )}
        </div>

        <p className="text-xs opacity-70 pt-2 leading-snug">
          NASCET formula: (1 − A / B) × 100.  
          Educational use only; not for clinical decision-making.
        </p>
      </div>
    </main>
  );
}
