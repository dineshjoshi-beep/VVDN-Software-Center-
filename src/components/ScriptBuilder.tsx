import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  Sparkles, 
  HelpCircle, 
  Laptop,
  CheckSquare,
  Square,
  Play,
  FileCode
} from 'lucide-react';
import { Package, Platform, PackageManager } from '../types';

interface ScriptBuilderProps {
  selectedPackages: Package[];
  onRemovePackage: (id: string) => void;
  onClearStack: () => void;
  onAddBulkPackages: (pkgs: Package[]) => void;
  allCuratedPackages: Package[];
  onRemoveMultiplePackages?: (ids: string[]) => void;
  onNotify?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ScriptBuilder: React.FC<ScriptBuilderProps> = ({
  selectedPackages,
  onRemovePackage,
  onClearStack,
  onAddBulkPackages,
  allCuratedPackages,
  onRemoveMultiplePackages,
  onNotify
}) => {
  const [targetPlatform, setTargetPlatform] = useState<Platform>('windows');
  const [preferredManager, setPreferredManager] = useState<PackageManager>('winget');
  const [windowsScriptFormat, setWindowsScriptFormat] = useState<'bat' | 'ps1'>('bat');
  const [customScriptName, setCustomScriptName] = useState<string>('bootstrap_packages');
  const [exportedRecently, setExportedRecently] = useState<boolean>(false);

  const compatiblePkgs = selectedPackages.filter(p => p.platforms.includes(targetPlatform));
  const activeExtension = targetPlatform === 'windows' ? windowsScriptFormat : 'sh';
  
  // Custom Toggles
  const [bootstrapManager, setBootstrapManager] = useState(true);
  const [preFlightUpdates, setPreFlightUpdates] = useState(true);
  const [silentInstall, setSilentInstall] = useState(true);
  const [groupInstalls, setGroupInstalls] = useState(true);

  const [generatedScript, setGeneratedScript] = useState('');
  const [copied, setCopied] = useState(false);

  // Bulk Install states
  const [isInstalling, setIsInstalling] = useState(false);
  const [installationComplete, setInstallationComplete] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installLogs, setInstallLogs] = useState<string[]>([]);
  const [currentPackageIdx, setCurrentPackageIdx] = useState(-1);
  const [activeTimeouts, setActiveTimeouts] = useState<number[]>([]);

  // Selection states for batch operations
  const [checkedPackageIds, setCheckedPackageIds] = useState<string[]>([]);

  // Synchronize checkedPackageIds when selectedPackages changes
  useEffect(() => {
    const validIds = selectedPackages.map(p => p.id);
    setCheckedPackageIds(prev => prev.filter(id => validIds.includes(id)));
  }, [selectedPackages]);

  const handleToggleSelectAll = () => {
    if (selectedPackages.length === 0) return;
    if (checkedPackageIds.length === selectedPackages.length) {
      setCheckedPackageIds([]);
    } else {
      setCheckedPackageIds(selectedPackages.map(p => p.id));
    }
  };

  const handleToggleCheck = (pkgId: string) => {
    setCheckedPackageIds(prev => 
      prev.includes(pkgId) 
        ? prev.filter(id => id !== pkgId) 
        : [...prev, pkgId]
    );
  };

