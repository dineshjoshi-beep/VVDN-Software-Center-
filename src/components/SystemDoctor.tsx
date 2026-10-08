import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Terminal, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  Play, 
  HelpCircle,
  ArrowUpCircle,
  History,
  Clock,
  Trash2,
  HardDrive,
  Monitor,
  Sliders,
  AlertTriangle,
  X
} from 'lucide-react';
import { Platform, SystemCheckRule } from '../types';
import { SYSTEM_CHECK_RULES } from '../data/packages';

export interface HardwareItem {
  iconName: 'cpu' | 'ram' | 'storage' | 'gpu' | 'security';
  label: string;
  value: string;
  status: 'passed' | 'warning' | 'failed';
  details: string;
}

const GET_SIMULATED_HARDWARE = (platform: Platform): HardwareItem[] => {
  switch (platform) {
    case 'windows':
      return [
        {
          iconName: 'cpu',
          label: 'Processor (CPU)',
          value: 'Intel Core i7-11700 @ 2.50GHz (8 Cores, 16 Threads)',
          status: 'passed',
          details: 'Meets high-performance compilation speed standards.'
        },
        {
          iconName: 'ram',
          label: 'System Memory (RAM)',
          value: '16.0 GB DDR4 @ 3200MHz',
          status: 'passed',
          details: 'Optimal memory capacity for handling multi-process builds.'
        },
        {
          iconName: 'storage',
          label: 'Storage (Primary Disk)',
          value: '512 GB NVMe SSD (214 GB Free)',
          status: 'passed',
          details: 'Ultra fast read/write speeds detected on active partition.'
        },
        {
          iconName: 'security',
          label: 'Trusted Platform Module (TPM)',
          value: 'TPM 2.0 (Enabled & Active)',
          status: 'passed',
          details: 'Required for secure cryptographic container signing and verification.'
        },
        {
          iconName: 'gpu',
          label: 'Graphics Support (DirectX)',
          value: 'NVIDIA GeForce RTX 3060 (DirectX 12 support)',
          status: 'passed',
          details: 'Hardware-accelerated package rendering is fully supported.'
        }
      ];
    case 'macos':
      return [
        {
          iconName: 'cpu',
          label: 'Processor (CPU)',
          value: 'Apple M2 Pro (10 Cores: 6 Performance, 4 Efficiency)',
          status: 'passed',
          details: 'ARM64 architecture natively supported.'
        },
        {
          iconName: 'ram',
          label: 'System Memory (RAM)',
          value: '16.0 GB Unified Memory',
          status: 'passed',
          details: 'Fast zero-copy memory pool enables instant package compilation.'
        },
        {
          iconName: 'storage',
          label: 'Storage (Primary Disk)',
          value: '1 TB Apple SSD (450 GB Free)',
          status: 'passed',
          details: 'Extremely fast read speeds exceeding 5,000 MB/s.'
        },
        {
          iconName: 'security',
          label: 'Secure Enclave Firmware',
          value: 'Apple Secure Enclave v2 Active',
          status: 'passed',
          details: 'Required for secure cryptographic keychain storage access.'
        },
        {
          iconName: 'gpu',
          label: 'Graphics Support (Metal)',
          value: 'Apple GPU (16-Core, Metal 3 API Support)',
          status: 'passed',
          details: 'Full graphics pipeline support for hardware-accelerated terminals.'
        }
      ];
    case 'linux':
      return [
        {
          iconName: 'cpu',
          label: 'Processor (CPU)',
          value: 'Intel Core i3-10100F @ 3.60GHz (4 Cores, 8 Threads)',
          status: 'passed',
          details: 'Meets minimum CPU compile requirement.'
        },
        {
          iconName: 'ram',
          label: 'System Memory (RAM)',
          value: '8.0 GB DDR4 @ 2400MHz',
          status: 'warning',
          details: 'Minimum RAM size is 8GB. 16GB is highly recommended for building large container layers.'
        },
        {
          iconName: 'storage',
          label: 'Storage (Primary Disk)',
          value: '240 GB Kingston SATA SSD (15 GB Free)',
          status: 'warning',
          details: 'Low storage blocks detected! Free up disk space to prevent download failures.'
        },
        {
          iconName: 'security',
          label: 'Virtualization & Sandbox (KVM)',
          value: 'Intel VT-x Enabled (/dev/kvm accessible)',
          status: 'passed',
          details: 'Hardware virtualization is fully active for secure docker sandbox environments.'
        },
        {
          iconName: 'gpu',
          label: 'Display Server Integration',
          value: 'X11 Window Server / Mesa Intel Graphics',
          status: 'passed',
          details: 'Fully compatible with standard GUI application frameworks.'
        }
      ];
  }
};

