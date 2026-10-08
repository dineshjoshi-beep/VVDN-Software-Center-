import React, { useState } from 'react';
import { X, Plus, Terminal, AlertCircle } from 'lucide-react';
import { Category, Platform, Package, ManagerCommand } from '../types';

interface AddPackageDialogProps {
  onAdd: (newPkg: Package) => void;
  onClose: () => void;
}

export const AddPackageDialog: React.FC<AddPackageDialogProps> = ({
  onAdd,
  onClose
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [license, setLicense] = useState('MIT');
  const [category, setCategory] = useState<Category>('development');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['windows']);

  // Package IDs
  const [wingetId, setWingetId] = useState('');
  const [brewId, setBrewId] = useState('');
  const [aptId, setAptId] = useState('');

  const [error, setError] = useState<string | null>(null);

  const togglePlatform = (plat: Platform) => {
    if (selectedPlatforms.includes(plat)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(p => p !== plat));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, plat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!name.trim()) {
      setError('Please provide a name for the custom tool.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a short description.');
      return;
    }
    if (!website.trim() || !website.startsWith('http')) {
      setError('Please provide a valid website starting with http:// or https://');
      return;
    }

    // Build the package commands object
    const commands: Package['commands'] = {};

    if (selectedPlatforms.includes('windows')) {
      if (!wingetId.trim()) {
        setError('Please specify a Winget Package ID or name for Windows.');
        return;
      }
      commands.windows = [
        {
          manager: 'winget',
          packageId: wingetId.trim(),
          installCmd: `winget install --id ${wingetId.trim()} -e`
        }
      ];
    }

    if (selectedPlatforms.includes('macos')) {
      if (!brewId.trim()) {
        setError('Please specify a Homebrew (brew) formula or cask name for macOS.');
        return;
      }
      commands.macos = [
        {
          manager: 'brew',
          packageId: brewId.trim(),
          installCmd: brewId.trim().includes('cask') 
            ? `brew install --cask ${brewId.trim().replace('cask', '').trim()}`
            : `brew install ${brewId.trim()}`
        }
      ];
    }

    if (selectedPlatforms.includes('linux')) {
      if (!aptId.trim()) {
        setError('Please specify an APT or Flatpak package name for Linux.');
        return;
      }
      commands.linux = [
        {
          manager: 'apt',
          packageId: aptId.trim(),
          installCmd: `sudo apt update && sudo apt install -y ${aptId.trim()}`
        }
      ];
    }

    // Create unique ID from name
    const packageId = `custom-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(Math.random() * 1000)}`;

    const newPkg: Package = {
      id: packageId,
      name: name.trim(),
      description: description.trim(),
      category,
      website: website.trim(),
      license: license.trim(),
      platforms: selectedPlatforms,
      commands,
      isCustom: true
    };

    onAdd(newPkg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="add-modal-overlay">
      <div 
        id="add-modal-content"
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-850" id="add-modal-header">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              <span>Add Custom Utility Package</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Input custom or proprietary package identifiers to manage them.
            </p>
          </div>
          <button
            id="add-close-btn"
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 rounded-lg border border-slate-750 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-400" id="submit-error">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Name & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Utility Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. My Favorite Editor"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as Category)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none transition-colors"
              >
                <option value="development">Development</option>
                <option value="internet">Internet & Web</option>
                <option value="productivity">Productivity</option>
                <option value="utilities">System Utilities</option>
                <option value="design">Design & Graphics</option>
                <option value="media">Media & Player</option>
                <option value="security">Security & Privacy</option>
              </select>
            </div>
          </div>

          {/* Website & License */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">URL Website *</label>
              <input
                type="text"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">License type</label>
              <input
                type="text"
                value={license}
                onChange={e => setLicense(e.target.value)}
                placeholder="MIT / GPL-3.0 / Freeware"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Short description *</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What does this software do? Max 150 characters."
              maxLength={150}
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors resize-none"
              required
            />
          </div>

          {/* Platforms Selector Checkboxes */}
          <div className="space-y-1.5 pt-1.5 border-t border-slate-850">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Compatible Operating Systems *</label>
            <div className="flex gap-4">
              {(['windows', 'macos', 'linux'] as Platform[]).map((plat) => (
                <button
                  type="button"
                  key={plat}
                  onClick={() => togglePlatform(plat)}
                  className={`flex-1 py-2 text-xs font-semibold capitalize rounded-lg border transition-all duration-150 cursor-pointer ${
                    selectedPlatforms.includes(plat)
                      ? plat === 'windows'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/35'
                        : plat === 'macos'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/35'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/35'
                      : 'bg-slate-950 text-slate-500 border-slate-850 hover:border-slate-800 hover:text-slate-300'
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Specific CLI ID configuration fields */}
          <div className="space-y-3.5 pt-3 border-t border-slate-850">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Package Manager Identifiers</span>
            </h4>

            {selectedPlatforms.includes('windows') && (
              <div className="space-y-1 p-3 bg-cyan-950/5 rounded-xl border border-cyan-800/20">
                <label className="text-xs font-bold text-cyan-400 flex items-center justify-between">
                  <span>Windows Winget ID</span>
                  <span className="text-[9px] text-slate-500 font-mono normal-case">e.g. Publisher.AppID</span>
                </label>
                <input
                  type="text"
                  value={wingetId}
                  onChange={e => setWingetId(e.target.value)}
                  placeholder="e.g. Mozilla.Firefox"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg px-3 py-1.5 text-xs text-slate-300 placeholder-slate-650 outline-none transition-colors"
                />
              </div>
            )}

            {selectedPlatforms.includes('macos') && (
              <div className="space-y-1 p-3 bg-amber-950/5 rounded-xl border border-amber-800/20">
                <label className="text-xs font-bold text-amber-400 flex items-center justify-between">
                  <span>macOS Homebrew Formula/Cask Name</span>
                  <span className="text-[9px] text-slate-500 font-mono normal-case">e.g. visual-studio-code</span>
                </label>
                <input
                  type="text"
                  value={brewId}
                  onChange={e => setBrewId(e.target.value)}
                  placeholder="e.g. git  OR  cask-name"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-3 py-1.5 text-xs text-slate-300 placeholder-slate-650 outline-none transition-colors"
                />
              </div>
            )}

            {selectedPlatforms.includes('linux') && (
              <div className="space-y-1 p-3 bg-purple-950/5 rounded-xl border border-purple-800/20">
                <label className="text-xs font-bold text-purple-400 flex items-center justify-between">
                  <span>Linux APT Package Identifier</span>
                  <span className="text-[9px] text-slate-500 font-mono normal-case">e.g. nodejs, htop</span>
                </label>
                <input
                  type="text"
                  value={aptId}
                  onChange={e => setAptId(e.target.value)}
                  placeholder="e.g. git"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg px-3 py-1.5 text-xs text-slate-300 placeholder-slate-650 outline-none transition-colors"
                />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-3 border-t border-slate-850" id="dialog-actions-row">
            <button
              type="button"
              id="btn-cancel-custom-pkg"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-750 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="btn-submit-custom-pkg"
              className="flex-1 py-2 text-xs font-semibold text-slate-100 bg-indigo-600 hover:bg-indigo-500 rounded-lg border border-indigo-700 hover:border-indigo-600 transition-colors cursor-pointer"
            >
              Register Utility
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
