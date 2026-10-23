import React, { useRef, useState } from 'react';
import {
  Laptop,
  Code,
  Globe,
  Compass,
  Settings,
  Image as ImageIcon,
  PlayCircle,
  ShieldCheck,
  FileText,
  Terminal,
  Database,
  Cpu,
  Zap,
  Sparkles,
  Rocket,
  Layers,
  Box,
  Lock,
  Cloud,
  Wrench,
  Upload,
  RotateCcw,
  Check,
  X,
  Palette
} from 'lucide-react';
import { Category } from '../types';

export interface PresetIconOption {
  id: string;
  label: string;
  render: (className?: string) => React.ReactNode;
}

export const PRESET_SOFTWARE_ICONS: PresetIconOption[] = [
  { id: 'preset:code', label: 'Code / Dev', render: (c = 'w-5 h-5') => <Code className={c} /> },
  { id: 'preset:terminal', label: 'Terminal', render: (c = 'w-5 h-5') => <Terminal className={c} /> },
  { id: 'preset:globe', label: 'Browser / Web', render: (c = 'w-5 h-5') => <Globe className={c} /> },
  { id: 'preset:compass', label: 'Productivity', render: (c = 'w-5 h-5') => <Compass className={c} /> },
  { id: 'preset:settings', label: 'System Gear', render: (c = 'w-5 h-5') => <Settings className={c} /> },
  { id: 'preset:image', label: 'Design / Creative', render: (c = 'w-5 h-5') => <ImageIcon className={c} /> },
  { id: 'preset:media', label: 'Media / Video', render: (c = 'w-5 h-5') => <PlayCircle className={c} /> },
  { id: 'preset:shield', label: 'Security', render: (c = 'w-5 h-5') => <ShieldCheck className={c} /> },
  { id: 'preset:document', label: 'Document / PDF', render: (c = 'w-5 h-5') => <FileText className={c} /> },
  { id: 'preset:database', label: 'Database', render: (c = 'w-5 h-5') => <Database className={c} /> },
  { id: 'preset:cpu', label: 'Hardware / CPU', render: (c = 'w-5 h-5') => <Cpu className={c} /> },
  { id: 'preset:rocket', label: 'Launcher', render: (c = 'w-5 h-5') => <Rocket className={c} /> },
  { id: 'preset:zap', label: 'Fast Utility', render: (c = 'w-5 h-5') => <Zap className={c} /> },
  { id: 'preset:box', label: 'Package Box', render: (c = 'w-5 h-5') => <Box className={c} /> },
  { id: 'preset:cloud', label: 'Cloud App', render: (c = 'w-5 h-5') => <Cloud className={c} /> },
  { id: 'preset:wrench', label: 'Toolkit', render: (c = 'w-5 h-5') => <Wrench className={c} /> },
  { id: 'preset:lock', label: 'Vault / Auth', render: (c = 'w-5 h-5') => <Lock className={c} /> },
  { id: 'preset:laptop', label: 'Desktop App', render: (c = 'w-5 h-5') => <Laptop className={c} /> }
];

export const getCategoryThemeAndDefaultIcon = (
  category: Category | string,
  pkgId?: string,
  iconClass = 'w-5.5 h-5.5'
) => {
  if (pkgId === 'adobe-acrobat-reader') {
    return {
      bg: 'bg-red-500/10 border-red-500/20',
      text: 'text-red-400',
      icon: <FileText className={iconClass} />
    };
  }
  if (pkgId === 'adobe-creative-cloud') {
    return {
      bg: 'bg-rose-500/10 border-rose-500/20',
      text: 'text-rose-400',
      icon: <ImageIcon className={iconClass} />
    };
  }
  switch (category) {
    case 'development':
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        text: 'text-emerald-400',
        icon: <Code className={iconClass} />
      };
    case 'internet':
      return {
        bg: 'bg-cyan-500/10 border-cyan-500/20',
        text: 'text-cyan-400',
        icon: <Globe className={iconClass} />
      };
    case 'productivity':
      return {
        bg: 'bg-indigo-500/10 border-indigo-500/20',
        text: 'text-indigo-400',
        icon: <Compass className={iconClass} />
      };
    case 'utilities':
      return {
        bg: 'bg-amber-500/10 border-amber-500/20',
        text: 'text-amber-400',
        icon: <Settings className={iconClass} />
      };
    case 'design':
      return {
        bg: 'bg-pink-500/10 border-pink-500/20',
        text: 'text-pink-400',
        icon: <ImageIcon className={iconClass} />
      };
    case 'media':
      return {
        bg: 'bg-red-500/10 border-red-500/20',
        text: 'text-red-400',
        icon: <PlayCircle className={iconClass} />
      };
    case 'security':
      return {
        bg: 'bg-teal-500/10 border-teal-500/20',
        text: 'text-teal-400',
        icon: <ShieldCheck className={iconClass} />
      };
    default:
      return {
        bg: 'bg-slate-500/10 border-slate-500/20',
        text: 'text-slate-400',
        icon: <Laptop className={iconClass} />
      };
  }
};

