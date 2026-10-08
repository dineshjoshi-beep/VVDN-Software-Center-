import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { TrendingUp, Flame, Plus, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { Package, Category, Platform } from '../types';

interface PopularityTrendChartProps {
  packages: Package[];
  selectedCategory: Category | 'all';
  activePlatform: Platform | 'all';
  bootstrapStack: Package[];
  onSelectPackage: (pkg: Package) => void;
  onToggleStack: (pkg: Package) => void;
}

interface TrendDataPoint {
  day: string;
  dateLabel: string;
  totalInstalls: number;
  [pkgId: string]: string | number;
}

const CHART_COLORS = [
  '#6366f1', // Indigo
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899'  // Pink
];

// Deterministic hash helper so each package has a consistent 30-day curve
function getHash(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function parseDownloadsToBaseDaily(downloadsStr?: string, id = ''): number {
  if (!downloadsStr) {
    return 1200 + (getHash(id) % 3500);
  }
  const clean = downloadsStr.toUpperCase().replace(/[^0-9.MK]/g, '');
  const num = parseFloat(clean) || 10;
  if (clean.includes('M')) {
    return Math.round(Math.min(45000, Math.max(2500, num * 420)));
  }
  if (clean.includes('K')) {
    return Math.round(Math.max(800, num * 12));
  }
  return 2000;
}

export const PopularityTrendChart: React.FC<PopularityTrendChartProps> = ({
  packages,
  selectedCategory,
  activePlatform,
  bootstrapStack,
  onSelectPackage,
  onToggleStack
}) => {
  const [focusedPkgId, setFocusedPkgId] = useState<string | 'all'>('all');

  // Identify top 5 trending packages from the current filtered list (or fallback to all packages)
  const topTrendingPackages = useMemo(() => {
    const pool = packages.length > 0 ? packages : [];
    return [...pool]
      .sort((a, b) => {
        const aTrend = a.isTrending ? 1 : 0;
        const bTrend = b.isTrending ? 1 : 0;
        if (bTrend !== aTrend) return bTrend - aTrend;
        const aRating = a.rating || 4.5;
        const bRating = b.rating || 4.5;
        return bRating - aRating;
      })
      .slice(0, 5);
  }, [packages]);

  // Reset focused package if it's no longer in the top trending list
  const activeFocusedId = useMemo(() => {
    if (focusedPkgId === 'all') return 'all';
    return topTrendingPackages.some((p) => p.id === focusedPkgId) ? focusedPkgId : 'all';
  }, [focusedPkgId, topTrendingPackages]);

  // Generate 30 days of installation popularity data
  const { chartData, pkgGrowthMap, total30DayInstalls, avgGrowthPct } = useMemo(() => {
    const daysCount = 30;
    const now = new Date();
    const data: TrendDataPoint[] = [];
    const growthMap: Record<string, { growthPct: number; thirtyDayTotal: number; color: string }> = {};

    const pkgSeriesMeta = topTrendingPackages.map((pkg, index) => {
      const seed = getHash(pkg.id + (selectedCategory || 'all'));
      const baseDaily = parseDownloadsToBaseDaily(pkg.downloads, pkg.id);
      const growthFactor = 0.14 + ((seed % 28) / 100); // +14% to +42% over 30 days
      const waveFreq = 0.22 + ((seed % 15) * 0.015);
      const wavePhase = (seed % 10) * 0.6;
      const spikeDay = 18 + (seed % 10);
      const color = CHART_COLORS[index % CHART_COLORS.length];

      return {
        pkg,
        seed,
        baseDaily,
        growthFactor,
        waveFreq,
        wavePhase,
        spikeDay,
        color
      };
    });

    const firstDayValues: Record<string, number> = {};
    const lastDayValues: Record<string, number> = {};
    const totalsByPkg: Record<string, number> = {};

    for (let i = daysCount - 1; i >= 0; i--) {
      const dayIndex = daysCount - 1 - i; // 0 to 29
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const monthShort = d.toLocaleString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      const dateLabel = `${monthShort} ${dayNum}`;

      const point: TrendDataPoint = {
        day: `D-${i}`,
        dateLabel,
        totalInstalls: 0
      };

      let daySum = 0;

      pkgSeriesMeta.forEach(({ pkg, baseDaily, growthFactor, waveFreq, wavePhase, spikeDay }) => {
        const progress = dayIndex / (daysCount - 1);
        const trendMultiplier = 1 + progress * growthFactor;
        const seasonalWave = Math.sin(dayIndex * waveFreq + wavePhase) * 0.08;
        const releaseSpike = Math.abs(dayIndex - spikeDay) <= 2 ? 0.14 * (1 - Math.abs(dayIndex - spikeDay) * 0.35) : 0;

        const val = Math.round(baseDaily * (trendMultiplier + seasonalWave + releaseSpike));
        point[pkg.id] = val;
        daySum += val;

        if (dayIndex === 0) firstDayValues[pkg.id] = val;
        if (dayIndex === daysCount - 1) lastDayValues[pkg.id] = val;
        totalsByPkg[pkg.id] = (totalsByPkg[pkg.id] || 0) + val;
      });

      point.totalInstalls = daySum;
      data.push(point);
    }

    let grandTotal = 0;
    let growthSum = 0;

    pkgSeriesMeta.forEach(({ pkg, color }) => {
      const start = firstDayValues[pkg.id] || 1;
      const end = lastDayValues[pkg.id] || start;
      const pct = Math.max(4.2, +(((end - start) / start) * 100).toFixed(1));
      const total = totalsByPkg[pkg.id] || 0;
      growthMap[pkg.id] = {
        growthPct: pct,
        thirtyDayTotal: total,
        color
      };
      grandTotal += total;
      growthSum += pct;
    });

    const avgGrowth = pkgSeriesMeta.length > 0 ? +(growthSum / pkgSeriesMeta.length).toFixed(1) : 18.4;

    return {
      chartData: data,
      pkgGrowthMap: growthMap,
      total30DayInstalls: grandTotal,
      avgGrowthPct: avgGrowth
    };
  }, [topTrendingPackages, selectedCategory]);

  const focusedPackage = useMemo(
    () => topTrendingPackages.find((p) => p.id === activeFocusedId) || null,
    [topTrendingPackages, activeFocusedId]
  );

  const activeColor = focusedPackage
    ? pkgGrowthMap[focusedPackage.id]?.color || '#6366f1'
    : '#6366f1';

  const formatCompact = (val: number) => {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
    return `${val}`;
  };

  if (topTrendingPackages.length === 0) {
    return null;
  }

  return (
    <div
      className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden"
      id="installation-popularity-trend-card"
    >
      {/* Top Header & Quick Mode Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4.5 h-4.5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Installation Popularity Trend (Last 30 Days)
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ArrowUpRight className="w-3 h-3" />
                +{focusedPackage ? pkgGrowthMap[focusedPackage.id]?.growthPct : avgGrowthPct}% 30d velocity
              </span>
              {selectedCategory !== 'all' && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {selectedCategory}
                </span>
              )}
              {activePlatform !== 'all' && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                  {activePlatform}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {focusedPackage
                ? `Showing 30-day daily installation trajectory for ${focusedPackage.name} (${formatCompact(pkgGrowthMap[focusedPackage.id]?.thirtyDayTotal || 0)} installs)`
                : `Aggregated 30-day installation telemetry across top trending tools (${formatCompact(total30DayInstalls)} total installs)`}
            </p>
          </div>
        </div>

        {/* Filter pills to inspect individual trending tools on the chart */}
        <div className="flex items-center gap-1.5 flex-wrap" id="trend-chart-package-selector">
          <button
            onClick={() => setFocusedPkgId('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
              activeFocusedId === 'all'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            All Top Trending
          </button>
          {topTrendingPackages.map((pkg) => {
            const meta = pkgGrowthMap[pkg.id];
            const isSelected = activeFocusedId === pkg.id;
            return (
              <button
                key={pkg.id}
                onClick={() => setFocusedPkgId(isSelected ? 'all' : pkg.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-800 text-white border-indigo-500/60 shadow-sm'
                    : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
                title={`View 30-day trend for ${pkg.name}`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: meta?.color || '#6366f1' }}
                />
                <span className="truncate max-w-[7.5rem]">{pkg.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Compact Recharts AreaChart + Trending Tools Quick Action Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Recharts Area Chart (8 cols on desktop) */}
        <div className="lg:col-span-8 h-44 sm:h-48 w-full bg-slate-950/50 rounded-xl border border-slate-800/70 p-2.5 pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="popularityPrimaryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={activeColor} stopOpacity={0.0} />
                </linearGradient>
                {topTrendingPackages.map((pkg) => {
                  const color = pkgGrowthMap[pkg.id]?.color || '#6366f1';
                  return (
                    <linearGradient key={pkg.id} id={`grad-${pkg.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.28} />
                      <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                    </linearGradient>
                  );
                })}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="dateLabel"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => formatCompact(Number(v))}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  return (
                    <div className="bg-[#020617]/95 border border-slate-700/80 rounded-xl p-2.5 shadow-2xl backdrop-blur-md text-xs min-w-[11rem]">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                        <span className="font-bold text-slate-200">{label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">30d Telemetry</span>
                      </div>
                      <div className="space-y-1">
                        {payload.map((entry) => {
                          const pkgMatch = topTrendingPackages.find((p) => p.id === entry.dataKey);
                          const displayName =
                            entry.dataKey === 'totalInstalls'
                              ? 'Total Trending Installs'
                              : pkgMatch?.name || String(entry.name);
                          return (
                            <div key={String(entry.dataKey)} className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span
                                  className="w-2 h-2 rounded-full shrink-0"
                                  style={{ backgroundColor: entry.color || '#6366f1' }}
                                />
                                <span className="text-[11px] text-slate-300 truncate">{displayName}</span>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-white">
                                {formatCompact(Number(entry.value))}/day
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }}
              />
              {activeFocusedId === 'all' ? (
                <Area
                  type="monotone"
                  dataKey="totalInstalls"
                  name="Total Installs"
                  stroke="#6366f1"
                  strokeWidth={2.2}
                  fillOpacity={1}
                  fill="url(#popularityPrimaryGrad)"
                  activeDot={{ r: 4, strokeWidth: 0, fill: '#818cf8' }}
                />
              ) : (
                <Area
                  type="monotone"
                  dataKey={activeFocusedId}
                  name={focusedPackage?.name || activeFocusedId}
                  stroke={activeColor}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#popularityPrimaryGrad)"
                  activeDot={{ r: 4, strokeWidth: 0, fill: activeColor }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Right Column: Top Trending Movers List (4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-slate-950/50 rounded-xl border border-slate-800/70 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>30-Day Top Movers</span>
            </span>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Click to inspect
            </span>
          </div>

          <div className="space-y-1.5">
            {topTrendingPackages.slice(0, 4).map((pkg) => {
              const meta = pkgGrowthMap[pkg.id];
              const isInStack = bootstrapStack.some((item) => item.id === pkg.id);
              const isFocused = activeFocusedId === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onClick={() => setFocusedPkgId(isFocused ? 'all' : pkg.id)}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                    isFocused
                      ? 'bg-indigo-950/40 border-indigo-500/50'
                      : 'bg-slate-900/60 border-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2 h-6 rounded-full shrink-0"
                      style={{ backgroundColor: meta?.color || '#6366f1' }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPackage(pkg);
                          }}
                          className="text-xs font-bold text-slate-200 hover:text-indigo-300 truncate text-left cursor-pointer"
                          title={`Open ${pkg.name} details`}
                        >
                          {pkg.name}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="text-emerald-400 font-semibold">+{meta?.growthPct}%</span>
                        <span>•</span>
                        <span className="font-mono">{formatCompact(meta?.thirtyDayTotal || 0)}/30d</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStack(pkg);
                    }}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer border ${
                      isInStack
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border-slate-700 hover:border-indigo-500'
                    }`}
                    title={isInStack ? 'Remove from Bootstrap Stack' : 'Add to Bootstrap Stack'}
                  >
                    {isInStack ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>In Stack</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Stack</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