export const SystemDoctor: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<Platform>('windows');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Hardware Compatibility Check States
  const [isHardwareChecking, setIsHardwareChecking] = useState(false);
  const [hardwareProgress, setHardwareProgress] = useState(0);
  const [hardwareStepText, setHardwareStepText] = useState('');
  const [hardwareResults, setHardwareResults] = useState<Record<Platform, HardwareItem[] | null>>({
    windows: null,
    macos: null,
    linux: null
  });
  
  // History state
  const [history, setHistory] = useState<{
    id: string;
    pkgId: string;
    name: string;
    timestamp: string;
    type: 'upgrade' | 'bulk_install' | 'diagnostic' | 'hardware';
    platform: Platform;
    status?: 'success' | 'failed';
    version?: string;
  }[]>(() => {
    const saved = localStorage.getItem('omnipkg_install_history');
    if (saved) return JSON.parse(saved);
    
    // Seed some initial history entries to make it look professional on first load!
    const initialSeed = [
      {
        id: 'seed-1',
        pkgId: 'git',
        name: 'Bulk Deploy: Git',
        timestamp: new Date(Date.now() - 3600000 * 4).toLocaleString(),
        type: 'bulk_install' as const,
        platform: 'windows' as Platform,
        status: 'success' as const
      },
      {
        id: 'seed-2',
        pkgId: 'node-check',
        name: 'Diagnostic: Node.js Environment',
        timestamp: new Date(Date.now() - 3600000 * 3).toLocaleString(),
        type: 'diagnostic' as const,
        platform: 'windows' as Platform,
        status: 'success' as const
      },
      {
        id: 'seed-3',
        pkgId: 'python-check',
        name: 'Diagnostic: Python 3 Interpreter',
        timestamp: new Date(Date.now() - 3600000 * 2.5).toLocaleString(),
        type: 'diagnostic' as const,
        platform: 'windows' as Platform,
        status: 'failed' as const
      },
      {
        id: 'seed-4',
        pkgId: 'vscode',
        name: 'Upgrade: Visual Studio Code',
        timestamp: new Date(Date.now() - 3600000).toLocaleString(),
        type: 'upgrade' as const,
        platform: 'windows' as Platform,
        status: 'success' as const,
        version: 'Latest'
      }
    ];
    localStorage.setItem('omnipkg_install_history', JSON.stringify(initialSeed));
    return initialSeed;
  });

  // Calculate System Health Score from History Log for initial state and animation tracking
  const totalOperations = history.length;
  const successfulOperations = history.filter(item => item.status !== 'failed').length;
  const failedOperations = history.filter(item => item.status === 'failed').length;
  const systemHealthScore = totalOperations > 0 
    ? Math.round((successfulOperations / totalOperations) * 100) 
    : 100;

  const [animatedHealthScore, setAnimatedHealthScore] = useState(systemHealthScore);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1000; // 1 second animation duration
    const startValue = animatedHealthScore;
    const endValue = systemHealthScore;

    if (startValue === endValue) return;

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing: easeOutCubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);
      
      setAnimatedHealthScore(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [systemHealthScore]);

  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('omnipkg_install_history');
    setShowConfirmClear(false);
  };

  // Outdated checks state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [hasScanned, setHasScanned] = useState(() => {
    return localStorage.getItem('doctor_has_scanned') === 'true';
  });
  const [upgradedIds, setUpgradedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('doctor_upgraded_ids');
    return saved ? JSON.parse(saved) : [];
  });
  const [upgradingId, setUpgradingId] = useState<string | null>(null);
  const [upgradeLogs, setUpgradeLogs] = useState<string[]>([]);
  const [upgradeProgress, setUpgradeProgress] = useState(0);

  // Automated diagnostics check state
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnoseProgress, setDiagnoseProgress] = useState(0);
  const [diagnoseLogs, setDiagnoseLogs] = useState<string[]>([]);
  const [currentDiagnoseRule, setCurrentDiagnoseRule] = useState<string>('');

  useEffect(() => {
    const el = document.getElementById('diagnose-live-logs');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [diagnoseLogs]);

  useEffect(() => {
    const el = document.getElementById('doctor-upgrade-terminal-logs');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [upgradeLogs]);

  useEffect(() => {
    localStorage.setItem('doctor_has_scanned', hasScanned ? 'true' : 'false');
  }, [hasScanned]);

  useEffect(() => {
    localStorage.setItem('doctor_upgraded_ids', JSON.stringify(upgradedIds));
  }, [upgradedIds]);

  const winScanLogs = [
    "Initializing background local repository index audit...",
    "Executing winget list --upgradeable-only...",
    "Querying Microsoft Store registry endpoints...",
    "Querying winget central community index...",
    "Comparing local package manifest hashes...",
    "Found 4 upgradeable items matching OmniPkg directory!"
  ];

  const macScanLogs = [
    "Auditing user cask and formula environment indices...",
    "Executing brew outdated...",
    "Fetching remote package updates from GitHub formulas...",
    "Computing version differences...",
    "Found 4 outdated Homebrew packages!"
  ];

  const linuxScanLogs = [
    "Executing apt-get update --dry-run & flatpak updates index...",
    "Reading local package list trees... Done",
    "Resolving package dependency graph upgrades...",
    "Comparing local APT hashes with central repositories...",
    "Found 4 upgradeable packages!"
  ];

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([]);
    
    const logs = activePlatform === 'windows' 
      ? winScanLogs 
      : activePlatform === 'macos' 
        ? macScanLogs 
        : linuxScanLogs;

    let idx = 0;
    const interval = setInterval(() => {
      setScanLogs(prev => [...prev, logs[idx]]);
      idx++;
      setScanProgress((idx / logs.length) * 100);

      if (idx >= logs.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setHasScanned(true);
        }, 500);
      }
    }, 400);
  };

  const handleUpgrade = (pkgId: string, pkgName: string, upgradeCmd: string) => {
    setUpgradingId(pkgId);
    setUpgradeProgress(0);
    setUpgradeLogs([`$ ${upgradeCmd}`]);

    const upgradeSteps = [
      `Fetching manifest definitions for ${pkgName}...`,
      `Downloading newer version package archive... (78.3 MB)`,
      `[████████████████████] 100% Download completed`,
      `Validating SHA256 integrity hash code... Verified`,
      `Overwriting active program file indices...`,
      `Cleaning up legacy setup archives...`,
      `Congratulations! ${pkgName} has been upgraded successfully.`
    ];

    let idx = 0;
    const interval = setInterval(() => {
      setUpgradeLogs(prev => [...prev, upgradeSteps[idx]]);
      idx++;
      setUpgradeProgress((idx / upgradeSteps.length) * 100);

      if (idx >= upgradeSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setUpgradedIds(prev => [...prev, pkgId]);
          setUpgradingId(null);
          
          const newEntry = {
            id: Math.random().toString(36).substring(2, 9),
            pkgId,
            name: pkgName,
            timestamp: new Date().toLocaleString(),
            type: 'upgrade' as const,
            platform: activePlatform,
            status: 'success' as const,
            version: 'Latest'
          };
          setHistory(prev => {
            const updated = [newEntry, ...prev];
            localStorage.setItem('omnipkg_install_history', JSON.stringify(updated));
            return updated;
          });
        }, 600);
      }
    }, 450);
  };

  const handleResetOutdated = () => {
    setHasScanned(false);
    setUpgradedIds([]);
  };

  const getOutdatedPackages = () => {
    if (activePlatform === 'windows') {
      return [
        { id: 'adobe-acrobat-reader', name: 'Adobe Acrobat Reader', installed: 'v23.008.20470', latest: 'v24.002.20895', manager: 'winget', cmd: 'winget upgrade --id Adobe.Acrobat.Reader.64-bit -e', severity: 'Critical' },
        { id: 'vscode', name: 'Visual Studio Code', installed: 'v1.85.0', latest: 'v1.91.0', manager: 'winget', cmd: 'winget upgrade --id Microsoft.VisualStudioCode -e', severity: 'High' },
        { id: 'git', name: 'Git for Windows', installed: 'v2.41.0', latest: 'v2.45.2', manager: 'winget', cmd: 'winget upgrade --id Git.Git -e', severity: 'Low' },
        { id: 'docker', name: 'Docker Desktop', installed: 'v4.25.0', latest: 'v4.31.1', manager: 'winget', cmd: 'winget upgrade --id Docker.DockerDesktop -e', severity: 'Medium' },
        { id: 'vlc', name: 'VLC Media Player', installed: 'v3.0.18', latest: 'v3.0.21', manager: 'winget', cmd: 'winget upgrade --id VideoLAN.VLC -e', severity: 'Low' }
      ];
    } else if (activePlatform === 'macos') {
      return [
        { id: 'adobe-acrobat-reader', name: 'Adobe Acrobat Reader', installed: 'v23.008.20470', latest: 'v24.002.20895', manager: 'brew', cmd: 'brew upgrade --cask adobe-acrobat-reader', severity: 'Critical' },
        { id: 'vscode', name: 'Visual Studio Code', installed: 'v1.85.0', latest: 'v1.91.0', manager: 'brew', cmd: 'brew upgrade --cask visual-studio-code', severity: 'High' },
        { id: 'docker', name: 'Docker Desktop', installed: 'v4.25.0', latest: 'v4.31.1', manager: 'brew', cmd: 'brew upgrade --cask docker', severity: 'Medium' },
        { id: 'neovim', name: 'Neovim', installed: 'v0.9.0', latest: 'v0.10.0', manager: 'brew', cmd: 'brew upgrade neovim', severity: 'Low' },
        { id: 'obsidian', name: 'Obsidian', installed: 'v1.5.0', latest: 'v1.6.3', manager: 'brew', cmd: 'brew upgrade --cask obsidian', severity: 'Low' }
      ];
    } else {
      return [
        { id: 'git', name: 'Git', installed: 'v2.39.0', latest: 'v2.43.0', manager: 'apt', cmd: 'sudo apt update && sudo apt install --only-upgrade git', severity: 'Low' },
        { id: 'vlc', name: 'VLC Media Player', installed: 'v3.0.16', latest: 'v3.0.21', manager: 'flatpak', cmd: 'flatpak update org.videolan.VLC -y', severity: 'Low' },
        { id: 'keepassxc', name: 'KeePassXC', installed: 'v2.7.4', latest: 'v2.7.9', manager: 'apt', cmd: 'sudo apt update && sudo apt install --only-upgrade keepassxc', severity: 'Medium' },
        { id: 'wireshark', name: 'Wireshark', installed: 'v4.0.0', latest: 'v4.2.5', manager: 'apt', cmd: 'sudo apt update && sudo apt install --only-upgrade wireshark', severity: 'High' }
      ];
    }
  };
  
  // Track manual check status in localStorage to persist diagnostics
  const [checkStatuses, setCheckStatuses] = useState<Record<string, 'pending' | 'passed' | 'failed'>>(() => {
    const saved = localStorage.getItem('system_check_statuses');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('system_check_statuses', JSON.stringify(checkStatuses));
  }, [checkStatuses]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const handleSetStatus = (ruleId: string, status: 'passed' | 'failed') => {
    setCheckStatuses(prev => ({
      ...prev,
      [ruleId]: status
    }));

    const rule = SYSTEM_CHECK_RULES.find(r => r.id === ruleId);
    if (rule) {
      const newEntry = {
        id: Math.random().toString(36).substring(2, 9),
        pkgId: ruleId,
        name: `Diagnostic Check: ${rule.title}`,
        timestamp: new Date().toLocaleString(),
        type: 'diagnostic' as const,
        platform: activePlatform,
        status: (status === 'passed' ? 'success' : 'failed') as 'success' | 'failed'
      };
      setHistory(prev => {
        const updated = [newEntry, ...prev];
        localStorage.setItem('omnipkg_install_history', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleResetStatuses = () => {
    const cleared: Record<string, 'pending'> = {};
    filteredRules.forEach(r => {
      cleared[r.id] = 'pending';
    });
    setCheckStatuses(prev => ({
      ...prev,
      ...cleared
    }));
  };

  const handleAutoDiagnose = () => {
    if (isDiagnosing) return;
    setIsDiagnosing(true);
    setDiagnoseProgress(0);
    setDiagnoseLogs(['Initializing automated system integrity diagnostic scan...', `Target Platform: ${activePlatform}`]);
    setCurrentDiagnoseRule('Starting...');

    const rules = filteredRules;
    if (rules.length === 0) {
      setIsDiagnosing(false);
      return;
    }

    let currentRuleIdx = 0;
    let step = 0;

    const interval = setInterval(() => {
      if (currentRuleIdx >= rules.length) {
        clearInterval(interval);
        setDiagnoseProgress(100);
        setDiagnoseLogs(prev => [
          ...prev, 
          '✔ Simulated system diagnostics finished.',
          'Summary: Host rating updated successfully.'
        ]);
        setTimeout(() => {
          setIsDiagnosing(false);
        }, 1200);
        return;
      }

      const rule = rules[currentRuleIdx];
      
      if (step === 0) {
        setCurrentDiagnoseRule(rule.title);
        setDiagnoseLogs(prev => [...prev, `[Audit] Evaluating: ${rule.title}...`]);
        step = 1;
      } else if (step === 1) {
        setDiagnoseLogs(prev => [...prev, `  $ ${rule.checkCommand}`]);
        step = 2;
      } else if (step === 2) {
        // We will fail one rule to make it interesting (e.g., the second rule, or the rule that has a remedy command)
        // Usually, the rules with remedyCommand can fail so they can be fixed
        const shouldFail = !!rule.remedyCommand && (currentRuleIdx === 1 || currentRuleIdx === 2);
        const status: 'passed' | 'failed' = shouldFail ? 'failed' : 'passed';
        
        setCheckStatuses(prev => ({
          ...prev,
          [rule.id]: status
        }));

        const newEntry = {
          id: Math.random().toString(36).substring(2, 9),
          pkgId: rule.id,
          name: `Diagnostic Check: ${rule.title}`,
          timestamp: new Date().toLocaleString(),
          type: 'diagnostic' as const,
          platform: activePlatform,
          status: (status === 'passed' ? 'success' : 'failed') as 'success' | 'failed'
        };
        setHistory(prev => {
          const updated = [newEntry, ...prev];
          localStorage.setItem('omnipkg_install_history', JSON.stringify(updated));
          return updated;
        });

        setDiagnoseLogs(prev => [
          ...prev,
          status === 'passed' 
            ? `  ✔ SUCCESS: Rule verified.` 
            : `  ✖ WARNING: Verification failed! Setup remedy is suggested.`
        ]);
        
        currentRuleIdx++;
        step = 0;
      }

      const completedPercent = (currentRuleIdx / rules.length) * 100;
      const stepOffset = step * (100 / rules.length) / 3;
      setDiagnoseProgress(Math.min(completedPercent + stepOffset, 99.5));
    }, 450);
  };

  const handleHardwareCheck = () => {
    if (isHardwareChecking) return;
    setIsHardwareChecking(true);
    setHardwareProgress(0);
    setHardwareStepText('Probing motherboard and CPU instruction registers...');

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setHardwareProgress(100);
        setHardwareStepText('Compiling hardware compatibility report...');
        setTimeout(() => {
          const results = GET_SIMULATED_HARDWARE(activePlatform);
          setHardwareResults(prev => ({
            ...prev,
            [activePlatform]: results
          }));
          setIsHardwareChecking(false);

          const hasFails = results.some(r => r.status === 'failed');
          const newEntry = {
            id: Math.random().toString(36).substring(2, 9),
            pkgId: `hw-${activePlatform}`,
            name: `Hardware Check: ${activePlatform.toUpperCase()}`,
            timestamp: new Date().toLocaleString(),
            type: 'hardware' as const,
            platform: activePlatform,
            status: (hasFails ? 'failed' : 'success') as 'success' | 'failed'
          };
          setHistory(prev => {
            const updated = [newEntry, ...prev];
            localStorage.setItem('omnipkg_install_history', JSON.stringify(updated));
            return updated;
          });
        }, 600);
      } else {
        setHardwareProgress(currentProgress);
        if (currentProgress < 20) {
          setHardwareStepText('Probing CPU architecture cores and floating point flags...');
        } else if (currentProgress < 40) {
          setHardwareStepText('Analyzing system memory allocation limits & bus width...');
        } else if (currentProgress < 60) {
          setHardwareStepText('Measuring primary SSD storage blocks & read speeds...');
        } else if (currentProgress < 80) {
          setHardwareStepText('Verifying cryptographic TPM/Enclave firmware integrity...');
        } else {
          setHardwareStepText('Probing graphics pipeline interface & rendering APIs...');
        }
      }
    }, 100);
  };

  const handleClearHardwareCheck = () => {
    setHardwareResults(prev => ({
      ...prev,
      [activePlatform]: null
    }));
  };

  const filteredRules = SYSTEM_CHECK_RULES.filter(rule => rule.platform === activePlatform);

  // Stats calculation
  const totalChecks = filteredRules.length;
  const passedChecks = filteredRules.filter(r => checkStatuses[r.id] === 'passed').length;
  const failedChecks = filteredRules.filter(r => checkStatuses[r.id] === 'failed').length;
  const healthPercent = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;

  return (
    <div className="space-y-6" id="system-doctor-section">
      {/* Dynamic System Health Score Dashboard Card */}
      <div 
        id="system-health-score-card" 
        className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-850 rounded-2xl p-6 shadow-xl relative overflow-hidden"
      >
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/40 border border-indigo-900/35 px-2.5 py-1 rounded">
                Live Audit Metrics
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-900/35 px-2.5 py-1 rounded">
                Workspace Persistence
              </span>
            </div>
            
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <span>System Health Score</span>
            </h3>
            
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              This score aggregates manual diagnostic validations, host platform upgrades, automated diagnostic health logs, and hardware checks currently saved in your workspace session history.
            </p>

            {/* Quick Micro-Statistics Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Total Actions</span>
                <span className="text-sm font-bold text-slate-200 mt-0.5">{totalOperations}</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Successful</span>
                <span className="text-sm font-bold text-emerald-400 mt-0.5">{successfulOperations}</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Failed</span>
                <span className="text-sm font-bold text-rose-400 mt-0.5">{failedOperations}</span>
              </div>
            </div>
          </div>

          {/* Health Gauge & Radial Progress Indicator */}
          <div className="flex flex-col items-center justify-center bg-slate-950/55 p-5 rounded-2xl border border-slate-850/80 min-w-[240px] text-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-3">
              Overall Status Index
            </span>

            <div className="relative flex items-center justify-center w-28 h-28 mb-3">
              {/* Radial track */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className="stroke-slate-850"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className={`transition-all duration-1000 ease-out ${
                    animatedHealthScore >= 80 
                      ? 'stroke-emerald-500' 
                      : animatedHealthScore >= 50 
                        ? 'stroke-amber-500' 
                        : 'stroke-rose-500'
                  }`}
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={2 * Math.PI * 48 * (1 - animatedHealthScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-100 tracking-tight">
                  {animatedHealthScore}%
                </span>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${
                  animatedHealthScore >= 80 
                    ? 'text-emerald-400' 
                    : animatedHealthScore >= 50 
                      ? 'text-amber-400' 
                      : 'text-rose-400'
                }`}>
                  {animatedHealthScore >= 80 ? 'Optimal' : animatedHealthScore >= 50 ? 'Warning' : 'Critical'}
                </span>
              </div>
            </div>

            <div className="w-full text-xs text-slate-400 font-medium">
              {animatedHealthScore >= 80 ? (
                <span className="text-emerald-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> High Integrity
                </span>
              ) : animatedHealthScore >= 50 ? (
                <span className="text-amber-400 flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Minor Degradation
                </span>
              ) : (
                <span className="text-rose-400 flex items-center justify-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Action Required
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Intro Dashboard header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-lg">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/40 border border-indigo-900/35 px-2.5 py-1 rounded">
            Diagnostic utility
          </span>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <span>CLI Diagnostic Host Doctor</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Since web browsers operate in sandboxed environments, you can manually run these diagnostic snippets in your local computer console and mark each test to track your machine's package manager status.
          </p>
        </div>

        {/* Health status circle / display */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-850 flex items-center gap-4 min-w-[240px] justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Host Health Rating</span>
            <span className="text-2xl font-extrabold text-slate-100">{healthPercent}%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {passedChecks} of {totalChecks} checks successful
            </span>
          </div>

          <div className="flex gap-2">
            <button
              id="btn-run-auto-diagnostics"
              onClick={handleAutoDiagnose}
              disabled={isDiagnosing}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                isDiagnosing 
                  ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500/30 hover:border-indigo-400/40 shadow-indigo-950/25'
              }`}
              title="Run Simulated Automated Diagnostics"
            >
              <Play className={`w-3.5 h-3.5 ${isDiagnosing ? '' : 'fill-current'}`} />
              <span>{isDiagnosing ? 'Running...' : 'Auto Diagnose'}</span>
            </button>

            <button
              id="btn-reset-diagnostics"
              onClick={handleResetStatuses}
              className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Reset Diagnostic Checks"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Selector Tabs & Main diagnostics content */}
      <div className="space-y-4">
        {/* Tab Badges */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-855 max-w-sm">
          {(['windows', 'macos', 'linux'] as Platform[]).map((plat) => (
            <button
              key={plat}
              id={`doctor-tab-${plat}`}
              onClick={() => setActivePlatform(plat)}
              className={`flex-1 py-2 text-xs font-bold capitalize rounded-lg transition-all cursor-pointer ${
                activePlatform === plat
                  ? 'bg-slate-900 text-slate-100 border border-slate-800 shadow'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {plat} Setup
            </button>
          ))}
        </div>

        {/* System Specifications Context Panel */}
        <div 
          id="system-specs-panel"
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                <Monitor className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Host Environment Specifications
                </h4>
                <p className="text-[10px] text-slate-400">
                  Detected hardware environment and target platform parameters for active audits.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-1 rounded font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono uppercase">Sandboxed Environment Live</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Operating System</span>
              <span className="text-xs font-bold text-slate-200 block">
                {activePlatform === 'windows' ? 'Windows 11 Pro' : activePlatform === 'macos' ? 'macOS Sonoma' : 'Ubuntu 24.04 LTS'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Architecture</span>
              <span className="text-xs font-mono font-semibold text-indigo-400 block">
                {activePlatform === 'macos' ? 'arm64 (Silicon)' : 'x86_64 (64-bit)'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Kernel / Build</span>
              <span className="text-xs font-mono text-slate-300 block">
                {activePlatform === 'windows' ? 'Build 22631.3527' : activePlatform === 'macos' ? 'Darwin 23.5.0' : '6.8.0-35-generic'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Default Shell</span>
              <span className="text-xs font-mono text-amber-400 block">
                {activePlatform === 'windows' ? 'PowerShell 7.4.2' : activePlatform === 'macos' ? 'zsh v5.9' : 'bash v5.2.21'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Package Manager</span>
              <span className="text-xs font-semibold text-emerald-400 block">
                {activePlatform === 'windows' ? 'winget v1.8' : activePlatform === 'macos' ? 'Homebrew v4.3' : 'apt v2.7'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Compatibility Status</span>
              <span className={`text-xs font-bold block ${
                animatedHealthScore >= 80 
                  ? 'text-emerald-400' 
                  : animatedHealthScore >= 50 
                    ? 'text-amber-400' 
                    : 'text-rose-400'
              }`}>
                {animatedHealthScore >= 80 ? 'Verified' : animatedHealthScore >= 50 ? 'Warning' : 'Critical'}
              </span>
            </div>
          </div>
        </div>

        {/* OUTDATED PACKAGE INSPECTOR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="outdated-packages-inspector">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-950/40 border border-amber-900/35 px-2.5 py-1 rounded">
                Version Auditor
              </span>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ArrowUpCircle className="w-4 h-4 text-amber-500" />
                <span>Outdated Package Inspector</span>
              </h4>
              <p className="text-xs text-slate-400">
                Audit and upgrade locally installed packages that are behind repository versions.
              </p>
            </div>

            {hasScanned && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetOutdated}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Clear Results
                </button>
              </div>
            )}
          </div>

          {!hasScanned && !isScanning && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 mb-3 text-slate-400">
                <Terminal className="w-5 h-5 text-indigo-400" />
              </div>
              <h5 className="text-xs font-bold text-slate-200">No recent registry scan data</h5>
              <p className="text-[11px] text-slate-500 mt-1 max-w-md leading-relaxed mb-4">
                Execute a simulated local package version audit on {activePlatform === 'windows' ? 'Winget' : activePlatform === 'macos' ? 'Homebrew' : 'APT / Flatpak'} systems.
              </p>
              <button
                onClick={handleScan}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg border border-indigo-500/30 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-950/20"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Scan for Outdated Packages</span>
              </button>
            </div>
          )}

          {isScanning && (
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-850/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-xs font-mono text-indigo-400">Auditing active package database...</span>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">{Math.round(scanProgress)}%</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/50">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>

              {/* Logs */}
              <div className="bg-black/40 border border-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-400 space-y-1 h-32 overflow-y-auto">
                {scanLogs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-indigo-500 shrink-0 select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasScanned && !isScanning && (
            <div className="space-y-4">
              <div className="overflow-x-auto border border-slate-850/60 rounded-xl bg-slate-950/30">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-850 bg-slate-950/80 text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                      <th className="p-3.5 pl-4">Package</th>
                      <th className="p-3.5">Manager</th>
                      <th className="p-3.5">Installed</th>
                      <th className="p-3.5">Latest</th>
                      <th className="p-3.5">Status / Risk</th>
                      <th className="p-3.5 text-right pr-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/50">
                    {getOutdatedPackages().map((pkg) => {
                      const isUpgraded = upgradedIds.includes(pkg.id);
                      const isThisUpgrading = upgradingId === pkg.id;

                      return (
                        <tr key={pkg.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-3.5 pl-4">
                            <div className="font-bold text-slate-200">{pkg.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">{pkg.id}</div>
                          </td>
                          <td className="p-3.5 font-mono text-[11px]">
                            <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded">
                              {pkg.manager}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono">
                            <span className={isUpgraded ? "text-emerald-400 font-semibold" : "text-amber-500 font-semibold"}>
                              {isUpgraded ? pkg.latest : pkg.installed}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-emerald-400">
                            {pkg.latest}
                          </td>
                          <td className="p-3.5">
                            {isUpgraded ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                <Check className="w-3 h-3" />
                                Up to Date
                              </span>
                            ) : (
                              <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                                pkg.severity === 'High' 
                                  ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' 
                                  : pkg.severity === 'Medium' 
                                    ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' 
                                    : 'text-slate-400 bg-slate-500/10 border-slate-500/20'
                              }`}>
                                {pkg.severity} Risk
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-right pr-4">
                            {isUpgraded ? (
                              <button
                                disabled
                                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-900 border border-slate-850 text-slate-500 rounded cursor-not-allowed"
                              >
                                Upgraded
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUpgrade(pkg.id, pkg.name, pkg.cmd)}
                                disabled={!!upgradingId}
                                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border transition-all cursor-pointer ${
                                  !!upgradingId
                                    ? 'bg-slate-900 border-slate-850 text-slate-600 cursor-not-allowed'
                                    : 'bg-indigo-950/50 hover:bg-indigo-900/60 border-indigo-500/20 hover:border-indigo-500/40 text-indigo-400 hover:text-indigo-300'
                                }`}
                              >
                                {isThisUpgrading ? 'Upgrading...' : 'Upgrade'}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Active upgrade terminal simulation */}
              {upgradingId && (
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-850/80 space-y-3" id="active-upgrade-terminal-simulation">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                      <span className="font-mono text-indigo-400">Executing upgrade command in host context...</span>
                    </div>
                    <span className="font-mono text-slate-400 font-bold">{Math.round(upgradeProgress)}%</span>
                  </div>

                  {/* Progressive visual indicator bar */}
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/60 p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-300 rounded-full"
                      style={{ width: `${upgradeProgress}%` }}
                    ></div>
                  </div>

                  <div 
                    id="doctor-upgrade-terminal-logs"
                    className="bg-black/60 border border-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-400 space-y-1 h-32 overflow-y-auto"
                  >
                    {upgradeLogs.map((log, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="text-indigo-500 select-none">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* HARDWARE COMPATIBILITY CHECK */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="hardware-compatibility-inspector">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/40 border border-indigo-900/35 px-2.5 py-1 rounded">
                Hardware Auditor
              </span>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Hardware Compatibility Check</span>
              </h4>
              <p className="text-xs text-slate-400">
                Simulate and audit system specifications for secure packaging, compilations, and virtualization.
              </p>
            </div>

            {hardwareResults[activePlatform] && !isHardwareChecking && (
              <button
                onClick={handleClearHardwareCheck}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                id="btn-reset-hardware"
              >
                Clear Report
              </button>
            )}
          </div>

          {/* 1. NOT CHECKED STATE */}
          {!hardwareResults[activePlatform] && !isHardwareChecking && (
            <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-950/20 rounded-xl border border-dashed border-slate-800/60 p-4">
              <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center border border-slate-850 mb-3 text-slate-400">
                <Sliders className="w-5 h-5 text-indigo-400" />
              </div>
              <h5 className="text-xs font-bold text-slate-200">No hardware audit compiled</h5>
              <p className="text-[11px] text-slate-500 mt-1 max-w-md leading-relaxed mb-4">
                Run a simulated inspection of your local host hardware capabilities including cores, unified memory pools, SSD blocks, security enclaves, and DirectX/Metal pipelines for <strong className="text-indigo-400 capitalize">{activePlatform}</strong>.
              </p>
              <button
                id="btn-run-hardware-check"
                onClick={handleHardwareCheck}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg border border-indigo-500/30 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-950/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Trigger Hardware Compatibility Check</span>
              </button>
            </div>
          )}

          {/* 2. PROGRESS ACTIVE STATE */}
          {isHardwareChecking && (
            <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-850 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">Auditing Host Hardware Architecture...</span>
                    <span className="text-[10px] font-mono text-indigo-400 font-semibold animate-pulse">{hardwareStepText}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2.5 py-0.5 rounded animate-pulse">
                  {hardwareProgress}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-850/60 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${hardwareProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* 3. COMPLETED RESULTS STATE */}
          {hardwareResults[activePlatform] && !isHardwareChecking && (
            <div className="space-y-4">
              {/* Score / Overall Compatibility Banner */}
              {(() => {
                const results = hardwareResults[activePlatform] || [];
                const hasWarnings = results.some(r => r.status === 'warning');
                const hasFails = results.some(r => r.status === 'failed');

                let bannerBg = 'bg-emerald-950/20 border-emerald-500/20';
                let bannerText = 'text-emerald-400';
                let bannerTitle = 'System Fully Compatible';
                let bannerDesc = 'Your system hardware parameters meet or exceed optimal specifications for containerized builds and sandbox compiling.';

                if (hasFails) {
                  bannerBg = 'bg-rose-950/20 border-rose-500/20';
                  bannerText = 'text-rose-400';
                  bannerTitle = 'Hardware Compatibility Failed';
                  bannerDesc = 'Your system has critical hardware constraints that could prevent building large packages.';
                } else if (hasWarnings) {
                  bannerBg = 'bg-amber-950/20 border-amber-500/20';
                  bannerText = 'text-amber-400';
                  bannerTitle = 'System Compatible with Warnings';
                  bannerDesc = 'Your host hardware is compatible, but certain components are operating near minimum recommended constraints.';
                }

                return (
                  <div className={`p-4 rounded-xl border ${bannerBg} flex items-start gap-3`}>
                    {hasFails ? (
                      <ShieldAlert className={`w-5 h-5 ${bannerText} shrink-0 mt-0.5`} />
                    ) : hasWarnings ? (
                      <AlertTriangle className={`w-5 h-5 ${bannerText} shrink-0 mt-0.5`} />
                    ) : (
                      <ShieldCheck className={`w-5 h-5 ${bannerText} shrink-0 mt-0.5`} />
                    )}
                    <div>
                      <h5 className={`text-xs font-bold ${bannerText}`}>{bannerTitle}</h5>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{bannerDesc}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Clean List Layout */}
              <div className="grid grid-cols-1 gap-3" id="hardware-checklist">
                {(hardwareResults[activePlatform] || []).map((item, index) => {
                  const itemIcon = () => {
                    switch (item.iconName) {
                      case 'cpu':
                        return <Cpu className="w-4 h-4 text-indigo-400" />;
                      case 'ram':
                        return <Sliders className="w-4 h-4 text-indigo-400" />;
                      case 'storage':
                        return <HardDrive className="w-4 h-4 text-indigo-400" />;
                      case 'security':
                        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
                      case 'gpu':
                        return <Monitor className="w-4 h-4 text-indigo-400" />;
                    }
                  };

                  return (
                    <div 
                      key={index}
                      className="bg-slate-950/40 border border-slate-850 hover:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl shrink-0 mt-0.5">
                          {itemIcon()}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                            {item.label}
                          </span>
                          <span className="text-xs font-bold text-slate-200 block">
                            {item.value}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center md:justify-end">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider ${
                          item.status === 'passed' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : item.status === 'warning'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {item.status === 'passed' ? 'Optimal' : item.status === 'warning' ? 'Warning' : 'Insufficient'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Automated Integrity Diagnostic Simulator */}
        {isDiagnosing && (
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl space-y-4 animate-fade-in" id="auto-diagnose-progress-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Automated System Health Check Active</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Evaluating: <span className="font-mono text-indigo-400 font-semibold">{currentDiagnoseRule || 'Initializing...'}</span>
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-950/50 border border-indigo-900/35 px-2.5 py-1 rounded">
                {Math.round(diagnoseProgress)}%
              </span>
            </div>

            {/* Visual Progress Bar Component */}
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850/60 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${diagnoseProgress}%` }}
              ></div>
            </div>

            {/* Live diagnostic logger */}
            <div className="bg-black/45 border border-slate-950 rounded-xl p-4 font-mono text-[11px] text-slate-300 space-y-1.5 h-36 overflow-y-auto" id="diagnose-live-logs">
              {diagnoseLogs.map((log, index) => {
                let logClass = 'text-slate-400';
                if (log.startsWith('✔') || log.includes('SUCCESS')) {
                  logClass = 'text-emerald-400 font-semibold';
                } else if (log.startsWith('✖') || log.includes('WARNING')) {
                  logClass = 'text-rose-400 font-semibold';
                } else if (log.startsWith('[Audit]')) {
                  logClass = 'text-indigo-300 font-semibold';
                } else if (log.trim().startsWith('$')) {
                  logClass = 'text-slate-500';
                }
                return (
                  <div key={index} className={`${logClass} whitespace-pre-wrap leading-relaxed`}>
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Diagnostics List */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredRules.map((rule) => {
            const status = checkStatuses[rule.id] || 'pending';

            return (
              <div 
                key={rule.id}
                id={`doctor-rule-${rule.id}`}
                className={`bg-slate-900 border rounded-xl p-5 shadow-md flex flex-col justify-between transition-all duration-200 ${
                  status === 'passed' 
                    ? 'border-emerald-500/30 shadow-emerald-950/5' 
                    : status === 'failed' 
                      ? 'border-rose-500/30 shadow-rose-950/5' 
                      : 'border-slate-800 hover:border-slate-750'
                }`}
              >
                <div>
                  {/* Status header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-850/60 pb-3 mb-3.5">
                    <span className="text-xs font-bold text-slate-200">
                      {rule.title}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        status === 'passed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : status === 'failed' 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                            : 'bg-slate-950 text-slate-500 border border-slate-850'
                      }`}>
                        {status === 'passed' ? 'Active' : status === 'failed' ? 'Failed' : 'Untested'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {rule.description}
                  </p>

                  {/* Commands */}
                  <div className="space-y-3 mb-5">
                    {/* Check Command block */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-slate-500" />
                        <span>Console check command</span>
                      </span>

                      <div className="bg-slate-950 border border-slate-850 p-2 rounded-lg flex items-center justify-between gap-2">
                        <code className="text-xs font-mono text-slate-300 truncate">
                          {rule.checkCommand}
                        </code>
                        <button
                          id={`btn-copy-check-${rule.id}`}
                          onClick={() => handleCopy(rule.checkCommand)}
                          className="p-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-100 rounded border border-slate-800 transition-colors cursor-pointer"
                          title="Copy Check Command"
                        >
                          {copiedText === rule.checkCommand ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remedy command if failed */}
                    {rule.remedyCommand && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <Cpu className="w-3 h-3 text-indigo-400/80" />
                          <span>Remediation installation loop</span>
                        </span>

                        <div className="bg-slate-950 border border-slate-850 p-2 rounded-lg flex items-center justify-between gap-2">
                          <code className="text-xs font-mono text-slate-400 truncate max-w-[240px]">
                            {rule.remedyCommand}
                          </code>
                          <button
                            id={`btn-copy-remedy-${rule.id}`}
                            onClick={() => handleCopy(rule.remedyCommand || '')}
                            className="p-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-100 rounded border border-slate-800 transition-colors cursor-pointer"
                            title="Copy Remediation Command"
                          >
                            {copiedText === rule.remedyCommand ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Trigger Action buttons */}
                <div className="flex items-center gap-2 pt-3.5 border-t border-slate-850/60 mt-auto">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mr-auto">
                    Does check succeed?
                  </span>
                  
                  <button
                    id={`btn-rule-pass-${rule.id}`}
                    onClick={() => handleSetStatus(rule.id, 'passed')}
                    className={`flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border cursor-pointer ${
                      status === 'passed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-950 text-slate-400 border-slate-850 hover:bg-slate-850 hover:text-slate-200'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Passed
                  </button>

                  <button
                    id={`btn-rule-fail-${rule.id}`}
                    onClick={() => handleSetStatus(rule.id, 'failed')}
                    className={`flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border cursor-pointer ${
                      status === 'failed'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-slate-950 text-slate-400 border-slate-850 hover:bg-slate-850 hover:text-slate-200'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Failed
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Installation & Upgrade History */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="installation-history-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/40 border border-indigo-900/35 px-2.5 py-1 rounded">
              Activity Logger
            </span>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              <span>Installation & Upgrade History</span>
            </h4>
            <p className="text-xs text-slate-400">
              Audit trails and timestamps of packages installed or upgraded through this workspace.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="px-3 py-1.5 bg-rose-950/30 hover:bg-rose-950/50 text-rose-400 hover:text-rose-300 border border-rose-900/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              id="btn-clear-history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8 bg-slate-950/40 rounded-xl border border-slate-850/60 flex flex-col items-center justify-center p-4">
            <Clock className="w-8 h-8 text-slate-600 mb-2.5" />
            <span className="text-xs font-semibold text-slate-400">No activity logged yet</span>
            <p className="text-[11px] text-slate-500 max-w-sm mt-1">
              Trigger a <strong className="text-slate-400">Bulk Install</strong> in the Script Builder, or upgrade an outdated package above to see your installation history.
            </p>
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1" id="history-items-list">
            {history.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-950/50 border border-slate-850/80 hover:border-slate-800 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all"
              >
                <div className="flex items-center gap-3">
                  {/* Badge representing Type of install */}
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    item.type === 'upgrade' 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                      : item.type === 'bulk_install'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : item.type === 'diagnostic'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {item.type === 'upgrade' 
                      ? 'Upgrade' 
                      : item.type === 'bulk_install' 
                        ? 'Bulk Deploy' 
                        : item.type === 'diagnostic'
                          ? 'Diagnostic'
                          : 'Hardware'}
                  </span>

                  <div>
                    <span className="font-bold text-slate-200 block sm:inline mr-2">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 capitalize bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                      {item.platform}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 shrink-0 ml-auto sm:ml-0">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    item.status === 'failed'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {item.status === 'failed' ? 'Failed' : 'Success'}
                  </span>

                  <div className="flex items-center gap-1.5 text-slate-400 font-medium font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Troubleshooting guide */}
      <div className="bg-slate-900/40 border border-dashed border-slate-800 p-5 rounded-2xl flex items-start gap-3 text-slate-400 text-xs">
        <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <span className="font-bold text-slate-300 block">General Multi-Platform Permission Guidelines</span>
          <p className="leading-relaxed">
            Many freeware installers and tool compiles operate on standard operating systems. On **Windows**, make sure you open the PowerShell terminal by right-clicking and choosing **Run as Administrator**. On **macOS** and **Linux**, install commands are prefixed with `sudo` where required. This grants standard system file write clearances to build folders like `/usr/local/bin` and program directory environments.
          </p>
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      {showConfirmClear && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" 
          id="confirm-clear-history-modal"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 relative">
            <button 
              onClick={() => setShowConfirmClear(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors p-1 hover:bg-slate-800/50 rounded-lg"
              id="close-clear-history-modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">Confirm Clear History</h4>
                <p className="text-xs text-slate-400">This action cannot be undone.</p>
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed space-y-2">
              <p>
                Are you absolutely sure you want to reset the session activity log? This will erase all audit trails, diagnostic records, and reset your <strong>System Health Score</strong> calculation back to <strong>100%</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                id="btn-cancel-clear-history"
              >
                Cancel
              </button>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg border border-rose-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-rose-950/20"
                id="btn-confirm-clear-history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
