import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Plus, 
  Minus, 
  Terminal, 
  Layers, 
  Globe, 
  Shield 
} from 'lucide-react';
import { Package, Platform, PackageManager } from '../types';

interface PackageDetailsProps {
  pkg: Package;
  isInStack: boolean;
  onToggleStack: () => void;
  onClose: () => void;
}

export const PackageDetails: React.FC<PackageDetailsProps> = ({
  pkg,
  isInStack,
  onToggleStack,
  onClose
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const getPlatformHeaderClass = (platform: Platform) => {
    switch (platform) {
      case 'windows': return 'text-cyan-400 bg-cyan-950/20 border-cyan-800/40';
      case 'macos': return 'text-amber-400 bg-amber-950/20 border-amber-800/40';
      case 'linux': return 'text-purple-400 bg-purple-950/20 border-purple-800/40';
    }
  };

  const getManagerBadgeClass = (manager: PackageManager) => {
    switch (manager) {
      case 'winget': return 'bg-sky-500/15 text-sky-400 border-sky-500/20';
      case 'choco': return 'bg-yellow-600/15 text-yellow-400 border-yellow-600/20';
      case 'brew': return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'apt': return 'bg-red-500/15 text-red-400 border-red-500/20';
      case 'flatpak': return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20';
      case 'snap': return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="details-modal-overlay">
      <div 
        id="details-modal-content"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-850" id="details-modal-header">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 py-0.5 bg-slate-800 rounded border border-slate-750">
              {pkg.category}
            </span>
            <h2 className="text-xl font-extrabold text-slate-100 mt-1.5 flex items-center gap-2">
              {pkg.name}
              {pkg.isCustom && (
                <span className="text-xs font-bold text-teal-400 bg-teal-950/40 border border-teal-800 px-2 py-0.5 rounded uppercase">
                  Custom
                </span>
              )}
            </h2>
          </div>
          <button
            id="details-close-btn"
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 rounded-lg border border-slate-750 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable details area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* About / Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>About this freeware</span>
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-850">
              {pkg.description}
            </p>
          </div>

          {/* Key specs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950/30 p-3.5 rounded-xl border border-slate-850 flex items-center gap-3">
              <Globe className="w-5 h-5 text-slate-500" />
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Official Domain</span>
                <a 
                  href={pkg.website} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer" 
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 mt-0.5"
                >
                  Visit Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="bg-slate-950/30 p-3.5 rounded-xl border border-slate-850 flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-500" />
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Distribution License</span>
                <span className="text-xs font-medium text-slate-300 mt-0.5 block">
                  {pkg.license}
                </span>
              </div>
            </div>
          </div>

          {/* Commands for package manager */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span>Platform Command Specifications</span>
            </h4>

            <div className="space-y-4">
              {pkg.platforms.map((platform) => {
                const managerCommands = pkg.commands[platform];
                if (!managerCommands || managerCommands.length === 0) return null;

                return (
                  <div key={platform} className={`rounded-xl border p-4 ${getPlatformHeaderClass(platform)}`}>
                    <h5 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between">
                      <span>{platform === 'windows' ? 'Windows OS' : platform === 'macos' ? 'macOS (OS X)' : 'Linux Distribution'}</span>
                    </h5>
                    
                    <div className="space-y-2.5">
                      {managerCommands.map((mcmd, idx) => (
                        <div 
                          key={`${mcmd.manager}-${idx}`} 
                          className="bg-slate-950/85 border border-slate-850 p-2.5 rounded-lg flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border ${getManagerBadgeClass(mcmd.manager)}`}>
                              {mcmd.manager}
                            </span>
                            <span className="text-xs font-mono text-slate-400">
                              ID: {mcmd.packageId}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 overflow-hidden flex-1 justify-end">
                            <code className="text-xs font-mono text-slate-300 truncate hidden md:inline-block max-w-[200px]">
                              {mcmd.installCmd}
                            </code>
                            <button
                              id={`detail-copy-${mcmd.manager}-${idx}`}
                              onClick={() => handleCopy(mcmd.installCmd)}
                              className="p-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded border border-slate-800 transition-colors cursor-pointer shrink-0"
                              title="Copy command"
                            >
                              {copiedText === mcmd.installCmd ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-5 border-t border-slate-850 bg-slate-950/50 flex items-center justify-between gap-3" id="details-modal-footer">
          <span className="text-xs text-slate-400 font-medium">
            {isInStack ? 'This package is in your Bootstrap Stack' : 'Not currently in your Bootstrap Stack'}
          </span>

          <div className="flex items-center gap-2">
            <button
              id="details-close-footer"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg border border-slate-805 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              id="details-toggle-stack-btn"
              onClick={onToggleStack}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                isInStack
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                  : 'bg-indigo-500 text-slate-100 border-indigo-600 hover:bg-indigo-400'
              }`}
            >
              {isInStack ? (
                <>
                  <Minus className="w-4 h-4" />
                  <span>Remove from Stack</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Bootstrap Stack</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