  const handleBatchRemove = () => {
    if (checkedPackageIds.length === 0) return;
    if (onRemoveMultiplePackages) {
      onRemoveMultiplePackages(checkedPackageIds);
    } else {
      checkedPackageIds.forEach(id => onRemovePackage(id));
    }
    setCheckedPackageIds([]);
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      activeTimeouts.forEach(clearTimeout);
    };
  }, [activeTimeouts]);

  // Auto scroll terminal logs
  useEffect(() => {
    if (isInstalling) {
      const container = document.getElementById('install-terminal-logs');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [installLogs, isInstalling]);

  // Sync available managers with active target platforms
  useEffect(() => {
    if (targetPlatform === 'windows') {
      setPreferredManager('winget');
    } else if (targetPlatform === 'macos') {
      setPreferredManager('brew');
    } else if (targetPlatform === 'linux') {
      setPreferredManager('apt');
    }
  }, [targetPlatform]);

  // Regenerate script dynamically when options or packages change
  useEffect(() => {
    compileScript();
  }, [selectedPackages, targetPlatform, preferredManager, windowsScriptFormat, bootstrapManager, preFlightUpdates, silentInstall, groupInstalls]);

  const buildScriptForTarget = (plat: Platform, manager: PackageManager, winFormat: 'bat' | 'ps1'): string => {
    const platPkgs = selectedPackages.filter(p => p.platforms.includes(plat));
    const dateStr = new Date().toISOString().split('T')[0];
    let scriptLines: string[] = [];

    if (plat === 'windows' && winFormat === 'bat') {
      // Windows Batch (.bat) Installer Script Generation
      scriptLines.push('@echo off');
      scriptLines.push('REM ==============================================================================');
      scriptLines.push('REM   UNIFIED SOFTWARE CENTER - AGGREGATED BOOTSTRAP INSTALLER (.BAT)');
      scriptLines.push(`REM   Target OS: Windows (${manager.toUpperCase()})`);
      scriptLines.push(`REM   Packages in Stack: ${platPkgs.length} compatible package(s)`);
      scriptLines.push(`REM   Generated: ${dateStr} UTC`);
      scriptLines.push('REM   Usage: Right-click and select "Run as administrator"');
      scriptLines.push('REM ==============================================================================');
      if (platPkgs.length > 0) {
        scriptLines.push(`REM   Included Packages: ${platPkgs.map(p => p.name).join(', ')}`);
        scriptLines.push('REM ==============================================================================');
      }
      scriptLines.push('title OmniPkg Bootstrap Stack Installer');
      scriptLines.push('echo.');

      // 1. Admin check
      scriptLines.push('REM 1. Verify Administrative Elevation');
      scriptLines.push('net session >nul 2>&1');
      scriptLines.push('if %errorLevel% neq 0 (');
      scriptLines.push('    echo [WARNING] Not running as Administrator. Some installers may prompt for elevation.');
      scriptLines.push(') else (');
      scriptLines.push('    echo [OK] Administrative privileges verified.');
      scriptLines.push(')');
      scriptLines.push('echo.');

      // 2. Package Manager check
      if (bootstrapManager) {
        scriptLines.push(`REM 2. Verify Package Manager (${manager})`);
        if (manager === 'winget') {
          scriptLines.push('where winget >nul 2>&1');
          scriptLines.push('if %errorLevel% neq 0 (');
          scriptLines.push('    echo [INFO] Winget CLI not found. Registering Microsoft.DesktopAppInstaller...');
          scriptLines.push('    powershell -NoProfile -ExecutionPolicy Bypass -Command "Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.DesktopAppInstaller_8wekyb3d8bbwe"');
          scriptLines.push(') else (');
          scriptLines.push('    echo [OK] Winget CLI is active.');
          scriptLines.push(')');
        } else if (manager === 'choco') {
          scriptLines.push('where choco >nul 2>&1');
          scriptLines.push('if %errorLevel% neq 0 (');
          scriptLines.push('    echo [INFO] Installing Chocolatey Package Manager...');
          scriptLines.push('    powershell -NoProfile -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://community.chocolatey.org/install.ps1\'))"');
          scriptLines.push(') else (');
          scriptLines.push('    echo [OK] Chocolatey CLI is active.');
          scriptLines.push(')');
        }
        scriptLines.push('echo.');
      }

      // 3. Pre-flight updates
      if (preFlightUpdates) {
        scriptLines.push('REM 3. Sync Package Source Catalogs');
        if (manager === 'winget') {
          scriptLines.push('echo Updating Winget source catalogs...');
          scriptLines.push('winget source update');
        } else if (manager === 'choco') {
          scriptLines.push('echo Checking Chocolatey sources...');
          scriptLines.push('choco sources list');
        }
        scriptLines.push('echo.');
      }

      // 4. Aggregated Package Installations
      scriptLines.push('REM 4. Execute Aggregated Package Installations');
      if (platPkgs.length === 0) {
        scriptLines.push('echo No compatible Windows packages in the current stack.');
      } else {
        const resolved = platPkgs.map(p => {
          const cmdObj = p.commands.windows?.find(c => c.manager === manager) || p.commands.windows?.[0];
          return cmdObj ? { pkg: p, cmdObj } : null;
        }).filter(Boolean) as { pkg: Package; cmdObj: NonNullable<Package['commands']['windows']>[0] }[];

        if (groupInstalls && manager === 'choco' && resolved.every(r => r.cmdObj.manager === 'choco')) {
          const joinedIds = resolved.map(r => r.cmdObj.packageId).join(' ');
          const silentFlag = silentInstall ? ' -y' : '';
          scriptLines.push(`echo Installing ${resolved.length} packages via Chocolatey...`);
          scriptLines.push(`choco install ${joinedIds}${silentFlag}`);
        } else {
          resolved.forEach((item, idx) => {
            scriptLines.push(`echo [${idx + 1}/${resolved.length}] Installing ${item.pkg.name} (${item.cmdObj.packageId})...`);
            let finalCmd = item.cmdObj.installCmd;
            if (silentInstall && item.cmdObj.manager === 'winget' && !finalCmd.includes('--silent')) {
              finalCmd += ' --silent --accept-source-agreements --accept-package-agreements';
            }
            scriptLines.push(finalCmd);
            scriptLines.push('echo.');
          });
        }
      }

      scriptLines.push('echo =======================================================');
      scriptLines.push('echo   Windows Batch Stack Installation Completed!');
      scriptLines.push('echo =======================================================');
      scriptLines.push('pause');
      return scriptLines.join('\r\n');
    }

    if (plat === 'windows') {
      // PowerShell (.ps1) Script Generation
      scriptLines.push('# ==============================================================================');
      scriptLines.push('#   UNIFIED SOFTWARE CENTER - BOOTSTRAP INSTALLER SCRIPT (.PS1)');
      scriptLines.push(`#   Target OS: Windows (${manager.toUpperCase()})`);
      scriptLines.push(`#   Packages in Stack: ${platPkgs.length} compatible package(s)`);
      scriptLines.push(`#   Generated: ${dateStr} UTC`);
      scriptLines.push('#   Warning: Run this script inside an Elevated Administrator PowerShell Console.');
      scriptLines.push('# ==============================================================================');
      if (platPkgs.length > 0) {
        scriptLines.push(`#   Included Packages: ${platPkgs.map(p => p.name).join(', ')}`);
        scriptLines.push('# ==============================================================================');
      }
      scriptLines.push('');

      // Admin check
      scriptLines.push('# 1. Verify Administrative Elevate Privileges');
      scriptLines.push('if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {');
      scriptLines.push('    Write-Warning "This installer requires Administrator privileges. Relaunching in administrative mode..."');
      scriptLines.push('    Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs');
      scriptLines.push('    Exit');
      scriptLines.push('}');
      scriptLines.push('Write-Host "Success: Running with Administrative Elevation." -ForegroundColor Green');
      scriptLines.push('');

      // Package Manager Bootstrapping
      if (bootstrapManager) {
        scriptLines.push(`# 2. Configure & Verify Package Manager (${manager})`);
        if (manager === 'winget') {
          scriptLines.push('if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {');
          scriptLines.push('    Write-Host "Winget is missing. Setting up Microsoft.DesktopAppInstaller..." -ForegroundColor Cyan');
          scriptLines.push('    Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.DesktopAppInstaller_8wekyb3d8bbwe');
          scriptLines.push('} else {');
          scriptLines.push('    Write-Host "Winget CLI is already active on this system." -ForegroundColor Gray');
          scriptLines.push('}');
        } else if (manager === 'choco') {
          scriptLines.push('if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {');
          scriptLines.push('    Write-Host "Installing Chocolatey Package Manager..." -ForegroundColor Cyan');
          scriptLines.push('    Set-ExecutionPolicy Bypass -Scope Process -Force');
          scriptLines.push('    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072');
          scriptLines.push('    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString(\'https://community.chocolatey.org/install.ps1\'))');
          scriptLines.push('} else {');
          scriptLines.push('    Write-Host "Chocolatey CLI is already active." -ForegroundColor Gray');
          scriptLines.push('}');
        }
        scriptLines.push('');
      }

      // Catalog Updates
      if (preFlightUpdates) {
        scriptLines.push('# 3. Sync Database & Source Catalogs');
        if (manager === 'winget') {
          scriptLines.push('Write-Host "Updating Winget Source Catalogs..." -ForegroundColor Cyan');
          scriptLines.push('winget source update');
        } else if (manager === 'choco') {
          scriptLines.push('Write-Host "Verifying Chocolatey catalog integrity..." -ForegroundColor Cyan');
          scriptLines.push('choco sources list');
        }
        scriptLines.push('');
      }

      // Packages list
      scriptLines.push('# 4. Trigger Packages Installation Sequence');
      if (platPkgs.length === 0) {
        scriptLines.push('Write-Warning "No packages are configured for Windows platform in this build."');
      } else {
        const resolved = platPkgs.map(p => {
          const cmdObj = p.commands.windows?.find(c => c.manager === manager) || p.commands.windows?.[0];
          return cmdObj ? { pkg: p, cmdObj } : null;
        }).filter(Boolean) as { pkg: Package; cmdObj: NonNullable<Package['commands']['windows']>[0] }[];

        if (resolved.length === 0) {
          scriptLines.push('# No matching packages supported on Windows.');
        } else if (groupInstalls && manager === 'winget' && resolved.every(r => r.cmdObj.manager === 'winget')) {
          scriptLines.push('$packages = @(');
          resolved.forEach(r => scriptLines.push(`    "${r.cmdObj.packageId}"`));
          scriptLines.push(')');
          scriptLines.push('');
          scriptLines.push('foreach ($pkg in $packages) {');
          scriptLines.push('    Write-Host "Installing: $pkg..." -ForegroundColor Yellow');
          const silentFlag = silentInstall ? ' --silent --accept-source-agreements --accept-package-agreements' : '';
          scriptLines.push(`    winget install --id $pkg -e${silentFlag}`);
          scriptLines.push('}');
        } else if (groupInstalls && manager === 'choco' && resolved.every(r => r.cmdObj.manager === 'choco')) {
          const joinedIds = resolved.map(r => r.cmdObj.packageId).join(' ');
          const silentFlag = silentInstall ? ' -y' : '';
          scriptLines.push(`Write-Host "Triggering bulk Chocolatey installation for: ${joinedIds}" -ForegroundColor Yellow`);
          scriptLines.push(`choco install ${joinedIds}${silentFlag}`);
        } else {
          resolved.forEach(item => {
            scriptLines.push(`Write-Host "Installing ${item.pkg.name}..." -ForegroundColor Yellow`);
            let finalCmd = item.cmdObj.installCmd;
            if (silentInstall && item.cmdObj.manager === 'winget' && !finalCmd.includes('--silent')) {
              finalCmd += ' --silent --accept-source-agreements --accept-package-agreements';
            }
            scriptLines.push(finalCmd);
          });
        }
      }
      scriptLines.push('');
      scriptLines.push('Write-Host "=======================================================" -ForegroundColor Green');
      scriptLines.push('Write-Host " Bootstrap Script finished successfully!" -ForegroundColor Green');
      scriptLines.push('Write-Host "=======================================================" -ForegroundColor Green');
      return scriptLines.join('\n');
    }

    if (plat === 'macos') {
      // macOS bash/zsh script (.sh)
      scriptLines.push('#!/bin/bash');
      scriptLines.push('# ==============================================================================');
      scriptLines.push('#   UNIFIED SOFTWARE CENTER - AGGREGATED BOOTSTRAP INSTALLER (.SH)');
      scriptLines.push('#   Target OS: macOS (Homebrew)');
      scriptLines.push(`#   Packages in Stack: ${platPkgs.length} compatible package(s)`);
      scriptLines.push(`#   Generated: ${dateStr} UTC`);
      scriptLines.push('# ==============================================================================');
      if (platPkgs.length > 0) {
        scriptLines.push(`#   Included Packages: ${platPkgs.map(p => p.name).join(', ')}`);
        scriptLines.push('# ==============================================================================');
      }
      scriptLines.push('');

      // Brew check
      if (bootstrapManager) {
        scriptLines.push('# 1. Check for Homebrew installation');
        scriptLines.push('if ! command -v brew &> /dev/null; then');
        scriptLines.push('    echo "Homebrew not found. Initiating official installation..."');
        scriptLines.push('    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"');
        scriptLines.push('    if [ -f /opt/homebrew/bin/brew ]; then');
        scriptLines.push('        eval "$(/opt/homebrew/bin/brew shellenv)"');
        scriptLines.push('    elif [ -f /usr/local/bin/brew ]; then');
        scriptLines.push('        eval "$(/usr/local/bin/brew shellenv)"');
        scriptLines.push('    fi');
        scriptLines.push('else');
        scriptLines.push('    echo "Homebrew is already installed."');
        scriptLines.push('fi');
        scriptLines.push('');
      }

      // Brew update
      if (preFlightUpdates) {
        scriptLines.push('# 2. Sync Package Catalogs');
        scriptLines.push('echo "Updating Homebrew Formulae Database..."');
        scriptLines.push('brew update');
        scriptLines.push('');
      }

      // Installs
      scriptLines.push('# 3. Execute Aggregated Package Installations');
      if (platPkgs.length === 0) {
        scriptLines.push('echo "No macOS packages configured."');
      } else {
        const casks: string[] = [];
        const formulae: string[] = [];

        platPkgs.forEach(p => {
          const cmdObj = p.commands.macos?.find(c => c.manager === 'brew') || p.commands.macos?.[0];
          if (cmdObj) {
            if (cmdObj.installCmd.includes('--cask')) {
              casks.push(cmdObj.packageId);
            } else {
              formulae.push(cmdObj.packageId);
            }
          }
        });

        if (groupInstalls) {
          if (formulae.length > 0) {
            scriptLines.push(`echo "Installing Homebrew Formulae: ${formulae.join(', ')}..."`);
            scriptLines.push(`brew install ${formulae.join(' ')}`);
          }
          if (casks.length > 0) {
            scriptLines.push(`echo "Installing Homebrew Casks (GUI Apps): ${casks.join(', ')}..."`);
            scriptLines.push(`brew install --cask ${casks.join(' ')}`);
          }
        } else {
          platPkgs.forEach((p, idx) => {
            const cmdObj = p.commands.macos?.find(c => c.manager === 'brew') || p.commands.macos?.[0];
            if (cmdObj) {
              scriptLines.push(`echo "[${idx + 1}/${platPkgs.length}] Installing ${p.name}..."`);
              scriptLines.push(cmdObj.installCmd);
            }
          });
        }
      }
      scriptLines.push('');
      scriptLines.push('echo "======================================================="');
      scriptLines.push('echo "  macOS Bootstrap Completed successfully!"');
      scriptLines.push('echo "======================================================="');
      return scriptLines.join('\n');
    }

    // Linux bash script (.sh)
    scriptLines.push('#!/bin/bash');
    scriptLines.push('# ==============================================================================');
    scriptLines.push('#   UNIFIED SOFTWARE CENTER - AGGREGATED BOOTSTRAP INSTALLER (.SH)');
    scriptLines.push(`#   Target OS: Linux (${manager.toUpperCase()})`);
    scriptLines.push(`#   Packages in Stack: ${platPkgs.length} compatible package(s)`);
    scriptLines.push(`#   Generated: ${dateStr} UTC`);
    scriptLines.push('# ==============================================================================');
    if (platPkgs.length > 0) {
      scriptLines.push(`#   Included Packages: ${platPkgs.map(p => p.name).join(', ')}`);
      scriptLines.push('# ==============================================================================');
    }
    scriptLines.push('');

    // Sudo check
    scriptLines.push('# 1. Check for Sudo / Root privileges');
    scriptLines.push('if [ "$EUID" -ne 0 ]; then');
    scriptLines.push('  echo "Note: Some package installations may prompt for sudo authentication."');
    scriptLines.push('fi');
    scriptLines.push('');

    // Package manager verify
    if (bootstrapManager) {
      scriptLines.push(`# 2. Configure package sandbox engine (${manager})`);
      if (manager === 'flatpak') {
        scriptLines.push('if ! command -v flatpak &> /dev/null; then');
        scriptLines.push('  echo "Flatpak not found. Setting up Flatpak runtime and flathub registry..."');
        scriptLines.push('  sudo apt-get update && sudo apt-get install -y flatpak');
        scriptLines.push('  flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo');
        scriptLines.push('else');
        scriptLines.push('  echo "Flatpak is already configured."');
        scriptLines.push('fi');
      } else if (manager === 'snap') {
        scriptLines.push('if ! command -v snap &> /dev/null; then');
        scriptLines.push('  echo "Snap daemon not found. Setting up snapd engine..."');
        scriptLines.push('  sudo apt-get update && sudo apt-get install -y snapd');
        scriptLines.push('else');
        scriptLines.push('  echo "Snap daemon is already configured."');
        scriptLines.push('fi');
      } else {
        scriptLines.push('echo "Using native APT package manager."');
      }
      scriptLines.push('');
    }

    // Catalog Updates
    if (preFlightUpdates && manager === 'apt') {
      scriptLines.push('# 3. APT Catalog Database sync');
      scriptLines.push('echo "Running sudo apt-get update..."');
      scriptLines.push('sudo apt-get update');
      scriptLines.push('');
    }

    // Installations with smart fallback across apt/flatpak/snap
    scriptLines.push('# 4. Execute Aggregated Package Installations');
    if (platPkgs.length === 0) {
      scriptLines.push('echo "No Linux packages configured."');
    } else {
      const resolved = platPkgs.map(p => {
        const cmdObj = p.commands.linux?.find(c => c.manager === manager) || p.commands.linux?.[0];
        return cmdObj ? { pkg: p, cmdObj } : null;
      }).filter(Boolean) as { pkg: Package; cmdObj: NonNullable<Package['commands']['linux']>[0] }[];

      if (resolved.length === 0) {
        scriptLines.push('# No matching packages supported on Linux.');
      } else if (groupInstalls && resolved.every(r => r.cmdObj.manager === manager)) {
        const ids = resolved.map(r => r.cmdObj.packageId);
        if (manager === 'apt') {
          const silentFlag = silentInstall ? ' -y' : '';
          scriptLines.push(`echo "Installing Debian packages: ${ids.join(', ')}..."`);
          scriptLines.push(`sudo apt-get install${silentFlag} ${ids.join(' ')}`);
        } else if (manager === 'flatpak') {
          const silentFlag = silentInstall ? ' -y' : '';
          scriptLines.push(`echo "Installing Flatpaks: ${ids.join(', ')}..."`);
          scriptLines.push(`flatpak install flathub ${ids.join(' ')}${silentFlag}`);
        } else {
          resolved.forEach(r => {
            scriptLines.push(`echo "Installing ${r.pkg.name}..."`);
            scriptLines.push(r.cmdObj.installCmd);
          });
        }
      } else {
        resolved.forEach((item, idx) => {
          scriptLines.push(`echo "[${idx + 1}/${resolved.length}] Installing ${item.pkg.name} (${item.cmdObj.manager})..."`);
          let finalCmd = item.cmdObj.installCmd;
          if (silentInstall && item.cmdObj.manager === 'apt' && !finalCmd.includes('-y')) {
            finalCmd = finalCmd.replace('install', 'install -y');
          }
          scriptLines.push(finalCmd);
        });
      }
    }
    scriptLines.push('');
    scriptLines.push('echo "======================================================="');
    scriptLines.push('echo "  Linux Bootstrap script completed successfully!"');
    scriptLines.push('echo "======================================================="');
    return scriptLines.join('\n');
  };

  const compileScript = () => {
    if (selectedPackages.length === 0) {
      setGeneratedScript('');
      return;
    }
    const content = buildScriptForTarget(targetPlatform, preferredManager, windowsScriptFormat);
    setGeneratedScript(content);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    if (onNotify) {
      onNotify(`Copied .${activeExtension} script to clipboard`, 'info');
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const getCleanBaseName = () => {
    const cleaned = customScriptName.trim().replace(/\.(bat|ps1|sh)$/i, '');
    return cleaned || 'bootstrap_packages';
  };

  const handleDownloadScript = (overridePlatform?: Platform, overrideWinFormat?: 'bat' | 'ps1') => {
    const plat = overridePlatform || targetPlatform;
    const winFmt = overrideWinFormat || windowsScriptFormat;
    const ext = plat === 'windows' ? winFmt : 'sh';
    const mgr: PackageManager = plat === targetPlatform
      ? preferredManager
      : plat === 'windows'
        ? 'winget'
        : plat === 'macos'
          ? 'brew'
          : 'apt';

    const scriptContent = (plat === targetPlatform && winFmt === windowsScriptFormat)
      ? generatedScript
      : buildScriptForTarget(plat, mgr, winFmt);

    const filename = `${getCleanBaseName()}.${ext}`;
    const mimeType = ext === 'sh' ? 'text/x-shellscript' : 'text/plain';

    const blob = new Blob([scriptContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportedRecently(true);
    setTimeout(() => setExportedRecently(false), 2200);
    if (onNotify) {
      const count = selectedPackages.filter(p => p.platforms.includes(plat)).length;
      onNotify(`Exported ${filename} with ${count} aggregated package command(s)`, 'success');
    }
  };

  const handleBulkInstall = () => {
    if (selectedPackages.length === 0) return;
    
    const compatiblePkgs = selectedPackages.filter(p => p.platforms.includes(targetPlatform));
    if (compatiblePkgs.length === 0) {
      if (onNotify) {
        onNotify(`No compatible packages in the stack for ${targetPlatform}!`, 'warning');
      }
      return;
    }

    setIsInstalling(true);
    setInstallationComplete(false);
    setInstallProgress(0);
    setInstallLogs([]);
    setCurrentPackageIdx(-1);

    const logs: string[] = [];
    const addLog = (text: string) => {
      logs.push(text);
      setInstallLogs([...logs]);
    };

    // Build the script sequence of events
    const tIds: number[] = [];
    let currentTime = 0;

    const scheduleEvent = (fn: () => void, delay: number) => {
      currentTime += delay;
      const timeoutId = window.setTimeout(fn, currentTime);
      tIds.push(timeoutId);
    };

    scheduleEvent(() => addLog(`$ bootstrap_install_init --platform=${targetPlatform} --manager=${preferredManager}`), 0);
    scheduleEvent(() => addLog("Initializing bulk installation daemon..."), 450);
    scheduleEvent(() => addLog("Checking administrative elevation privileges..."), 450);
    scheduleEvent(() => addLog("Success: Elevation verified (Role: Administrator/sudo)"), 500);
    
    if (bootstrapManager) {
      scheduleEvent(() => addLog(`Verifying package manager [${preferredManager}] presence...`), 400);
      scheduleEvent(() => addLog(`Package manager [${preferredManager}] is active and verified.`), 400);
    }

    if (preFlightUpdates) {
      scheduleEvent(() => addLog(`Syncing database & source catalogs for ${preferredManager}...`), 500);
      scheduleEvent(() => addLog(`Source catalogs successfully refreshed.`), 800);
    }

    scheduleEvent(() => addLog(`Found ${compatiblePkgs.length} compatible package(s) to process.`), 400);

    // Loop through each package
    compatiblePkgs.forEach((pkg, index) => {
      scheduleEvent(() => {
        setCurrentPackageIdx(index);
        addLog(`\n[${index + 1}/${compatiblePkgs.length}] Preparing installation for: ${pkg.name}...`);
        setInstallProgress((index / compatiblePkgs.length) * 100);
      }, 500);

      const cmdObj = pkg.commands[targetPlatform]?.find((c: any) => c.manager === preferredManager) 
                     || pkg.commands[targetPlatform]?.[0];
      const cmdStr = cmdObj ? cmdObj.installCmd : `install ${pkg.id}`;

      scheduleEvent(() => addLog(`Running: ${cmdStr}`), 400);
      scheduleEvent(() => addLog(`Downloading binaries from repository...`), 500);
      scheduleEvent(() => addLog(`Extracting package contents & registers...`), 600);
      scheduleEvent(() => {
        addLog(`Successfully registered and installed ${pkg.name}.`);
        try {
          const newEntry = {
            id: Math.random().toString(36).substring(2, 9),
            pkgId: pkg.id,
            name: pkg.name,
            timestamp: new Date().toLocaleString(),
            type: 'bulk_install',
            platform: targetPlatform
          };
          const savedHistory = localStorage.getItem('omnipkg_install_history');
          const history = savedHistory ? JSON.parse(savedHistory) : [];
          localStorage.setItem('omnipkg_install_history', JSON.stringify([newEntry, ...history]));
        } catch (e) {
          console.error('Failed to write history:', e);
        }
      }, 500);
    });

    scheduleEvent(() => {
      setCurrentPackageIdx(compatiblePkgs.length);
      setInstallProgress(100);
      addLog(`\n======================================================`);
      addLog(`BULK BOOTSTRAP INSTALLATION COMPLETED SUCCESSFULLY!`);
      addLog(`======================================================`);
      addLog(`🚀 ${compatiblePkgs.length} packages are now deployed and verified.`);
      setInstallationComplete(true);
    }, 800);

    setActiveTimeouts(tIds);
  };

  // Pre-configured Stack Profiles
  const profiles = [
    {
      name: 'Full-Stack Developer Starter',
      description: 'Pre-configures standard developer runtimes (VS Code, Git, Node.js, Python, Docker).',
      tags: ['VS Code', 'Git', 'Node.js', 'Python', 'Docker'],
      pkgIds: ['vscode', 'git', 'nodejs', 'python', 'docker']
    },
    {
      name: 'Office & Document Essentials',
      description: 'Standard office & document workflow with Adobe Acrobat Reader, LibreOffice, Notion, and 7-Zip.',
      tags: ['Adobe Acrobat', 'LibreOffice', 'Notion', '7-Zip'],
      pkgIds: ['adobe-acrobat-reader', 'libreoffice', 'notion', '7zip']
    },
    {
      name: 'Everyday Freeware Essentials',
      description: 'Popular daily-driver freeware suite including Chrome, Discord, Spotify, PowerToys, Everything, and Rufus.',
      tags: ['Chrome', 'Discord', 'Spotify', 'PowerToys', 'Everything', 'Rufus'],
      pkgIds: ['chrome', 'discord', 'spotify', 'powertoys', 'everything', 'rufus']
    },
    {
      name: 'Designer & Multimedia Suit',
      description: 'Curates rich creative software tools (GIMP, Blender, Inkscape, VLC, OBS Studio).',
      tags: ['GIMP', 'Blender', 'Inkscape', 'VLC', 'OBS'],
      pkgIds: ['gimp', 'blender', 'inkscape', 'vlc', 'obs-studio']
    },
    {
      name: 'Power Administrator & Utilities',
      description: 'Bundles terminal tools, credential safes, and file explorers (Neovim, Bitwarden, 7-Zip, fzf).',
      tags: ['Neovim', 'Bitwarden', '7-Zip', 'fzf'],
      pkgIds: ['neovim', 'bitwarden', '7zip', 'fzf']
    }
  ];

  const applyProfile = (pkgIds: string[]) => {
    const selected = allCuratedPackages.filter(p => pkgIds.includes(p.id));
    onAddBulkPackages(selected);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="script-builder-section">
      {/* Configuration Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-850 pb-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-indigo-400" />
              <span>Bootstrap Stack Configurator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select your destination host parameters to build the deployment shell.
            </p>
          </div>

          {/* Step 1: Destination OS */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
              1. Destination Operating System
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['windows', 'macos', 'linux'] as Platform[]).map((plat) => (
                <button
                  key={plat}
                  id={`config-plat-${plat}`}
                  onClick={() => setTargetPlatform(plat)}
                  className={`py-2 px-3 text-xs font-bold capitalize rounded-xl border transition-all duration-150 cursor-pointer ${
                    targetPlatform === plat
                      ? plat === 'windows'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-cyan-950/20'
                        : plat === 'macos'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-amber-950/20'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/40 shadow-purple-950/20'
                      : 'bg-slate-950 text-slate-500 border-slate-850 hover:border-slate-800 hover:text-slate-350'
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Preferred Package Manager */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
              2. Preferred Package Manager
            </label>
            <div className="grid grid-cols-2 gap-2">
              {targetPlatform === 'windows' && (
                <>
                  <button
                    onClick={() => setPreferredManager('winget')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      preferredManager === 'winget'
                        ? 'bg-slate-850 text-cyan-400 border-cyan-500/30'
                        : 'bg-slate-950 text-slate-500 border-slate-855 hover:text-slate-300'
                    }`}
                  >
                    Windows Winget CLI
                  </button>
                  <button
                    onClick={() => setPreferredManager('choco')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      preferredManager === 'choco'
                        ? 'bg-slate-850 text-yellow-500 border-yellow-500/30'
                        : 'bg-slate-950 text-slate-500 border-slate-855 hover:text-slate-300'
                    }`}
                  >
                    Chocolatey CLI
                  </button>
                </>
              )}
              {targetPlatform === 'macos' && (
                <button
                  onClick={() => setPreferredManager('brew')}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg border bg-slate-850 text-amber-400 border-amber-500/30 text-center"
                >
                  Homebrew (Brew CLI)
                </button>
              )}
              {targetPlatform === 'linux' && (
                <div className="col-span-2 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPreferredManager('apt')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      preferredManager === 'apt'
                        ? 'bg-slate-850 text-red-400 border-red-500/30'
                        : 'bg-slate-950 text-slate-500 border-slate-855 hover:text-slate-300'
                    }`}
                  >
                    APT (Debian)
                  </button>
                  <button
                    onClick={() => setPreferredManager('flatpak')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      preferredManager === 'flatpak'
                        ? 'bg-slate-850 text-indigo-400 border-indigo-500/30'
                        : 'bg-slate-950 text-slate-500 border-slate-855 hover:text-slate-300'
                    }`}
                  >
                    Flatpak
                  </button>
                  <button
                    onClick={() => setPreferredManager('snap')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      preferredManager === 'snap'
                        ? 'bg-slate-850 text-cyan-400 border-cyan-500/30'
                        : 'bg-slate-950 text-slate-500 border-slate-855 hover:text-slate-300'
                    }`}
                  >
                    Snap CLI
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Step 2.5: Shell Script Format (.bat / .ps1 / .sh) */}
          <div className="space-y-2 pt-2 border-t border-slate-850" id="script-format-selector">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
              3. Export Script Format
            </label>
            {targetPlatform === 'windows' ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="format-btn-bat"
                  onClick={() => setWindowsScriptFormat('bat')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    windowsScriptFormat === 'bat'
                      ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm'
                      : 'bg-slate-950 text-slate-500 border-slate-855 hover:text-slate-300'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Batch Script (.bat)</span>
                </button>
                <button
                  type="button"
                  id="format-btn-ps1"
                  onClick={() => setWindowsScriptFormat('ps1')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    windowsScriptFormat === 'ps1'
                      ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40 shadow-sm'
                      : 'bg-slate-950 text-slate-500 border-slate-855 hover:text-slate-300'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>PowerShell (.ps1)</span>
                </button>
              </div>
            ) : (
              <div className="py-2 px-3 text-xs font-semibold rounded-lg border bg-slate-850 text-emerald-400 border-emerald-500/30 flex items-center justify-center gap-1.5">
                <FileCode className="w-3.5 h-3.5" />
                <span>POSIX / Bash Shell Script (.sh)</span>
              </div>
            )}
          </div>

          {/* Step 4: Script Toggle Options */}
          <div className="space-y-3 pt-4 border-t border-slate-850">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
              4. Custom Compiler Toggles
            </label>

            <div className="space-y-2.5">
              <button
                type="button"
                id="toggle-bootstrap-manager"
                onClick={() => setBootstrapManager(!bootstrapManager)}
                className="flex items-start gap-3 w-full text-left bg-slate-950/40 p-2.5 rounded-xl border border-slate-855/65 hover:bg-slate-950/70 transition-colors"
              >
                {bootstrapManager ? (
                  <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Bootstrap Package Manager</span>
                  <p className="text-[10px] text-slate-500">Inject code to auto-download {preferredManager} if not active on target terminal.</p>
                </div>
              </button>

              <button
                type="button"
                id="toggle-preflight-updates"
                onClick={() => setPreFlightUpdates(!preFlightUpdates)}
                className="flex items-start gap-3 w-full text-left bg-slate-950/40 p-2.5 rounded-xl border border-slate-855/65 hover:bg-slate-950/70 transition-colors"
              >
                {preFlightUpdates ? (
                  <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Sync Catalog Cache</span>
                  <p className="text-[10px] text-slate-500">Force source registry updates pre-flight (e.g. brew update, apt update).</p>
                </div>
              </button>

              <button
                type="button"
                id="toggle-silent-install"
                onClick={() => setSilentInstall(!silentInstall)}
                className="flex items-start gap-3 w-full text-left bg-slate-950/40 p-2.5 rounded-xl border border-slate-855/65 hover:bg-slate-950/70 transition-colors"
              >
                {silentInstall ? (
                  <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Silent Install Mode</span>
                  <p className="text-[10px] text-slate-500">Inject automated flags to bypass system prompts & confirm licenses automatically.</p>
                </div>
              </button>

              <button
                type="button"
                id="toggle-group-installs"
                onClick={() => setGroupInstalls(!groupInstalls)}
                className="flex items-start gap-3 w-full text-left bg-slate-950/40 p-2.5 rounded-xl border border-slate-855/65 hover:bg-slate-950/70 transition-colors"
              >
                {groupInstalls ? (
                  <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Coalesce CLI triggers</span>
                  <p className="text-[10px] text-slate-500">Chain matching items into a single bulk command instead of individual run loops.</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Package Counter Stack & Export Panel */}
        {selectedPackages.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-850 pb-2.5 mb-3">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Packages Stack ({selectedPackages.length})
                </span>
                <button
                  id="btn-clear-stack-side"
                  onClick={onClearStack}
                  className="text-[10px] font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-950/20 border border-rose-900/30 px-2 py-0.5 rounded cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear All
                </button>
              </div>

              {/* Select All and Batch Remove bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1" id="stack-batch-actions">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedPackages.length > 0 && checkedPackageIds.length === selectedPackages.length}
                    onChange={handleToggleSelectAll}
                    className="rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="text-[11px] font-semibold text-slate-300">Select All</span>
                </label>

                {checkedPackageIds.length > 0 && (
                  <button
                    id="btn-batch-remove"
                    onClick={handleBatchRemove}
                    className="text-[10px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-950/40 border border-rose-900/30 px-2.5 py-1 rounded-lg hover:bg-rose-950/60 transition-colors cursor-pointer shadow-sm shadow-black/20"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove Selected ({checkedPackageIds.length})</span>
                  </button>
                )}
              </div>

              <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1">
                {selectedPackages.map(pkg => {
                  const isCompatible = pkg.platforms.includes(targetPlatform);
                  const isChecked = checkedPackageIds.includes(pkg.id);
                  return (
                    <div 
                      key={pkg.id} 
                      className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs transition-all ${
                        isChecked 
                          ? 'bg-slate-900 border-indigo-500/40 text-slate-200' 
                          : isCompatible 
                            ? 'bg-slate-950/70 border-slate-850 text-slate-300' 
                            : 'bg-rose-950/5 border-rose-950/30 text-slate-500 opacity-60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleCheck(pkg.id)}
                        className="rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer shrink-0"
                      />
                      <div className="truncate flex-1">
                        <span className="font-semibold block truncate">{pkg.name}</span>
                        {!isCompatible && (
                          <span className="text-[9px] text-rose-400 font-medium">Incompatible with {targetPlatform}</span>
                        )}
                      </div>
                      <button
                        id={`btn-remove-stack-side-${pkg.id}`}
                        onClick={() => onRemovePackage(pkg.id)}
                        className="text-[10px] text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-850 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Export Aggregated Shell Script Section */}
            <div className="pt-3.5 border-t border-slate-800/80 space-y-3" id="export-script-panel">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Export Installable Shell Script</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {compatiblePkgs.length}/{selectedPackages.length} compatible
                </span>
              </div>

              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg overflow-hidden focus-within:border-indigo-500/50">
                <input
                  id="input-script-filename"
                  type="text"
                  value={customScriptName}
                  onChange={(e) => setCustomScriptName(e.target.value)}
                  placeholder="bootstrap_packages"
                  className="bg-transparent px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none w-full"
                />
                <span className="bg-slate-900 px-2.5 py-1.5 text-xs font-mono font-bold text-indigo-400 border-l border-slate-800 shrink-0">
                  .{activeExtension}
                </span>
              </div>

              <button
                id="btn-export-script-panel"
                onClick={() => handleDownloadScript()}
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl border border-indigo-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-950/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {exportedRecently
                    ? `Exported ${getCleanBaseName()}.${activeExtension}!`
                    : `Export ${getCleanBaseName()}.${activeExtension} (${targetPlatform.toUpperCase()})`}
                </span>
              </button>

              {/* Quick Cross-OS Export Buttons */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  id="btn-quick-export-bat"
                  type="button"
                  onClick={() => handleDownloadScript('windows', 'bat')}
                  className="py-1.5 px-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/30 rounded-lg text-[10px] font-semibold text-cyan-400 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  title="Export Windows Batch Installer (.bat)"
                >
                  <Download className="w-3 h-3" />
                  <span>Win (.bat)</span>
                </button>
                <button
                  id="btn-quick-export-mac-sh"
                  type="button"
                  onClick={() => handleDownloadScript('macos')}
                  className="py-1.5 px-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/30 rounded-lg text-[10px] font-semibold text-amber-400 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  title="Export macOS Shell Installer (.sh)"
                >
                  <Download className="w-3 h-3" />
                  <span>macOS (.sh)</span>
                </button>
                <button
                  id="btn-quick-export-lin-sh"
                  type="button"
                  onClick={() => handleDownloadScript('linux')}
                  className="py-1.5 px-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/30 rounded-lg text-[10px] font-semibold text-purple-400 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  title="Export Linux Shell Installer (.sh)"
                >
                  <Download className="w-3 h-3" />
                  <span>Linux (.sh)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compiler Result Terminal Column */}
      <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
        {selectedPackages.length === 0 ? (
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
            <div className="w-16 h-16 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center mb-5 shadow-inner">
              <Terminal className="w-8 h-8 text-slate-600 animate-pulse" />
            </div>
            <h4 className="text-lg font-bold text-slate-200">Terminal Shell is Empty</h4>
            <p className="text-sm text-slate-500 mt-2 max-w-sm leading-relaxed">
              Add some open-source utilities from the catalog directory, or quickstart using one of our curated administrator profiles below:
            </p>

            {/* Quick Profile presets */}
            <div className="grid grid-cols-1 gap-3.5 w-full max-w-md mt-6" id="preset-profiles-stack">
              {profiles.map((prof, idx) => (
                <button
                  key={idx}
                  id={`preset-prof-btn-${idx}`}
                  onClick={() => applyProfile(prof.pkgIds)}
                  className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl text-left hover:border-indigo-500/40 hover:bg-slate-950/80 transition-all duration-200 group flex justify-between items-center cursor-pointer"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-xs font-bold text-slate-300 group-hover:text-indigo-400 flex items-center gap-1.5 transition-colors">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      {prof.name}
                    </span>
                    <p className="text-[10px] text-slate-500 leading-snug">
                      {prof.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {prof.tags.map(t => (
                        <span key={t} className="text-[8px] bg-slate-900 border border-slate-800 text-slate-400 px-1 py-0.2 rounded font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-indigo-400 bg-indigo-950/25 border border-indigo-900/35 px-2.5 py-1.5 rounded-lg shrink-0">
                    Apply Profile
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col overflow-hidden shadow-2xl h-full">
            {/* Terminal Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-slate-900 border-b border-slate-850 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/40 border border-rose-500/50"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500/50"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500/50"></span>
                </div>
                <span className="text-xs font-mono text-slate-400 pl-2">
                  {isInstalling 
                    ? `bash • installing_stack_${targetPlatform}`
                    : `${getCleanBaseName()}.${activeExtension}`
                  }
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isInstalling ? (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/35 px-2.5 py-1 rounded flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Installing Stack...</span>
                  </span>
                ) : (
                  <>
                    <button
                      id="btn-bulk-install-trigger"
                      onClick={handleBulkInstall}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg border border-emerald-700 hover:border-emerald-600 transition-all cursor-pointer shadow-md shadow-emerald-950/25"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Bulk Install</span>
                    </button>
                    <button
                      id="btn-copy-script-main"
                      onClick={handleCopyScript}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-slate-100 rounded-lg border border-slate-750 transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>
                    <button
                      id="btn-download-script-main"
                      onClick={() => handleDownloadScript()}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-slate-100 rounded-lg border border-indigo-700 hover:border-indigo-600 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export .{activeExtension}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Script Display Terminal body OR Simulated Terminal output */}
            {isInstalling ? (
              <div className="flex-1 p-5 overflow-hidden font-mono text-[11px] md:text-xs text-slate-300 bg-slate-950 flex flex-col h-[500px] max-h-[500px]">
                {/* Simulated terminal progress & header */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${installationComplete ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                    <span className={`text-xs font-semibold ${installationComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {installationComplete ? 'Deployment Succeeded' : 'Executing Shell Deployment...'}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{Math.round(installProgress)}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mb-4 shrink-0">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${installProgress}%` }}
                  ></div>
                </div>

                {/* Active Package display */}
                {!installationComplete && currentPackageIdx >= 0 && currentPackageIdx < compatiblePkgs.length && (
                  <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-2.5 mb-4 shrink-0 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-bold">Installing: {compatiblePkgs[currentPackageIdx].name}</span>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-semibold animate-pulse">
                      Processing
                    </span>
                  </div>
                )}

                {/* Terminal logs display */}
                <div 
                  id="install-terminal-logs"
                  className="flex-1 overflow-y-auto space-y-1 bg-black/40 border border-slate-900 rounded-xl p-4 text-left select-text"
                >
                  {installLogs.map((log, index) => {
                    let logColor = 'text-slate-300';
                    if (log.startsWith('$')) {
                      logColor = 'text-indigo-400 font-bold';
                    } else if (log.startsWith('Success') || log.includes('SUCCESSFULLY') || log.includes('Successfully')) {
                      logColor = 'text-emerald-400 font-semibold';
                    } else if (log.includes('Failed') || log.includes('Error')) {
                      logColor = 'text-rose-400';
                    } else if (log.startsWith('[')) {
                      logColor = 'text-amber-400 font-bold';
                    }
                    return (
                      <div key={index} className={`${logColor} whitespace-pre-wrap leading-relaxed`}>
                        {log}
                      </div>
                    );
                  })}
                </div>

                {/* Return button if finished */}
                <div className="mt-4 pt-3 border-t border-slate-900 flex justify-end gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setIsInstalling(false);
                      setInstallationComplete(false);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-slate-100 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    {installationComplete ? 'Back to Script View' : 'Cancel & Reset'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 p-5 overflow-auto font-mono text-[11px] md:text-xs text-slate-300 leading-relaxed bg-slate-950/95 flex select-text max-h-[500px]">
                {/* Line Numbers */}
                <div className="text-slate-700 text-right pr-4 select-none border-r border-slate-900 mr-4 shrink-0">
                  {generatedScript.split(/\r?\n/).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Colored Lines */}
                <pre className="text-left whitespace-pre overflow-x-auto w-full">
                  {generatedScript.split(/\r?\n/).map((line, i) => {
                    let lineClass = 'text-slate-300';
                    const trimmed = line.trim();
                    if (trimmed.startsWith('#') || trimmed.startsWith('REM')) {
                      lineClass = 'text-slate-600 italic'; // Comments
                    } else if (trimmed.startsWith('Write-Host') || trimmed.startsWith('echo') || trimmed.startsWith('@echo') || trimmed.startsWith('title')) {
                      lineClass = 'text-cyan-400'; // Print statements
                    } else if (trimmed.startsWith('if') || trimmed.startsWith('else') || trimmed.startsWith('foreach') || trimmed.startsWith('for') || trimmed.startsWith('where') || trimmed.startsWith('net session') || trimmed === 'pause') {
                      lineClass = 'text-purple-400 font-bold'; // Control structures
                    } else if (line.includes('winget install') || line.includes('choco install') || line.includes('brew install') || line.includes('apt') || line.includes('flatpak install') || line.includes('snap install')) {
                      lineClass = 'text-amber-300'; // Critical installation lines
                    }
                    return (
                      <div key={i} className={lineClass}>
                        {line || '\n'}
                      </div>
                    );
                  })}
                </pre>
              </div>
            )}

            {/* Shell Execution Instruction Callout */}
            <div className="bg-slate-900 border-t border-slate-850 p-4 shrink-0 text-slate-400 text-xs flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-300 block">How to execute this exported .{activeExtension} script?</span>
                <p className="text-[11px] leading-snug mt-0.5">
                  {targetPlatform === 'windows' && windowsScriptFormat === 'bat'
                    ? `1. Export ${getCleanBaseName()}.bat. 2. Right-click the downloaded .bat file and select "Run as administrator" (or run .\\${getCleanBaseName()}.bat in an elevated Command Prompt).`
                    : targetPlatform === 'windows'
                      ? `1. Open PowerShell as Administrator. 2. Set policy: Set-ExecutionPolicy Bypass -Scope Process. 3. Execute downloaded file: .\\${getCleanBaseName()}.ps1`
                      : `1. Open your Terminal console. 2. Grant permissions: chmod +x ${getCleanBaseName()}.sh. 3. Execute script: ./${getCleanBaseName()}.sh`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
