import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, 
  Terminal, 
  Activity, 
  Search, 
  Plus, 
  SlidersHorizontal, 
  Trash2, 
  Info, 
  Check, 
  Database,
  Grid,
  Shield,
  HelpCircle,
  ExternalLink,
  Github,
  TrendingUp,
  Flame,
  Star
} from 'lucide-react';

import { Package, Platform, Category, ToastNotification } from './types';
import { CURATED_PACKAGES } from './data/packages';
import { PackageCard } from './components/PackageCard';
import { PackageDetails } from './components/PackageDetails';
import { AddPackageDialog } from './components/AddPackageDialog';
import { ScriptBuilder } from './components/ScriptBuilder';
import { SystemDoctor } from './components/SystemDoctor';
import { ToastContainer } from './components/ToastContainer';
import { PopularityTrendChart } from './components/PopularityTrendChart';

export default function App() {
  // Toast notifications state
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Tabs and Nav
  const [activeTab, setActiveTab] = useState<'discover' | 'builder' | 'doctor'>('discover');

  // Search & Filters
  const [activePlatform, setActivePlatform] = useState<Platform | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [licenseFilter, setLicenseFilter] = useState<'all' | 'freeware' | 'opensource'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Packages state (Curated + Custom loaded from localStorage)
  const [customPackages, setCustomPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem('custom_packages');
    return saved ? JSON.parse(saved) : [];
  });

  // Selected packages to install (Bootstrap Stack)
  const [bootstrapStack, setBootstrapStack] = useState<Package[]>(() => {
    const saved = localStorage.getItem('bootstrap_stack_packages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Modal / Dialogue views
  const [selectedPackageForDetails, setSelectedPackageForDetails] = useState<Package | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('custom_packages', JSON.stringify(customPackages));
  }, [customPackages]);

  useEffect(() => {
    localStorage.setItem('bootstrap_stack_packages', JSON.stringify(bootstrapStack));
  }, [bootstrapStack]);

  const allPackages = [...CURATED_PACKAGES, ...customPackages];

  // Helper to get deterministic rating for sorting & listing in search dropdown
  const getEnrichedRating = (pkg: Package): number => {
    if (pkg.rating) return pkg.rating;
    let hash = 0;
    const idStr = pkg.id || pkg.name || '';
    for (let i = 0; i < idStr.length; i++) {
      hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return 4.3 + (hash % 7) * 0.1;
  };

  // Top-rated or designated trending packages for the dropdown list
  const trendingApps = [...allPackages]
    .map(pkg => ({ ...pkg, calculatedRating: getEnrichedRating(pkg) }))
    .sort((a, b) => b.calculatedRating - a.calculatedRating)
    .slice(0, 5);

  const popularCategories: Category[] = ['development', 'utilities', 'productivity', 'security', 'internet'];

  // Filters logic
  const filteredPackages = allPackages.filter((pkg) => {
    const matchesPlatform = activePlatform === 'all' || pkg.platforms.includes(activePlatform);
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    
    const licLower = pkg.license.toLowerCase();
    const matchesLicense =
      licenseFilter === 'all' ||
      (licenseFilter === 'freeware' && (licLower.includes('freeware') || licLower.includes('freemium') || licLower.includes('personal use'))) ||
      (licenseFilter === 'opensource' && (licLower.includes('mit') || licLower.includes('gpl') || licLower.includes('apache') || licLower.includes('mpl') || licLower.includes('bsd') || licLower.includes('psf')));

    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return matchesPlatform && matchesCategory && matchesLicense;
    }

    const queryTokens = query.split(/\s+/).filter(Boolean);
    const matchesSearch = queryTokens.every(token => 
      pkg.name.toLowerCase().includes(token) || 
      pkg.description.toLowerCase().includes(token) ||
      pkg.category.toLowerCase().includes(token) ||
      pkg.license.toLowerCase().includes(token) ||
      (pkg.commands.windows && pkg.commands.windows.some(c => c.packageId.toLowerCase().includes(token) || c.installCmd.toLowerCase().includes(token))) ||
      (pkg.commands.macos && pkg.commands.macos.some(c => c.packageId.toLowerCase().includes(token) || c.installCmd.toLowerCase().includes(token))) ||
      (pkg.commands.linux && pkg.commands.linux.some(c => c.packageId.toLowerCase().includes(token) || c.installCmd.toLowerCase().includes(token)))
    );

    return matchesPlatform && matchesCategory && matchesLicense && matchesSearch;
  });

  // Package Stack manipulation
  const togglePackageInStack = (pkg: Package) => {
    const exists = bootstrapStack.some((item) => item.id === pkg.id);
    if (exists) {
      setBootstrapStack(bootstrapStack.filter((item) => item.id !== pkg.id));
      addToast(`Removed ${pkg.name} from bootstrap stack`, 'warning');
    } else {
      setBootstrapStack([...bootstrapStack, pkg]);
      addToast(`Added ${pkg.name} to bootstrap stack`, 'success');
    }
  };

  const removePackageFromStack = (pkgId: string) => {
    const pkgName = allPackages.find(p => p.id === pkgId)?.name || pkgId;
    setBootstrapStack(bootstrapStack.filter((item) => item.id !== pkgId));
    addToast(`Removed ${pkgName} from bootstrap stack`, 'warning');
  };

  const removeMultiplePackagesFromStack = (pkgIds: string[]) => {
    setBootstrapStack(bootstrapStack.filter((item) => !pkgIds.includes(item.id)));
    addToast(`Removed ${pkgIds.length} packages from stack`, 'warning');
  };

  const handleClearStack = () => {
    setBootstrapStack([]);
    addToast('Cleared all packages from stack', 'warning');
  };

  const handleAddBulkPackages = (pkgs: Package[]) => {
    // Add only those which are not already in stack
    const newItems = pkgs.filter(p => !bootstrapStack.some(item => item.id === p.id));
    setBootstrapStack([...bootstrapStack, ...newItems]);
    if (newItems.length > 0) {
      addToast(`Added ${newItems.length} packages to stack`, 'success');
    } else {
      addToast('Selected packages are already in stack', 'info');
    }
  };

  const handleAddCustomPackage = (newPkg: Package) => {
    setCustomPackages([newPkg, ...customPackages]);
    setIsAddDialogOpen(false);
    addToast(`Registered custom manifest: ${newPkg.name}`, 'success');
  };

  const getCategoryColorClass = (cat: Category | 'all') => {
    if (selectedCategory === cat) {
      return 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-950/35';
    }
    return 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600/60';
  };

  const featuredPkg = allPackages.find(p => p.id === 'vscode') || allPackages[0];
  const isFeaturedInStack = bootstrapStack.some((item) => item.id === featuredPkg.id);

  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden antialiased selection:bg-indigo-500/30 selection:text-indigo-200" id="main-applet-container">
      {/* 1. DESKTOP LEFT SIDEBAR */}
      <aside className="w-64 bg-[#020617] border-r border-slate-800 md:flex flex-col p-6 space-y-8 shrink-0 hidden" id="sidebar-nav">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Database className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white block">OmniPkg</span>
            <span className="text-[10px] text-slate-500 font-bold tracking-wider -mt-1 block uppercase">Software Center</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-2">Discovery</p>
          <button
            onClick={() => setActiveTab('discover')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'discover'
                ? 'bg-indigo-600/10 text-indigo-400 font-semibold'
                : 'text-slate-400 hover:bg-slate-800/50'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Browse Apps</span>
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-2">Management</p>
          <button
            onClick={() => setActiveTab('builder')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'builder'
                ? 'bg-indigo-600/10 text-indigo-400 font-semibold'
                : 'text-slate-400 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Terminal className="w-4 h-4" />
              <span>Bootstrap Stack</span>
            </div>
            <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${bootstrapStack.length > 0 ? 'bg-indigo-500 text-white shadow-md' : 'bg-slate-800 text-slate-500'}`}>
              {bootstrapStack.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('doctor')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'doctor'
                ? 'bg-indigo-600/10 text-indigo-400 font-semibold'
                : 'text-slate-400 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Activity className="w-4 h-4" />
              <span>Host Doctor</span>
            </div>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 font-bold uppercase">Ready</span>
          </button>
        </div>

        <div className="mt-auto border-t border-slate-800 pt-6">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-850 border border-slate-750 flex items-center justify-center font-bold text-indigo-400 text-xs shadow-inner">
              SA
            </div>
            <div>
              <p className="text-xs font-bold text-white">System Admin</p>
              <p className="text-[10px] text-slate-500">{allPackages.length} Sources Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="flex-1 flex flex-col bg-[#0f172a] overflow-hidden">
        
        {/* MOBILE HEADER (Fallback for small screens) */}
        <header className="md:hidden border-b border-slate-800 bg-[#020617] p-4 flex items-center justify-between sticky top-0 z-30" id="mobile-header">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Database className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-md text-white">OmniPkg</span>
          </div>
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('discover')}
              className={`px-2.5 py-1 text-xs font-bold rounded ${activeTab === 'discover' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}
            >
              Browse
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-2.5 py-1 text-xs font-bold rounded relative ${activeTab === 'builder' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}
            >
              Stack
              {bootstrapStack.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {bootstrapStack.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('doctor')}
              className={`px-2.5 py-1 text-xs font-bold rounded ${activeTab === 'doctor' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}
            >
              Doctor
            </button>
          </div>
        </header>

        {/* TOP DESKTOP HEADER (Aligned with Mockup) */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
          {/* Mockup search box: Only interactive in Discover tab, otherwise general descriptor */}
          <div className="relative" id="desktop-search-container">
            <div className="flex items-center bg-slate-800/50 rounded-lg px-3 py-1.5 w-72 sm:w-96 border border-slate-700/50 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all">
              <Search className="w-4 h-4 text-slate-500 mr-2" />
              <input 
                type="text" 
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => {
                  if (activeTab !== 'discover') {
                    setActiveTab('discover');
                  }
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search packages (e.g. Adobe Acrobat, VS Code, Git)..." 
                className="bg-transparent border-none text-sm focus:outline-none focus:ring-0 w-full text-slate-300 outline-none placeholder-slate-500"
              />
            </div>

            {/* Trending Searches Dropdown */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onMouseDown={(e) => {
                    // Prevent the input from losing focus when clicking inside the dropdown
                    e.preventDefault();
                  }}
                  className="absolute left-0 mt-2 w-72 sm:w-[28rem] bg-[#020617] border border-slate-800 rounded-xl shadow-2xl p-4 z-50 overflow-hidden divide-y divide-slate-800/80"
                  id="trending-searches-dropdown"
                >
                  {/* Popular Categories */}
                  <div className="pb-3 text-left">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Popular Categories</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {popularCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setActiveTab('discover');
                            setSearchQuery('');
                            setIsSearchFocused(false);
                          }}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer capitalize text-left"
                        >
                          {cat === 'internet' ? 'Internet & Web' : cat === 'utilities' ? 'System Utilities' : cat === 'media' ? 'Media & Audio' : cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Top Rated & Trending Software */}
                  <div className="pt-3 text-left">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>Top-Rated & Trending</span>
                    </span>
                    <div className="space-y-1">
                      {trendingApps.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => {
                            setSearchQuery(pkg.name);
                            setSelectedCategory('all');
                            setActiveTab('discover');
                            setIsSearchFocused(false);
                          }}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 transition-colors text-left group cursor-pointer"
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <div className="w-6 h-6 rounded bg-slate-950 flex items-center justify-center border border-slate-800/80 group-hover:border-indigo-500/30 transition-all font-bold text-[10px] text-indigo-400 shrink-0">
                              {pkg.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors block truncate">
                                {pkg.name}
                              </span>
                              <span className="text-[10px] text-slate-500 block truncate max-w-[15rem] sm:max-w-[18rem]">
                                {pkg.description}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10 text-[10px] font-bold shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                            <span>{pkg.calculatedRating.toFixed(1)}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Platform Fast Selector */}
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => setActivePlatform('all')}
                className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-all ${activePlatform === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ALL
              </button>
              <button 
                onClick={() => setActivePlatform('windows')}
                className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-all ${activePlatform === 'windows' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'text-slate-500 hover:text-slate-300'}`}
              >
                WIN
              </button>
              <button 
                onClick={() => setActivePlatform('linux')}
                className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-all ${activePlatform === 'linux' ? 'bg-purple-950 text-purple-400 border border-purple-800/40' : 'text-slate-500 hover:text-slate-300'}`}
              >
                LIN
              </button>
              <button 
                onClick={() => setActivePlatform('macos')}
                className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-all ${activePlatform === 'macos' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' : 'text-slate-500 hover:text-slate-300'}`}
              >
                MAC
              </button>
            </div>

            {/* Header Right Action */}
            <button 
              onClick={() => setIsAddDialogOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-lg transition-all shadow-md cursor-pointer flex items-center gap-1 shrink-0"
              title="Add a custom manifest"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Manifest</span>
            </button>
          </div>
        </header>

        {/* 3. MAIN SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8" id="tab-content-area">
          <AnimatePresence mode="wait">
            {activeTab === 'discover' && (
              <motion.div
                key="discover"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-8"
              >
                {/* HERO GRADIENT BANNER FOR FEATURED PACKAGE */}
                <div className="bg-gradient-to-r from-indigo-950 to-indigo-700 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden shadow-2xl border border-indigo-850/40">
                  <div className="relative z-10 max-w-lg text-left">
                    <span className="bg-indigo-400/30 text-indigo-100 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mb-4 inline-block border border-indigo-400/20">
                      Featured Utility
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                      {featuredPkg.name}
                    </h2>
                    <p className="text-indigo-100/85 mb-6 text-xs sm:text-sm">
                      {featuredPkg.description}
                    </p>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => togglePackageInStack(featuredPkg)}
                        className={`px-5 py-2 text-xs font-bold rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                          isFeaturedInStack 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                            : 'bg-white text-indigo-900 hover:bg-indigo-50'
                        }`}
                      >
                        {isFeaturedInStack ? 'In Stack (Remove)' : 'Get Package'}
                      </button>
                      <button 
                        onClick={() => setSelectedPackageForDetails(featuredPkg)}
                        className="px-5 py-2 bg-indigo-500/20 border border-indigo-400/30 text-white font-bold rounded-lg backdrop-blur-sm hover:bg-indigo-500/30 transition-all cursor-pointer text-xs"
                      >
                        Specs & Configs
                      </button>
                    </div>
                  </div>
                  
                  {/* Decorative background visual */}
                  <div className="absolute right-6 bottom-4 opacity-15 transform rotate-12 pointer-events-none hidden sm:block">
                    <Database className="w-56 h-56 text-white" />
                  </div>
                </div>

                {/* 30-Day Installation Popularity Trend Chart (Recharts) */}
                <PopularityTrendChart
                  packages={filteredPackages.length > 0 ? filteredPackages : allPackages}
                  selectedCategory={selectedCategory}
                  activePlatform={activePlatform}
                  bootstrapStack={bootstrapStack}
                  onSelectPackage={(pkg) => setSelectedPackageForDetails(pkg)}
                  onToggleStack={(pkg) => togglePackageInStack(pkg)}
                />

                {/* Categories filtering list & Statistics Deck */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Explore Categories
                      </span>
                      <div className="flex bg-slate-900/90 p-0.5 rounded-lg border border-slate-800" id="license-filter-bar">
                        {([
                          { id: 'all', label: 'All Licenses' },
                          { id: 'freeware', label: 'Freeware' },
                          { id: 'opensource', label: 'Open Source' }
                        ] as const).map((lic) => (
                          <button
                            key={lic.id}
                            id={`license-filter-${lic.id}`}
                            onClick={() => setLicenseFilter(lic.id)}
                            className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              licenseFilter === lic.id
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {lic.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {filteredPackages.length} packages found
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2" id="category-picker">
                    <button
                      id="cat-picker-all"
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${getCategoryColorClass('all')}`}
                    >
                      All Categories
                    </button>
                    {(['development', 'internet', 'productivity', 'utilities', 'design', 'media', 'security'] as Category[]).map((cat) => (
                      <button
                        key={cat}
                        id={`cat-picker-${cat}`}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-medium capitalize rounded-lg border transition-all cursor-pointer ${getCategoryColorClass(cat)}`}
                      >
                        {cat === 'internet' ? 'Internet & Web' : cat === 'utilities' ? 'System Utilities' : cat === 'media' ? 'Media & Audio' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Package cards grid view */}
                {filteredPackages.length === 0 ? (
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-lg" id="empty-discover-state">
                    <div className="w-14 h-14 bg-slate-950 rounded-2xl border border-slate-850 flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-slate-600" />
                    </div>
                    <h4 className="text-md font-bold text-slate-200">No tools match your query</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed">
                      Try adjusting your category filter, clearing your search input, or click 'Add Custom Package' to register a custom freeware identifier.
                    </p>
                    <button
                      id="btn-clear-filters-empty"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setActivePlatform('all');
                        setLicenseFilter('all');
                      }}
                      className="mt-4 px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      Clear Filter Parameters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="packages-grid">
                    {filteredPackages.map((pkg) => (
                      <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                        activePlatform={activePlatform}
                        isInStack={bootstrapStack.some((item) => item.id === pkg.id)}
                        onToggleStack={() => togglePackageInStack(pkg)}
                        onViewDetails={() => setSelectedPackageForDetails(pkg)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'builder' && (
              <motion.div
                key="builder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <ScriptBuilder
                  selectedPackages={bootstrapStack}
                  onRemovePackage={removePackageFromStack}
                  onClearStack={handleClearStack}
                  onAddBulkPackages={handleAddBulkPackages}
                  allCuratedPackages={allPackages}
                  onRemoveMultiplePackages={removeMultiplePackagesFromStack}
                  onNotify={addToast}
                />
              </motion.div>
            )}

            {activeTab === 'doctor' && (
              <motion.div
                key="doctor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <SystemDoctor />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SLEEK MOCKUP FOOTER */}
        <footer className="h-10 bg-[#020617] border-t border-slate-800 px-6 flex items-center justify-between text-[10px] text-slate-500 font-medium shrink-0" id="footer-bottom">
          <div className="flex items-center space-x-4">
            <span>{allPackages.length} Packages Available</span>
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
              <span>Repository Sync Active</span>
            </span>
          </div>
          <div>OmniPkg v1.4.0-alpha • MIT Licensed</div>
        </footer>
      </div>

      {/* 4. DETAILS DRAWER / MODAL DIALOGUE */}
      {selectedPackageForDetails && (
        <PackageDetails
          pkg={selectedPackageForDetails}
          isInStack={bootstrapStack.some((item) => item.id === selectedPackageForDetails.id)}
          onToggleStack={() => togglePackageInStack(selectedPackageForDetails)}
          onClose={() => setSelectedPackageForDetails(null)}
        />
      )}

      {/* 5. ADD CUSTOM UTILITY DIALOGUE */}
      {isAddDialogOpen && (
        <AddPackageDialog
          onAdd={handleAddCustomPackage}
          onClose={() => setIsAddDialogOpen(false)}
        />
      )}

      {/* 6. TOAST NOTIFICATIONS PORTAL */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