export const renderSoftwareIconContent = (
  customIcon: string | undefined,
  defaultIconNode: React.ReactNode,
  sizeClass = 'w-5.5 h-5.5',
  imgClass = 'w-7 h-7 object-contain rounded'
): React.ReactNode => {
  if (!customIcon) return defaultIconNode;

  if (customIcon.startsWith('preset:')) {
    const found = PRESET_SOFTWARE_ICONS.find((p) => p.id === customIcon);
    if (found) return found.render(sizeClass);
  }

  if (
    customIcon.startsWith('http://') ||
    customIcon.startsWith('https://') ||
    customIcon.startsWith('data:image/')
  ) {
    return (
      <img
        src={customIcon}
        alt="Software logo"
        className={imgClass}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Fallback for emoji or short 1-3 character monogram
  return (
    <span className="text-base font-extrabold leading-none select-none">
      {customIcon.slice(0, 3)}
    </span>
  );
};

interface SoftwareIconPickerPopoverProps {
  currentIcon?: string;
  onSelectIcon: (newIcon: string) => void;
  onResetIcon?: () => void;
  hasCustomIcon?: boolean;
  onClose: () => void;
  title?: string;
}

export const SoftwareIconPickerPopover: React.FC<SoftwareIconPickerPopoverProps> = ({
  currentIcon,
  onSelectIcon,
  onResetIcon,
  hasCustomIcon,
  onClose,
  title = 'Change Software Logo Icon'
}) => {
  const [urlInput, setUrlInput] = useState(
    currentIcon && (currentIcon.startsWith('http') || !currentIcon.startsWith('preset:')) && !currentIcon.startsWith('data:')
      ? currentIcon
      : ''
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onSelectIcon(reader.result);
        onClose();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3.5 w-72 z-40 space-y-3 text-left"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-[11px] font-extrabold text-white flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-indigo-400" />
          <span>{title}</span>
        </span>
        <div className="flex items-center gap-1">
          {hasCustomIcon && onResetIcon && (
            <button
              type="button"
              onClick={() => {
                onResetIcon();
                onClose();
              }}
              className="text-[10px] font-semibold text-amber-400 hover:text-amber-300 px-1.5 py-0.5 rounded bg-amber-950/40 border border-amber-800/40 flex items-center gap-1 cursor-pointer"
              title="Reset to default icon"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Vector Icons Grid */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
          Preset Vector Icons
        </span>
        <div className="grid grid-cols-6 gap-1.5">
          {PRESET_SOFTWARE_ICONS.map((item) => {
            const isSelected = currentIcon === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectIcon(item.id);
                  onClose();
                }}
                title={item.label}
                className={`p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/25 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {item.render('w-4 h-4')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Custom Image File */}
      <div className="pt-1 border-t border-slate-800/80 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          Upload Image or Paste Logo URL
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-1.5 px-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-[11px] font-semibold text-indigo-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Custom Logo Image (PNG/SVG)</span>
        </button>

        {/* Image URL or Emoji Input */}
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && urlInput.trim()) {
                onSelectIcon(urlInput.trim());
                onClose();
              }
            }}
            placeholder="Image URL or Emoji (e.g. 🚀)"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={() => {
              if (urlInput.trim()) {
                onSelectIcon(urlInput.trim());
                onClose();
              }
            }}
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg cursor-pointer shrink-0 flex items-center gap-1"
          >
            <Check className="w-3 h-3" />
            <span>Set</span>
          </button>
        </div>
      </div>
    </div>
  );
};
