import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Laptop, 
  ExternalLink, 
  Copy, 
  Check, 
  PlusCircle, 
  MinusCircle, 
  Info,
  ShieldAlert,
  Compass,
  Code,
  Globe,
  Settings,
  Image,
  PlayCircle,
  ShieldCheck,
  Star,
  Download,
  TrendingUp,
  Zap,
  Play,
  FileText
} from 'lucide-react';
import { Package, Platform, PackageManager } from '../types';

interface PackageCardProps {
  pkg: Package;
  activePlatform: Platform | 'all';
  isInStack: boolean;
  onToggleStack: () => void;
  onViewDetails: () => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  activePlatform,
  isInStack,
  onToggleStack,
  onViewDetails
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [installState, setInstallState] = useState<'idle' | 'installing' | 'completed'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [installProgress, setInstallProgress] = useState<number>(0);
  const [isLaunched, setIsLaunched] = useState(false);

  const getCategoryTheme = (category: string, pkgId?: string) => {
    if (pkgId === 'adobe-acrobat-reader') {
      return { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400', icon: <FileText className="w-5.5 h-5.5" /> };
    }
    if (pkgId === 'adobe-creative-cloud') {
      return { bg: 'bg-rose-500/10 border-rose-500/20', text: 'text-rose-400', icon: <Image className="w-5.5 h-5.5" /> };
    }
    switch (category) {
      case 'development': return { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', icon: <Code className="w-5.5 h-5.5" /> };
      case 'internet': return { bg: 'bg-cyan-500/10 border-cyan-500/20', text: 'text-cyan-400', icon: <Globe className="w-5.5 h-5.5" /> };
      case 'productivity': return { bg: 'bg-indigo-500/10 border-indigo-500/20', text: 'text-indigo-400', icon: <Compass className="w-5.5 h-5.5" /> };
      case 'utilities': return { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400', icon: <Settings className="w-5.5 h-5.5" /> };
      case 'design': return { bg: 'bg-pink-500/10 border-pink-500/20', text: 'text-pink-400', icon: <Image className="w-5.5 h-5.5" /> };
      case 'media': return { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400', icon: <PlayCircle className="w-5.5 h-5.5" /> };
      case 'security': return { bg: 'bg-teal-500/10 border-teal-500/20', text: 'text-teal-400', icon: <ShieldCheck className="w-5.5 h-5.5" /> };
      default: return { bg: 'bg-slate-500/10 border-slate-500/20', text: 'text-slate-400', icon: <Laptop className="w-5.5 h-5.5" /> };
    }
  };

  const getPlatformDisplay = (platform: Platform) => {
    switch (platform) {
      case 'windows': return { label: 'WIN', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' };
      case 'macos': return { label: 'MAC', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      case 'linux': return { label: 'LIN', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
    }
  };

  // Determine the default install command to show on the card face
  const getDisplayCommandAndId = () => {
    let plat: Platform = 'windows';
    if (activePlatform !== 'all') {
      plat = activePlatform;
    } else if (pkg.platforms.includes('windows')) {
      plat = 'windows';
    } else if (pkg.platforms.includes('macos')) {
      plat = 'macos';
    } else {
      plat = 'linux';
    }

    const platformCommands = pkg.commands[plat];
    if (platformCommands && platformCommands.length > 0) {
      const preferred = platformCommands[0];
      return {
        platform: plat,
        manager: preferred.manager,
        cmd: preferred.installCmd,
        packageId: preferred.packageId
      };
    }
    return null;
  };

  const commandInfo = getDisplayCommandAndId();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const handleQuickInstall = () => {
    if (!commandInfo) return;
    setInstallState('installing');
    setTerminalLogs([]);
    setInstallProgress(0);
    setIsLaunched(false);

    const platform = commandInfo.platform;
    const pkgName = pkg.name;
    const pkgId = commandInfo.packageId || pkg.id;
    const cmd = commandInfo.cmd;

    let logs: string[] = [];
    if (platform === 'windows') {
      logs = [
        `$ ${cmd}`,
        `Connecting to winget source repository...`,
        `Found ${pkgName} [${pkgId}]`,
        `Downloading payload archive... (45.2 MB)`,
        `[████████████████████] 100%`,
        `Verifying SHA256 integrity checksum... OK`,
        `Running silent install script wrapper...`,
        `Updating Environment PATH system variables...`,
        `Installation finalized! '${pkgName}' is now live.`
      ];
    } else if (platform === 'macos') {
      logs = [
        `$ ${cmd}`,
        `==> Downloading https://formulae.brew.sh/api/cask/${pkgId}.json`,
        `==> Downloading binary source for ${pkgName}`,
        `######################################### 100.0%`,
        `==> Verifying SHA256 checksum integrity`,
        `==> Installing Brew Cask package ${pkgId}`,
        `==> Moving system artifacts to /Applications`,
        `🍺  ${pkgId} successfully loaded on your macOS host!`
      ];
    } else {
      logs = [
        `$ ${cmd}`,
        `Resolving binary dependencies for flatpak / apt '${pkgId}'...`,
        `Preparing local sandboxed mount directories...`,
        `Fetching 24.8 MB source package...`,
        `Selecting package file system layout...`,
        `Configuring desktop triggers...`,
        `Done! '${pkgName}' is successfully registered.`
      ];
    }

    let index = 0;
    const timer = setInterval(() => {
      setTerminalLogs(prev => [...prev, logs[index]]);
      index++;
      setInstallProgress((index / logs.length) * 100);

      if (index >= logs.length) {
        clearInterval(timer);
        setTimeout(() => {
          setInstallState('completed');
        }, 500);
      }
    }, 350);
  };

  const catTheme = getCategoryTheme(pkg.category, pkg.id);

  // Deterministic helper to get mock rating & downloads based on id
  const getMockStats = () => {
    // If already provided, use them
    if (pkg.rating && pkg.downloads) {
      return {
        ratingVal: pkg.rating,
        downloadsVal: pkg.downloads,
        isTrendingVal: !!pkg.isTrending
      };
    }

    // Otherwise, generate deterministically based on id string
    let hash = 0;
    const idStr = pkg.id || pkg.name || '';
    for (let i = 0; i < idStr.length; i++) {
      hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    // Rating: between 4.3 and 4.9
    const ratingVal = 4.3 + (hash % 7) * 0.1;

    // Downloads: deterministic options
    const downloadOptions = [
      '12.4M', '8.9M', '5.2M', '3.8M', '1.9M', '980K', '640K', '450K', '250K', '120K'
    ];
    const downloadsVal = downloadOptions[hash % downloadOptions.length];

    // Trending: top ~20% packages
    const trendingList = [
      'vscode', 'git', 'docker', 'nodejs', 'python', 'brave', 'obsidian', 'notion', 'bitwarden', 'vlc', 'obs-studio', 'neovim', 'adobe-acrobat-reader', 'adobe-creative-cloud'
    ];
    const isTrendingVal = trendingList.includes(pkg.id) || (hash % 5 === 0);

    return { ratingVal, downloadsVal, isTrendingVal };
  };

  const { ratingVal, downloadsVal, isTrendingVal } = getMockStats();

  if (installState === 'installing') {
    return (
      <motion.div
        layout
        id={`pkg-card-installing-${pkg.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col justify-between h-full bg-[#020617] border border-indigo-500/40 rounded-xl p-5 shadow-2xl font-mono text-xs text-slate-300 min-h-[380px]"
      >
        <div className="flex flex-col h-full">
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-slate-500 ml-2 font-bold uppercase tracking-wider font-sans">Simulated Terminal</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></span>
              <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider font-sans">Installing</span>
            </div>
          </div>

          {/* Console Output */}
          <div className="flex-1 overflow-y-auto space-y-1 text-left text-[10px] text-slate-300 leading-relaxed font-mono select-none pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className={idx === 0 ? "text-indigo-400 font-bold" : log.startsWith('==>') || log.startsWith('🍺') ? "text-amber-400" : "text-slate-300"}>
                {log}
              </div>
            ))}
            <div className="w-1.5 h-3.5 bg-indigo-400 inline-block align-middle animate-pulse"></div>
          </div>

          {/* Progress & Bottom Actions */}
          <div className="border-t border-slate-800 pt-3 mt-3 shrink-0">
            <div className="flex justify-between text-[10px] text-slate-500 mb-1.5 font-sans font-bold">
              <span>DOWNLOADING / CONTEXT LOAD</span>
              <span>{Math.round(installProgress)}%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${installProgress}%` }}
              ></div>
            </div>
            <button
              onClick={() => setInstallState('idle')}
              className="w-full py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer font-sans"
            >
              Abort Installation
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (installState === 'completed') {
    return (
      <motion.div
        layout
        id={`pkg-card-completed-${pkg.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col justify-between h-full bg-[#020617] border border-emerald-500/40 rounded-xl p-5 shadow-2xl min-h-[380px]"
      >
        <div className="m-auto flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10 animate-bounce">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <h4 className="text-white font-extrabold text-lg leading-tight mb-1">
            Success! Installed
          </h4>
          <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed mb-6">
            <span className="font-semibold text-slate-200">{pkg.name}</span> is configured and registered on your simulated host workspace.
          </p>
          <div className="flex flex-col gap-2 w-full min-w-[180px]">
            <button
              onClick={() => {
                setIsLaunched(true);
                setTimeout(() => setIsLaunched(false), 2500);
              }}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isLaunched ? 'App is running...' : 'Launch Application'}</span>
            </button>
            <button
              onClick={() => setInstallState('idle')}
              className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-slate-250 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Done / Reinstall
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      id={`pkg-card-${pkg.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="relative flex flex-col justify-between h-full bg-slate-850/30 border border-slate-800 rounded-xl p-5 hover:bg-slate-800/40 hover:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div>
        {/* Category Icon & Platform Badges Row */}
        <div className="flex justify-between items-start mb-4" id={`card-header-${pkg.id}`}>
          <div className={`w-12 h-12 rounded-lg border flex items-center justify-center shadow-inner ${catTheme.bg} ${catTheme.text}`}>
            {catTheme.icon}
          </div>
          
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex gap-1">
              {pkg.platforms.map((plat) => {
                const disp = getPlatformDisplay(plat);
                return (
                  <span
                    key={plat}
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${disp.color}`}
                  >
                    {disp.label}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5">
              {pkg.isCustom && (
                <span className="text-[9px] font-bold text-teal-400 bg-teal-950/40 border border-teal-800/50 px-1 py-0.2 rounded uppercase">
                  Custom
                </span>
              )}
              <span className="text-[10px] text-slate-500 font-semibold uppercase">
                {pkg.license}
              </span>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-4">
          <h4 className="text-white font-bold text-base group-hover:text-indigo-400 transition-colors leading-tight">
            {pkg.name}
          </h4>
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 min-h-[32px] leading-relaxed">
            {pkg.description}
          </p>
        </div>

        {/* Community Rating & Popularity Indicators */}
        <div className="flex items-center gap-3 mb-4 text-xs font-semibold" id={`pkg-stats-${pkg.id}`}>
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span>{ratingVal.toFixed(1)}</span>
          </div>

          {/* Downloads / Popularity */}
          <div className="flex items-center gap-1 text-slate-400 hover:text-slate-300">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{downloadsVal} downloads</span>
          </div>

          {/* Trending Badge */}
          {isTrendingVal && (
            <span className="flex items-center gap-0.5 text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse ml-auto">
              <TrendingUp className="w-3 h-3 text-indigo-400" />
              <span>Trending</span>
            </span>
          )}
        </div>
      </div>

      {/* Terminal Block & Lower Controls */}
      <div className="mt-auto space-y-3">
        {commandInfo ? (
          <div className="space-y-2">
            <div className="bg-slate-950/80 rounded-lg p-2.5 border border-slate-800/60 flex items-center justify-between gap-2 group/cmd">
              <div className="overflow-hidden">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                  {commandInfo.platform} • {commandInfo.manager}
                </span>
                <code className="text-xs font-mono text-slate-300 truncate block whitespace-nowrap pt-0.5">
                  {commandInfo.cmd}
                </code>
              </div>
              <button
                id={`btn-copy-${pkg.id}`}
                onClick={() => handleCopy(commandInfo.cmd)}
                className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded-md border border-slate-800 transition-colors shrink-0 cursor-pointer"
                title="Copy Install Command"
              >
                {copiedText === commandInfo.cmd ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <button
              id={`btn-quick-install-${pkg.id}`}
              onClick={handleQuickInstall}
              className="w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer group/qi"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-200 group-hover:scale-110 transition-transform" />
              <span>Quick Install</span>
            </button>
          </div>
        ) : (
          <div className="bg-slate-950/40 rounded-lg p-3 border border-dashed border-slate-800/60 flex items-center gap-2 text-slate-500 text-xs">
            <ShieldAlert className="w-4 h-4 text-amber-500/60" />
            <span>Not compiled for {activePlatform}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
          <button
            id={`btn-details-${pkg.id}`}
            onClick={onViewDetails}
            className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-250 transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Specs</span>
          </button>

          <button
            id={`btn-toggle-stack-${pkg.id}`}
            onClick={onToggleStack}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
              isInStack
                ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/20'
                : 'bg-slate-700 hover:bg-indigo-600 text-white border border-slate-600/30'
            }`}
          >
            {isInStack ? 'Remove Stack' : 'Get / Add'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
