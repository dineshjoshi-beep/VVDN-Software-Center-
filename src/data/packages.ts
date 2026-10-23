import { Package, SystemCheckRule } from '../types';

export const CURATED_PACKAGES: Package[] = [
  // --- DEVELOPMENT ---
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'A lightweight but powerful source code editor with rich extension ecosystem for TypeScript, Python, C++, etc.',
    category: 'development',
    website: 'https://code.visualstudio.com/',
    license: 'MIT / Proprietary (Freeware)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Microsoft.VisualStudioCode', installCmd: 'winget install --id Microsoft.VisualStudioCode -e' },
        { manager: 'choco', packageId: 'vscode', installCmd: 'choco install vscode -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'visual-studio-code', installCmd: 'brew install --cask visual-studio-code' }
      ],
      linux: [
        { manager: 'apt', packageId: 'code', installCmd: 'sudo apt update && sudo apt install -y code' },
        { manager: 'flatpak', packageId: 'com.visualstudio.code', installCmd: 'flatpak install flathub com.visualstudio.code -y' },
        { manager: 'snap', packageId: 'code', installCmd: 'sudo snap install code --classic' }
      ]
    }
  },
  {
    id: 'git',
    name: 'Git',
    description: 'Fast, scalable, distributed revision control system with a rich command-set for version control.',
    category: 'development',
    website: 'https://git-scm.com/',
    license: 'GPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Git.Git', installCmd: 'winget install --id Git.Git -e' },
        { manager: 'choco', packageId: 'git', installCmd: 'choco install git -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'git', installCmd: 'brew install git' }
      ],
      linux: [
        { manager: 'apt', packageId: 'git', installCmd: 'sudo apt update && sudo apt install -y git' }
      ]
    }
  },
  {
    id: 'nodejs',
    name: 'Node.js LTS',
    description: 'A JavaScript runtime built on Chrome\'s V8 engine, standard for modern full-stack development.',
    category: 'development',
    website: 'https://nodejs.org/',
    license: 'MIT',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'OpenJS.NodeJS.LTS', installCmd: 'winget install --id OpenJS.NodeJS.LTS -e' },
        { manager: 'choco', packageId: 'nodejs-lts', installCmd: 'choco install nodejs-lts -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'node@20', installCmd: 'brew install node@20' }
      ],
      linux: [
        { manager: 'apt', packageId: 'nodejs', installCmd: 'curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs' }
      ]
    }
  },
  {
    id: 'docker',
    name: 'Docker Desktop / Engine',
    description: 'Pack, ship and run any application as a lightweight, portable, self-sufficient container.',
    category: 'development',
    website: 'https://www.docker.com/',
    license: 'Apache-2.0 / Proprietary',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Docker.DockerDesktop', installCmd: 'winget install --id Docker.DockerDesktop -e' },
        { manager: 'choco', packageId: 'docker-desktop', installCmd: 'choco install docker-desktop -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'docker', installCmd: 'brew install --cask docker' }
      ],
      linux: [
        { manager: 'apt', packageId: 'docker.io', installCmd: 'sudo apt update && sudo apt install -y docker.io' }
      ]
    }
  },
  {
    id: 'python',
    name: 'Python 3',
    description: 'An interpreted, high-level, general-purpose programming language popular for automation, AI, and scripts.',
    category: 'development',
    website: 'https://www.python.org/',
    license: 'PSF License',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Python.Python.3.11', installCmd: 'winget install --id Python.Python.3.11 -e' },
        { manager: 'choco', packageId: 'python3', installCmd: 'choco install python3 -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'python@3.11', installCmd: 'brew install python@3.11' }
      ],
      linux: [
        { manager: 'apt', packageId: 'python3', installCmd: 'sudo apt update && sudo apt install -y python3 python3-pip' }
      ]
    }
  },
  {
    id: 'golang',
    name: 'Go Compiler',
    description: 'An open-source programming language designed by Google to build simple, reliable, and efficient software.',
    category: 'development',
    website: 'https://go.dev/',
    license: 'BSD-3-Clause',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'GoLang.Go', installCmd: 'winget install --id GoLang.Go -e' },
        { manager: 'choco', packageId: 'golang', installCmd: 'choco install golang -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'go', installCmd: 'brew install go' }
      ],
      linux: [
        { manager: 'apt', packageId: 'golang-go', installCmd: 'sudo apt update && sudo apt install -y golang-go' }
      ]
    }
  },
  {
    id: 'rust',
    name: 'Rust (Rustup)',
    description: 'A systems programming language focused on safety, speed, and concurrency.',
    category: 'development',
    website: 'https://www.rust-lang.org/',
    license: 'MIT / Apache-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Rustlang.Rustup', installCmd: 'winget install --id Rustlang.Rustup -e' },
        { manager: 'choco', packageId: 'rustup', installCmd: 'choco install rustup -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'rustup', installCmd: 'brew install rustup && rustup-init' }
      ],
      linux: [
        { manager: 'apt', packageId: 'rustup', installCmd: 'curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y' }
      ]
    }
  },

  // --- INTERNET / BROWSERS ---
  {
    id: 'firefox',
    name: 'Mozilla Firefox',
    description: 'A privacy-first, extensible, open-source web browser backed by a non-profit.',
    category: 'internet',
    website: 'https://www.mozilla.org/firefox/',
    license: 'MPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Mozilla.Firefox', installCmd: 'winget install --id Mozilla.Firefox -e' },
        { manager: 'choco', packageId: 'firefox', installCmd: 'choco install firefox -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'firefox', installCmd: 'brew install --cask firefox' }
      ],
      linux: [
        { manager: 'apt', packageId: 'firefox', installCmd: 'sudo apt update && sudo apt install -y firefox' },
        { manager: 'flatpak', packageId: 'org.mozilla.firefox', installCmd: 'flatpak install flathub org.mozilla.firefox -y' }
      ]
    }
  },
  {
    id: 'brave',
    name: 'Brave Browser',
    description: 'A privacy-focused browser that blocks ads and trackers by default with built-in Tor routing.',
    category: 'internet',
    website: 'https://brave.com/',
    license: 'MPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Brave.Brave', installCmd: 'winget install --id Brave.Brave -e' },
        { manager: 'choco', packageId: 'brave', installCmd: 'choco install brave -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'brave-browser', installCmd: 'brew install --cask brave-browser' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.brave.Browser', installCmd: 'flatpak install flathub com.brave.Browser -y' },
        { manager: 'snap', packageId: 'brave', installCmd: 'sudo snap install brave' }
      ]
    }
  },
  {
    id: 'filezilla',
    name: 'FileZilla',
    description: 'A fast and reliable cross-platform FTP, FTPS, and SFTP client with a user-friendly layout.',
    category: 'internet',
    website: 'https://filezilla-project.org/',
    license: 'GPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'FileZilla.FileZilla', installCmd: 'winget install --id FileZilla.FileZilla -e' },
        { manager: 'choco', packageId: 'filezilla', installCmd: 'choco install filezilla -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'filezilla', installCmd: 'brew install --cask filezilla' }
      ],
      linux: [
        { manager: 'apt', packageId: 'filezilla', installCmd: 'sudo apt update && sudo apt install -y filezilla' }
      ]
    }
  },
  {
    id: 'curl',
    name: 'curl',
    description: 'A command line tool and library for transferring data with URLs, supporting HTTP, HTTPS, FTP, and more.',
    category: 'internet',
    website: 'https://curl.se/',
    license: 'MIT / curl License',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'AnUk.curl', installCmd: 'winget install --id AnUk.curl -e' },
        { manager: 'choco', packageId: 'curl', installCmd: 'choco install curl -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'curl', installCmd: 'brew install curl' }
      ],
      linux: [
        { manager: 'apt', packageId: 'curl', installCmd: 'sudo apt update && sudo apt install -y curl' }
      ]
    }
  },

  // --- PRODUCTIVITY ---
  {
    id: 'adobe-acrobat-reader',
    name: 'Adobe Acrobat Reader',
    description: 'The global standard PDF software application for viewing, printing, signing, annotating, form filling, and sharing PDF documents.',
    category: 'productivity',
    website: 'https://www.adobe.com/acrobat/pdf-reader.html',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Adobe.Acrobat.Reader.64-bit', installCmd: 'winget install --id Adobe.Acrobat.Reader.64-bit -e' },
        { manager: 'choco', packageId: 'adobereader', installCmd: 'choco install adobereader -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'adobe-acrobat-reader', installCmd: 'brew install --cask adobe-acrobat-reader' }
      ],
      linux: [
        { manager: 'snap', packageId: 'acrobat-reader', installCmd: 'sudo snap install acrobat-reader' }
      ]
    },
    rating: 4.8,
    downloads: '120M+',
    isTrending: true
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    description: 'A powerful, local-first markdown note-taking tool that represents notes as an interconnected graph.',
    category: 'productivity',
    website: 'https://obsidian.md/',
    license: 'Freeware (Personal Use)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Obsidian.Obsidian', installCmd: 'winget install --id Obsidian.Obsidian -e' },
        { manager: 'choco', packageId: 'obsidian', installCmd: 'choco install obsidian -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'obsidian', installCmd: 'brew install --cask obsidian' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'md.obsidian.Obsidian', installCmd: 'flatpak install flathub md.obsidian.Obsidian -y' },
        { manager: 'snap', packageId: 'obsidian', installCmd: 'sudo snap install obsidian --classic' }
      ]
    }
  },
  {
    id: 'libreoffice',
    name: 'LibreOffice',
    description: 'A comprehensive, professional-grade, open-source office suite (Word, Excel, PPT equivalent).',
    category: 'productivity',
    website: 'https://www.libreoffice.org/',
    license: 'LGPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'TheDocumentFoundation.LibreOffice', installCmd: 'winget install --id TheDocumentFoundation.LibreOffice -e' },
        { manager: 'choco', packageId: 'libreoffice', installCmd: 'choco install libreoffice -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'libreoffice', installCmd: 'brew install --cask libreoffice' }
      ],
      linux: [
        { manager: 'apt', packageId: 'libreoffice', installCmd: 'sudo apt update && sudo apt install -y libreoffice' }
      ]
    }
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'A single-space workspace for notes, tasks, databases, calendars, and team collaboration.',
    category: 'productivity',
    website: 'https://www.notion.so/',
    license: 'Proprietary (Freeware Tier)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Notion.Notion', installCmd: 'winget install --id Notion.Notion -e' },
        { manager: 'choco', packageId: 'notion', installCmd: 'choco install notion -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'notion', installCmd: 'brew install --cask notion' }
      ]
    }
  },
  {
    id: 'logseq',
    name: 'Logseq',
    description: 'A privacy-first, open-source knowledge graph outliner for writing, organizing, and task planning.',
    category: 'productivity',
    website: 'https://logseq.com/',
    license: 'AGPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Logseq.Logseq', installCmd: 'winget install --id Logseq.Logseq -e' },
        { manager: 'choco', packageId: 'logseq', installCmd: 'choco install logseq -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'logseq', installCmd: 'brew install --cask logseq' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.logseq.Logseq', installCmd: 'flatpak install flathub com.logseq.Logseq -y' }
      ]
    }
  },

  // --- SYSTEM UTILITIES ---
  {
    id: '7zip',
    name: '7-Zip / Keka',
    description: 'High-compression file archiver supporting standard formats (7z, ZIP, RAR, GZIP, TAR).',
    category: 'utilities',
    website: 'https://www.7-zip.org/',
    license: 'GNU LGPL',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: '7zip.7zip', installCmd: 'winget install --id 7zip.7zip -e' },
        { manager: 'choco', packageId: '7zip', installCmd: 'choco install 7zip -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'keka', installCmd: 'brew install --cask keka' }
      ],
      linux: [
        { manager: 'apt', packageId: 'p7zip-full', installCmd: 'sudo apt update && sudo apt install -y p7zip-full' }
      ]
    }
  },
  {
    id: 'neovim',
    name: 'Neovim',
    description: 'Vim-fork focused on extensibility, rich Lua scripting, async plugins, and modern editor integration.',
    category: 'utilities',
    website: 'https://neovim.io/',
    license: 'Apache-2.0 / Vim License',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Neovim.Neovim', installCmd: 'winget install --id Neovim.Neovim -e' },
        { manager: 'choco', packageId: 'neovim', installCmd: 'choco install neovim -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'neovim', installCmd: 'brew install neovim' }
      ],
      linux: [
        { manager: 'apt', packageId: 'neovim', installCmd: 'sudo apt update && sudo apt install -y neovim' },
        { manager: 'flatpak', packageId: 'org.neovim.nvim', installCmd: 'flatpak install flathub org.neovim.nvim -y' }
      ]
    }
  },
  {
    id: 'wget',
    name: 'wget',
    description: 'Non-interactive network downloader utility supporting HTTP, HTTPS, and FTP protocols.',
    category: 'utilities',
    website: 'https://www.gnu.org/software/wget/',
    license: 'GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'GNU.Wget', installCmd: 'winget install --id GNU.Wget -e' },
        { manager: 'choco', packageId: 'wget', installCmd: 'choco install wget -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'wget', installCmd: 'brew install wget' }
      ],
      linux: [
        { manager: 'apt', packageId: 'wget', installCmd: 'sudo apt update && sudo apt install -y wget' }
      ]
    }
  },
  {
    id: 'tmux',
    name: 'tmux',
    description: 'A high-grade terminal multiplexer that allows running multiple terminal sessions in one window.',
    category: 'utilities',
    website: 'https://github.com/tmux/tmux',
    license: 'BSD-3-Clause',
    platforms: ['macos', 'linux'],
    commands: {
      macos: [
        { manager: 'brew', packageId: 'tmux', installCmd: 'brew install tmux' }
      ],
      linux: [
        { manager: 'apt', packageId: 'tmux', installCmd: 'sudo apt update && sudo apt install -y tmux' }
      ]
    }
  },
  {
    id: 'htop',
    name: 'htop',
    description: 'Interactive, color-coded, real-time process viewer and system resource monitor.',
    category: 'utilities',
    website: 'https://htop.dev/',
    license: 'GPL-2.0',
    platforms: ['macos', 'linux'],
    commands: {
      macos: [
        { manager: 'brew', packageId: 'htop', installCmd: 'brew install htop' }
      ],
      linux: [
        { manager: 'apt', packageId: 'htop', installCmd: 'sudo apt update && sudo apt install -y htop' }
      ]
    }
  },
  {
    id: 'fzf',
    name: 'fzf',
    description: 'An interactive command-line fuzzy finder that integrates seamlessly with bash/zsh file listings.',
    category: 'utilities',
    website: 'https://github.com/junegunn/fzf',
    license: 'MIT',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'junegunn.fzf', installCmd: 'winget install --id junegunn.fzf -e' },
        { manager: 'choco', packageId: 'fzf', installCmd: 'choco install fzf -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'fzf', installCmd: 'brew install fzf && $(brew --prefix)/opt/fzf/install --all' }
      ],
      linux: [
        { manager: 'apt', packageId: 'fzf', installCmd: 'sudo apt update && sudo apt install -y fzf' }
      ]
    }
  },

  // --- DESIGN & GRAPHICS ---
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud',
    description: 'Desktop hub application to install, manage, and update the Adobe software suite including Acrobat Pro, Photoshop, and Illustrator.',
    category: 'design',
    website: 'https://www.adobe.com/creativecloud.html',
    license: 'Proprietary',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Adobe.CreativeCloud', installCmd: 'winget install --id Adobe.CreativeCloud -e' }
      ],
      macos: [
        { manager: 'brew', packageId: 'adobe-creative-cloud', installCmd: 'brew install --cask adobe-creative-cloud' }
      ]
    },
    rating: 4.6,
    downloads: '45M+',
    isTrending: true
  },
  {
    id: 'gimp',
    name: 'GIMP',
    description: 'The GNU Image Manipulation Program, a modular cross-platform photo retouching and painting system.',
    category: 'design',
    website: 'https://www.gimp.org/',
    license: 'GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Gnu.GIMP', installCmd: 'winget install --id Gnu.GIMP -e' },
        { manager: 'choco', packageId: 'gimp', installCmd: 'choco install gimp -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'gimp', installCmd: 'brew install --cask gimp' }
      ],
      linux: [
        { manager: 'apt', packageId: 'gimp', installCmd: 'sudo apt update && sudo apt install -y gimp' },
        { manager: 'flatpak', packageId: 'org.gimp.GIMP', installCmd: 'flatpak install flathub org.gimp.GIMP -y' }
      ]
    }
  },
  {
    id: 'blender',
    name: 'Blender',
    description: 'Ultra-powerful open-source 3D creation suite supporting modeling, rigging, animation, rendering, and compositing.',
    category: 'design',
    website: 'https://www.blender.org/',
    license: 'GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'BlenderFoundation.Blender', installCmd: 'winget install --id BlenderFoundation.Blender -e' },
        { manager: 'choco', packageId: 'blender', installCmd: 'choco install blender -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'blender', installCmd: 'brew install --cask blender' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.blender.Blender', installCmd: 'flatpak install flathub org.blender.Blender -y' }
      ]
    }
  },
  {
    id: 'inkscape',
    name: 'Inkscape',
    description: 'Professional vector graphics editor for creating vector maps, diagrams, icons, and illustrations using SVG standard.',
    category: 'design',
    website: 'https://inkscape.org/',
    license: 'GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Inkscape.Inkscape', installCmd: 'winget install --id Inkscape.Inkscape -e' },
        { manager: 'choco', packageId: 'inkscape', installCmd: 'choco install inkscape -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'inkscape', installCmd: 'brew install --cask inkscape' }
      ],
      linux: [
        { manager: 'apt', packageId: 'inkscape', installCmd: 'sudo apt update && sudo apt install -y inkscape' },
        { manager: 'flatpak', packageId: 'org.inkscape.Inkscape', installCmd: 'flatpak install flathub org.inkscape.Inkscape -y' }
      ]
    }
  },
  {
    id: 'krita',
    name: 'Krita',
    description: 'An open-source digital painting, sketching, and concept illustration application with advanced layer engines.',
    category: 'design',
    website: 'https://krita.org/',
    license: 'GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Krita.Krita', installCmd: 'winget install --id Krita.Krita -e' },
        { manager: 'choco', packageId: 'krita', installCmd: 'choco install krita -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'krita', installCmd: 'brew install --cask krita' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.kde.krita', installCmd: 'flatpak install flathub org.kde.krita -y' }
      ]
    }
  },

  // --- MEDIA ---
  {
    id: 'vlc',
    name: 'VLC Media Player',
    description: 'A free, modular, cross-platform multimedia player that plays most local video files, streams, and DVDs without codecs.',
    category: 'media',
    website: 'https://www.videolan.org/vlc/',
    license: 'GPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'VideoLAN.VLC', installCmd: 'winget install --id VideoLAN.VLC -e' },
        { manager: 'choco', packageId: 'vlc', installCmd: 'choco install vlc -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'vlc', installCmd: 'brew install --cask vlc' }
      ],
      linux: [
        { manager: 'apt', packageId: 'vlc', installCmd: 'sudo apt update && sudo apt install -y vlc' }
      ]
    }
  },
  {
    id: 'obs-studio',
    name: 'OBS Studio',
    description: 'Free, high-performance open-source video recording and live streaming software with real-time video layouts.',
    category: 'media',
    website: 'https://obsproject.com/',
    license: 'GPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'OBSProject.OBSStudio', installCmd: 'winget install --id OBSProject.OBSStudio -e' },
        { manager: 'choco', packageId: 'obs-studio', installCmd: 'choco install obs-studio -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'obs-studio', installCmd: 'brew install --cask obs-studio' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.obsproject.Studio', installCmd: 'flatpak install flathub com.obsproject.Studio -y' }
      ]
    }
  },
  {
    id: 'audacity',
    name: 'Audacity',
    description: 'An easy-to-use, multi-track audio editor and recorder with precision track spectrogram visualizers.',
    category: 'media',
    website: 'https://www.audacityteam.org/',
    license: 'GPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Audacity.Audacity', installCmd: 'winget install --id Audacity.Audacity -e' },
        { manager: 'choco', packageId: 'audacity', installCmd: 'choco install audacity -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'audacity', installCmd: 'brew install --cask audacity' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.audacityteam.Audacity', installCmd: 'flatpak install flathub org.audacityteam.Audacity -y' }
      ]
    }
  },
  {
    id: 'handbrake',
    name: 'HandBrake',
    description: 'A tool for converting video files from nearly any format to a selection of modern, widely supported codecs.',
    category: 'media',
    website: 'https://handbrake.fr/',
    license: 'GPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'HandBrake.HandBrake', installCmd: 'winget install --id HandBrake.HandBrake -e' },
        { manager: 'choco', packageId: 'handbrake', installCmd: 'choco install handbrake -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'handbrake', installCmd: 'brew install --cask handbrake' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'fr.handbrake.ghb', installCmd: 'flatpak install flathub fr.handbrake.ghb -y' }
      ]
    }
  },

  // --- SECURITY ---
  {
    id: 'bitwarden',
    name: 'Bitwarden',
    description: 'A highly secure, open-source password manager that seals and syncs credentials across devices.',
    category: 'security',
    website: 'https://bitwarden.com/',
    license: 'GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: '8BitSolutions.Bitwarden', installCmd: 'winget install --id 8BitSolutions.Bitwarden -e' },
        { manager: 'choco', packageId: 'bitwarden', installCmd: 'choco install bitwarden -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'bitwarden', installCmd: 'brew install --cask bitwarden' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.bitwarden.desktop', installCmd: 'flatpak install flathub com.bitwarden.desktop -y' },
        { manager: 'snap', packageId: 'bitwarden', installCmd: 'sudo snap install bitwarden' }
      ]
    }
  },
  {
    id: 'keepassxc',
    name: 'KeePassXC',
    description: 'A secure, offline-first personal credential locker using AES-256 local encrypted files.',
    category: 'security',
    website: 'https://keepassxc.org/',
    license: 'GPL-2.0 / GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'KeePassXC.KeePassXC', installCmd: 'winget install --id KeePassXC.KeePassXC -e' },
        { manager: 'choco', packageId: 'keepassxc', installCmd: 'choco install keepassxc -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'keepassxc', installCmd: 'brew install --cask keepassxc' }
      ],
      linux: [
        { manager: 'apt', packageId: 'keepassxc', installCmd: 'sudo apt update && sudo apt install -y keepassxc' },
        { manager: 'flatpak', packageId: 'org.keepassxc.KeePassXC', installCmd: 'flatpak install flathub org.keepassxc.KeePassXC -y' }
      ]
    },
    rating: 4.8,
    downloads: '1.9M',
    isTrending: false
  },
  {
    id: 'dbeaver',
    name: 'DBeaver Community',
    description: 'Free multi-platform database tool for developers, database administrators and analysts. Supports PostgreSQL, MySQL, SQLite, and more (v24.1).',
    category: 'development',
    website: 'https://dbeaver.io/',
    license: 'Apache-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'dbeaver.dbeaver', installCmd: 'winget install --id dbeaver.dbeaver -e' },
        { manager: 'choco', packageId: 'dbeaver', installCmd: 'choco install dbeaver -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'dbeaver-community', installCmd: 'brew install --cask dbeaver-community' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'io.dbeaver.DBeaverCommunity', installCmd: 'flatpak install flathub io.dbeaver.DBeaverCommunity -y' }
      ]
    },
    rating: 4.8,
    downloads: '2.5M',
    isTrending: true
  },
  {
    id: 'insomnia',
    name: 'Insomnia API Client',
    description: 'The open-source, collaborative developer platform for designing, debugging, and testing GraphQL, REST, WebSockets, and gRPC APIs (v9.3).',
    category: 'development',
    website: 'https://insomnia.rest/',
    license: 'Apache-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Kong.Insomnia', installCmd: 'winget install --id Kong.Insomnia -e' },
        { manager: 'choco', packageId: 'insomnia', installCmd: 'choco install insomnia -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'insomnia', installCmd: 'brew install --cask insomnia' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'rest.insomnia.Insomnia', installCmd: 'flatpak install flathub rest.insomnia.Insomnia -y' }
      ]
    },
    rating: 4.6,
    downloads: '1.8M',
    isTrending: false
  },
  {
    id: 'thunderbird',
    name: 'Mozilla Thunderbird',
    description: 'A free, open-source, cross-platform email, calendar, newsroom, and chat client developed by the Mozilla Foundation (v115 Supernova).',
    category: 'internet',
    website: 'https://www.thunderbird.net/',
    license: 'MPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Mozilla.Thunderbird', installCmd: 'winget install --id Mozilla.Thunderbird -e' },
        { manager: 'choco', packageId: 'thunderbird', installCmd: 'choco install thunderbird -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'thunderbird', installCmd: 'brew install --cask thunderbird' }
      ],
      linux: [
        { manager: 'apt', packageId: 'thunderbird', installCmd: 'sudo apt update && sudo apt install -y thunderbird' },
        { manager: 'flatpak', packageId: 'org.mozilla.Thunderbird', installCmd: 'flatpak install flathub org.mozilla.Thunderbird -y' }
      ]
    },
    rating: 4.5,
    downloads: '4.2M',
    isTrending: false
  },
  {
    id: 'transmission',
    name: 'Transmission',
    description: 'A powerful yet extremely lightweight, fast, and easy-to-use BitTorrent client with multiple user interfaces (v4.0).',
    category: 'internet',
    website: 'https://transmissionbt.com/',
    license: 'GPL-2.0 / GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Transmission.Transmission', installCmd: 'winget install --id Transmission.Transmission -e' },
        { manager: 'choco', packageId: 'transmission', installCmd: 'choco install transmission -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'transmission', installCmd: 'brew install --cask transmission' }
      ],
      linux: [
        { manager: 'apt', packageId: 'transmission-gtk', installCmd: 'sudo apt update && sudo apt install -y transmission-gtk' },
        { manager: 'flatpak', packageId: 'fr.handbrake.ghb', installCmd: 'flatpak install flathub org.transmissionbt.Transmission -y' }
      ]
    },
    rating: 4.7,
    downloads: '3.1M',
    isTrending: true
  },
  {
    id: 'pdfsam',
    name: 'PDFsam Basic',
    description: 'A free, open-source, multi-platform desktop application designed to split, merge, mix, rotate, and extract pages from PDF files (v5.2).',
    category: 'productivity',
    website: 'https://pdfsam.org/',
    license: 'GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Soba.PDFsamBasic', installCmd: 'winget install --id Soba.PDFsamBasic -e' },
        { manager: 'choco', packageId: 'pdfsam', installCmd: 'choco install pdfsam -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'pdfsam-basic', installCmd: 'brew install --cask pdfsam-basic' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.pdfsam.PDFsam', installCmd: 'flatpak install flathub org.pdfsam.PDFsam -y' }
      ]
    },
    rating: 4.4,
    downloads: '1.2M',
    isTrending: false
  },
  {
    id: 'cherrytree',
    name: 'Cherrytree',
    description: 'A hierarchical note-taking application featuring rich text format, syntax highlighting, sub-node storage, and image insertions (v1.1).',
    category: 'productivity',
    website: 'https://www.giuspen.net/cherrytree/',
    license: 'GPL-3.0',
    platforms: ['windows', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'giuspen.cherrytree', installCmd: 'winget install --id giuspen.cherrytree -e' },
        { manager: 'choco', packageId: 'cherrytree', installCmd: 'choco install cherrytree -y' }
      ],
      linux: [
        { manager: 'apt', packageId: 'cherrytree', installCmd: 'sudo apt update && sudo apt install -y cherrytree' },
        { manager: 'flatpak', packageId: 'net.giuspen.cherrytree', installCmd: 'flatpak install flathub net.giuspen.cherrytree -y' }
      ]
    },
    rating: 4.3,
    downloads: '850K',
    isTrending: false
  },
  {
    id: 'etcher',
    name: 'balenaEtcher',
    description: 'A powerful, cross-platform OS image flasher built to safely and easily flash OS images to SD cards & USB drives (v1.19).',
    category: 'utilities',
    website: 'https://etcher.balena.io/',
    license: 'Apache-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Balena.Etcher', installCmd: 'winget install --id Balena.Etcher -e' },
        { manager: 'choco', packageId: 'etcher', installCmd: 'choco install etcher -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'balenaetcher', installCmd: 'brew install --cask balenaetcher' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'io.balena.etcher', installCmd: 'flatpak install flathub io.balena.etcher -y' }
      ]
    },
    rating: 4.7,
    downloads: '5.6M',
    isTrending: true
  },
  {
    id: 'fastfetch',
    name: 'Fastfetch',
    description: 'An extremely fast, highly customizable system information tool, written in C. It is a modern, active alternative to neofetch (v2.15).',
    category: 'utilities',
    website: 'https://github.com/fastfetch-cli/fastfetch',
    license: 'MIT',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Fastfetch-cli.Fastfetch', installCmd: 'winget install --id Fastfetch-cli.Fastfetch -e' },
        { manager: 'choco', packageId: 'fastfetch', installCmd: 'choco install fastfetch -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'fastfetch', installCmd: 'brew install fastfetch' }
      ],
      linux: [
        { manager: 'apt', packageId: 'fastfetch', installCmd: 'sudo add-apt-repository ppa:zhangsongcui3371/fastfetch -y && sudo apt update && sudo apt install -y fastfetch' }
      ]
    },
    rating: 4.9,
    downloads: '2.1M',
    isTrending: true
  },
  {
    id: 'darktable',
    name: 'Darktable',
    description: 'An open-source photography workflow application and raw developer that manages your digital negatives in a virtual database (v4.6).',
    category: 'design',
    website: 'https://www.darktable.org/',
    license: 'GPL-3.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Darktable.Darktable', installCmd: 'winget install --id Darktable.Darktable -e' },
        { manager: 'choco', packageId: 'darktable', installCmd: 'choco install darktable -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'darktable', installCmd: 'brew install --cask darktable' }
      ],
      linux: [
        { manager: 'apt', packageId: 'darktable', installCmd: 'sudo apt update && sudo apt install -y darktable' },
        { manager: 'flatpak', packageId: 'org.darktable.Darktable', installCmd: 'flatpak install flathub org.darktable.Darktable -y' }
      ]
    },
    rating: 4.5,
    downloads: '920K',
    isTrending: false
  },
  {
    id: 'freecad',
    name: 'FreeCAD',
    description: 'A general-purpose open-source 3D parametric modeler for CAD, MCAD, CAx, CAE and PLM (v0.21).',
    category: 'design',
    website: 'https://www.freecad.org/',
    license: 'LGPL-2.0+',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'FreeCAD.FreeCAD', installCmd: 'winget install --id FreeCAD.FreeCAD -e' },
        { manager: 'choco', packageId: 'freecad', installCmd: 'choco install freecad -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'freecad', installCmd: 'brew install --cask freecad' }
      ],
      linux: [
        { manager: 'apt', packageId: 'freecad', installCmd: 'sudo apt update && sudo apt install -y freecad' },
        { manager: 'flatpak', packageId: 'org.freecadweb.FreeCAD', installCmd: 'flatpak install flathub org.freecadweb.FreeCAD -y' }
      ]
    },
    rating: 4.4,
    downloads: '1.4M',
    isTrending: false
  },
  {
    id: 'mpv',
    name: 'mpv Media Player',
    description: 'A free, open-source, and highly versatile command-line media player with an minimalist GUI and powerful video scaling (v0.38).',
    category: 'media',
    website: 'https://mpv.io/',
    license: 'GPL-2.0+',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'mpv.mpv', installCmd: 'winget install --id mpv.mpv -e' },
        { manager: 'choco', packageId: 'mpv', installCmd: 'choco install mpv -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'mpv', installCmd: 'brew install mpv' }
      ],
      linux: [
        { manager: 'apt', packageId: 'mpv', installCmd: 'sudo apt update && sudo apt install -y mpv' },
        { manager: 'flatpak', packageId: 'io.mpv.Mpv', installCmd: 'flatpak install flathub io.mpv.Mpv -y' }
      ]
    },
    rating: 4.8,
    downloads: '3.3M',
    isTrending: true
  },
  {
    id: 'kodi',
    name: 'Kodi',
    description: 'A free and open-source media player software application developed by the XBMC Foundation, ideal for home theater setups (v21 Omega).',
    category: 'media',
    website: 'https://kodi.tv/',
    license: 'GPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'XBMCFoundation.Kodi', installCmd: 'winget install --id XBMCFoundation.Kodi -e' },
        { manager: 'choco', packageId: 'kodi', installCmd: 'choco install kodi -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'kodi', installCmd: 'brew install --cask kodi' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'tv.kodi.Kodi', installCmd: 'flatpak install flathub tv.kodi.Kodi -y' }
      ]
    },
    rating: 4.6,
    downloads: '6.4M',
    isTrending: false
  },
  {
    id: 'wireshark',
    name: 'Wireshark',
    description: 'The world\'s foremost and widely-used network protocol analyzer, letting you capture and interactively browse traffic (v4.2).',
    category: 'security',
    website: 'https://www.wireshark.org/',
    license: 'GPL-2.0',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'WiresharkFoundation.Wireshark', installCmd: 'winget install --id WiresharkFoundation.Wireshark -e' },
        { manager: 'choco', packageId: 'wireshark', installCmd: 'choco install wireshark -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'wireshark', installCmd: 'brew install wireshark' }
      ],
      linux: [
        { manager: 'apt', packageId: 'wireshark', installCmd: 'sudo apt update && sudo apt install -y wireshark' }
      ]
    },
    rating: 4.8,
    downloads: '4.8M',
    isTrending: true
  },

  // --- ADDITIONAL POPULAR FREEWARE APPLICATIONS ---
  {
    id: 'chrome',
    name: 'Google Chrome',
    description: 'Fast, secure, and widely used freeware web browser built for the modern web with cross-device sync and extensions.',
    category: 'internet',
    website: 'https://www.google.com/chrome/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Google.Chrome', installCmd: 'winget install --id Google.Chrome -e' },
        { manager: 'choco', packageId: 'googlechrome', installCmd: 'choco install googlechrome -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'google-chrome', installCmd: 'brew install --cask google-chrome' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.google.Chrome', installCmd: 'flatpak install flathub com.google.Chrome -y' }
      ]
    },
    rating: 4.8,
    downloads: '150M+',
    isTrending: true
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'All-in-one freeware voice, video, and text communication software for developer communities, gaming, and teams.',
    category: 'internet',
    website: 'https://discord.com/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Discord.Discord', installCmd: 'winget install --id Discord.Discord -e' },
        { manager: 'choco', packageId: 'discord', installCmd: 'choco install discord -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'discord', installCmd: 'brew install --cask discord' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.discordapp.Discord', installCmd: 'flatpak install flathub com.discordapp.Discord -y' },
        { manager: 'snap', packageId: 'discord', installCmd: 'sudo snap install discord' }
      ]
    },
    rating: 4.8,
    downloads: '90M+',
    isTrending: true
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Channel-based team messaging and collaboration freeware platform with deep workflow and developer integrations.',
    category: 'internet',
    website: 'https://slack.com/',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'SlackTechnologies.Slack', installCmd: 'winget install --id SlackTechnologies.Slack -e' },
        { manager: 'choco', packageId: 'slack', installCmd: 'choco install slack -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'slack', installCmd: 'brew install --cask slack' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.slack.Slack', installCmd: 'flatpak install flathub com.slack.Slack -y' },
        { manager: 'snap', packageId: 'slack', installCmd: 'sudo snap install slack' }
      ]
    },
    rating: 4.7,
    downloads: '40M+',
    isTrending: false
  },
  {
    id: 'zoom',
    name: 'Zoom Workplace',
    description: 'Reliable freeware video conferencing, online meetings, screen sharing, and team chat collaboration suite.',
    category: 'internet',
    website: 'https://zoom.us/',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Zoom.Zoom', installCmd: 'winget install --id Zoom.Zoom -e' },
        { manager: 'choco', packageId: 'zoom', installCmd: 'choco install zoom -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'zoom', installCmd: 'brew install --cask zoom' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'us.zoom.Zoom', installCmd: 'flatpak install flathub us.zoom.Zoom -y' }
      ]
    },
    rating: 4.6,
    downloads: '85M+',
    isTrending: false
  },
  {
    id: 'telegram',
    name: 'Telegram Desktop',
    description: 'Fast, secure, cloud-based freeware instant messaging application with encrypted chats and unlimited file sharing.',
    category: 'internet',
    website: 'https://desktop.telegram.org/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Telegram.TelegramDesktop', installCmd: 'winget install --id Telegram.TelegramDesktop -e' },
        { manager: 'choco', packageId: 'telegram', installCmd: 'choco install telegram -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'telegram', installCmd: 'brew install --cask telegram' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.telegram.desktop', installCmd: 'flatpak install flathub org.telegram.desktop -y' },
        { manager: 'snap', packageId: 'telegram-desktop', installCmd: 'sudo snap install telegram-desktop' }
      ]
    },
    rating: 4.8,
    downloads: '55M+',
    isTrending: true
  },
  {
    id: 'qbittorrent',
    name: 'qBittorrent',
    description: 'Lightweight, ad-free open-source freeware BitTorrent client with integrated search engine and web UI.',
    category: 'internet',
    website: 'https://www.qbittorrent.org/',
    license: 'Freeware (GPL-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'qBittorrent.qBittorrent', installCmd: 'winget install --id qBittorrent.qBittorrent -e' },
        { manager: 'choco', packageId: 'qbittorrent', installCmd: 'choco install qbittorrent -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'qbittorrent', installCmd: 'brew install --cask qbittorrent' }
      ],
      linux: [
        { manager: 'apt', packageId: 'qbittorrent', installCmd: 'sudo apt update && sudo apt install -y qbittorrent' },
        { manager: 'flatpak', packageId: 'org.qbittorrent.qBittorrent', installCmd: 'flatpak install flathub org.qbittorrent.qBittorrent -y' }
      ]
    },
    rating: 4.9,
    downloads: '22M+',
    isTrending: true
  },
  {
    id: 'postman',
    name: 'Postman',
    description: 'Industry-leading API development freeware platform for building, testing, documenting, and mocking REST and GraphQL APIs.',
    category: 'development',
    website: 'https://www.postman.com/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Postman.Postman', installCmd: 'winget install --id Postman.Postman -e' },
        { manager: 'choco', packageId: 'postman', installCmd: 'choco install postman -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'postman', installCmd: 'brew install --cask postman' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.getpostman.Postman', installCmd: 'flatpak install flathub com.getpostman.Postman -y' },
        { manager: 'snap', packageId: 'postman', installCmd: 'sudo snap install postman' }
      ]
    },
    rating: 4.8,
    downloads: '30M+',
    isTrending: true
  },
  {
    id: 'notepadplusplus',
    name: 'Notepad++',
    description: 'Fast, lightweight freeware source code editor and Notepad replacement supporting 80+ programming languages.',
    category: 'development',
    website: 'https://notepad-plus-plus.org/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Notepad++.Notepad++', installCmd: 'winget install --id Notepad++.Notepad++ -e' },
        { manager: 'choco', packageId: 'notepadplusplus', installCmd: 'choco install notepadplusplus -y' }
      ]
    },
    rating: 4.9,
    downloads: '48M+',
    isTrending: true
  },
  {
    id: 'github-desktop',
    name: 'GitHub Desktop',
    description: 'Intuitive freeware Git GUI client for seamless repository management, branching, diff inspection, and pull requests.',
    category: 'development',
    website: 'https://desktop.github.com/',
    license: 'Freeware (MIT)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'GitHub.GitHubDesktop', installCmd: 'winget install --id GitHub.GitHubDesktop -e' },
        { manager: 'choco', packageId: 'github-desktop', installCmd: 'choco install github-desktop -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'github', installCmd: 'brew install --cask github' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'io.github.shiftey.Desktop', installCmd: 'flatpak install flathub io.github.shiftey.Desktop -y' }
      ]
    },
    rating: 4.7,
    downloads: '18M+',
    isTrending: false
  },
  {
    id: 'winscp',
    name: 'WinSCP',
    description: 'Popular freeware SFTP, SCP, S3, WebDAV, and FTP client for Windows with integrated text editor and scripting.',
    category: 'development',
    website: 'https://winscp.net/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'WinSCP.WinSCP', installCmd: 'winget install --id WinSCP.WinSCP -e' },
        { manager: 'choco', packageId: 'winscp', installCmd: 'choco install winscp -y' }
      ]
    },
    rating: 4.8,
    downloads: '25M+',
    isTrending: false
  },
  {
    id: 'putty',
    name: 'PuTTY',
    description: 'Classic, lightweight freeware SSH and telnet terminal client with serial console and key generator utilities.',
    category: 'development',
    website: 'https://www.chiark.greenend.org.uk/~sgtatham/putty/',
    license: 'Freeware (MIT)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'PuTTY.PuTTY', installCmd: 'winget install --id PuTTY.PuTTY -e' },
        { manager: 'choco', packageId: 'putty', installCmd: 'choco install putty -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'putty', installCmd: 'brew install putty' }
      ],
      linux: [
        { manager: 'apt', packageId: 'putty', installCmd: 'sudo apt update && sudo apt install -y putty' }
      ]
    },
    rating: 4.7,
    downloads: '35M+',
    isTrending: false
  },
  {
    id: 'foxit-reader',
    name: 'Foxit PDF Reader',
    description: 'Fast, lightweight freeware PDF viewer and annotation software with tabbed reading, form filling, and digital signatures.',
    category: 'productivity',
    website: 'https://www.foxit.com/pdf-reader/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Foxit.FoxitReader', installCmd: 'winget install --id Foxit.FoxitReader -e' },
        { manager: 'choco', packageId: 'foxitreader', installCmd: 'choco install foxitreader -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'foxitreader', installCmd: 'brew install --cask foxitreader' }
      ]
    },
    rating: 4.6,
    downloads: '28M+',
    isTrending: false
  },
  {
    id: 'sumatrapdf',
    name: 'Sumatra PDF',
    description: 'Ultra-fast, minimalist freeware reader for PDF, ePub, MOBI, CBZ, CBR, DjVu, and XPS documents with zero bloat.',
    category: 'productivity',
    website: 'https://www.sumatrapdfreader.org/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'SumatraPDF.SumatraPDF', installCmd: 'winget install --id SumatraPDF.SumatraPDF -e' },
        { manager: 'choco', packageId: 'sumatrapdf', installCmd: 'choco install sumatrapdf -y' }
      ]
    },
    rating: 4.8,
    downloads: '14M+',
    isTrending: false
  },
  {
    id: 'calibre',
    name: 'Calibre eBook Manager',
    description: 'Complete freeware e-book library management solution supporting format conversion, e-reader sync, and metadata fetching.',
    category: 'productivity',
    website: 'https://calibre-ebook.com/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'calibre.calibre', installCmd: 'winget install --id calibre.calibre -e' },
        { manager: 'choco', packageId: 'calibre', installCmd: 'choco install calibre -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'calibre', installCmd: 'brew install --cask calibre' }
      ],
      linux: [
        { manager: 'apt', packageId: 'calibre', installCmd: 'sudo apt update && sudo apt install -y calibre' },
        { manager: 'flatpak', packageId: 'com.calibre_ebook.calibre', installCmd: 'flatpak install flathub com.calibre_ebook.calibre -y' }
      ]
    },
    rating: 4.7,
    downloads: '16M+',
    isTrending: false
  },
  {
    id: 'onlyoffice',
    name: 'ONLYOFFICE Desktop Editors',
    description: 'Freeware office suite for text documents, spreadsheets, presentations, and fillable PDF forms with high MS Office compatibility.',
    category: 'productivity',
    website: 'https://www.onlyoffice.com/desktop.aspx',
    license: 'Freeware (AGPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'ONLYOFFICE.DesktopEditors', installCmd: 'winget install --id ONLYOFFICE.DesktopEditors -e' },
        { manager: 'choco', packageId: 'onlyoffice', installCmd: 'choco install onlyoffice -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'onlyoffice', installCmd: 'brew install --cask onlyoffice' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.onlyoffice.desktopeditors', installCmd: 'flatpak install flathub org.onlyoffice.desktopeditors -y' },
        { manager: 'snap', packageId: 'onlyoffice-desktopeditors', installCmd: 'sudo snap install onlyoffice-desktopeditors' }
      ]
    },
    rating: 4.6,
    downloads: '12M+',
    isTrending: false
  },
  {
    id: 'powertoys',
    name: 'Microsoft PowerToys',
    description: 'Essential set of freeware Windows system utilities (FancyZones, PowerToys Run, Color Picker, Awake, Image Resizer).',
    category: 'utilities',
    website: 'https://learn.microsoft.com/en-us/windows/powertoys/',
    license: 'Freeware (MIT)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Microsoft.PowerToys', installCmd: 'winget install --id Microsoft.PowerToys -e' },
        { manager: 'choco', packageId: 'powertoys', installCmd: 'choco install powertoys -y' }
      ]
    },
    rating: 4.9,
    downloads: '26M+',
    isTrending: true
  },
  {
    id: 'everything',
    name: 'Everything (voidtools)',
    description: 'Lightning-fast freeware desktop search engine for Windows that locates files and folders by name instantaneously.',
    category: 'utilities',
    website: 'https://www.voidtools.com/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'voidtools.Everything', installCmd: 'winget install --id voidtools.Everything -e' },
        { manager: 'choco', packageId: 'everything', installCmd: 'choco install everything -y' }
      ]
    },
    rating: 4.9,
    downloads: '32M+',
    isTrending: true
  },
  {
    id: 'cpuz',
    name: 'CPU-Z',
    description: 'Trusted freeware system profiling and diagnostics software that gathers detailed data on CPU, motherboard, and memory.',
    category: 'utilities',
    website: 'https://www.cpuid.com/softwares/cpu-z.html',
    license: 'Freeware (Proprietary)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'CPUID.CPU-Z', installCmd: 'winget install --id CPUID.CPU-Z -e' },
        { manager: 'choco', packageId: 'cpu-z', installCmd: 'choco install cpu-z -y' }
      ]
    },
    rating: 4.8,
    downloads: '40M+',
    isTrending: false
  },
  {
    id: 'hwmonitor',
    name: 'HWMonitor',
    description: 'Hardware monitoring freeware program that reads PC main health sensors including voltages, fan speeds, and temperatures.',
    category: 'utilities',
    website: 'https://www.cpuid.com/softwares/hwmonitor.html',
    license: 'Freeware (Proprietary)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'CPUID.HWMonitor', installCmd: 'winget install --id CPUID.HWMonitor -e' },
        { manager: 'choco', packageId: 'hwmonitor', installCmd: 'choco install hwmonitor -y' }
      ]
    },
    rating: 4.7,
    downloads: '21M+',
    isTrending: false
  },
  {
    id: 'rufus',
    name: 'Rufus',
    description: 'Reliable, ultra-compact freeware utility to format and create bootable USB flash drives from ISO images.',
    category: 'utilities',
    website: 'https://rufus.ie/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Rufus.Rufus', installCmd: 'winget install --id Rufus.Rufus -e' },
        { manager: 'choco', packageId: 'rufus', installCmd: 'choco install rufus -y' }
      ]
    },
    rating: 4.9,
    downloads: '60M+',
    isTrending: true
  },
  {
    id: 'anydesk',
    name: 'AnyDesk',
    description: 'High-speed, low-latency freeware remote desktop application for personal remote support and cross-platform access.',
    category: 'utilities',
    website: 'https://anydesk.com/',
    license: 'Freeware (Personal Use)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'AnyDeskSoftwareGmbH.AnyDesk', installCmd: 'winget install --id AnyDeskSoftwareGmbH.AnyDesk -e' },
        { manager: 'choco', packageId: 'anydesk', installCmd: 'choco install anydesk -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'anydesk', installCmd: 'brew install --cask anydesk' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.anydesk.Anydesk', installCmd: 'flatpak install flathub com.anydesk.Anydesk -y' }
      ]
    },
    rating: 4.6,
    downloads: '50M+',
    isTrending: false
  },
  {
    id: 'flameshot',
    name: 'Flameshot',
    description: 'Powerful yet simple-to-use freeware screenshot software with built-in in-app annotation, blur, and cloud upload.',
    category: 'utilities',
    website: 'https://flameshot.org/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Flameshot.Flameshot', installCmd: 'winget install --id Flameshot.Flameshot -e' },
        { manager: 'choco', packageId: 'flameshot', installCmd: 'choco install flameshot -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'flameshot', installCmd: 'brew install --cask flameshot' }
      ],
      linux: [
        { manager: 'apt', packageId: 'flameshot', installCmd: 'sudo apt update && sudo apt install -y flameshot' },
        { manager: 'flatpak', packageId: 'org.flameshot.Flameshot', installCmd: 'flatpak install flathub org.flameshot.Flameshot -y' }
      ]
    },
    rating: 4.8,
    downloads: '7.5M',
    isTrending: false
  },
  {
    id: 'figma',
    name: 'Figma Desktop',
    description: 'Collaborative freeware interface design, prototyping, and vector graphics application for modern product teams.',
    category: 'design',
    website: 'https://www.figma.com/',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Figma.Figma', installCmd: 'winget install --id Figma.Figma -e' },
        { manager: 'choco', packageId: 'figma', installCmd: 'choco install figma -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'figma', installCmd: 'brew install --cask figma' }
      ]
    },
    rating: 4.9,
    downloads: '38M+',
    isTrending: true
  },
  {
    id: 'paintdotnet',
    name: 'Paint.NET',
    description: 'Intuitive freeware image and photo editing software for Windows supporting layers, unlimited undo, and special effects.',
    category: 'design',
    website: 'https://www.getpaint.net/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'dotPDN.PaintDotNet', installCmd: 'winget install --id dotPDN.PaintDotNet -e' },
        { manager: 'choco', packageId: 'paint.net', installCmd: 'choco install paint.net -y' }
      ]
    },
    rating: 4.8,
    downloads: '29M+',
    isTrending: false
  },
  {
    id: 'irfanview',
    name: 'IrfanView',
    description: 'Fast, compact, and innovative freeware graphic viewer, converter, and batch organizer for Windows.',
    category: 'design',
    website: 'https://www.irfanview.com/',
    license: 'Freeware (Personal Use)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'IrfanSkiljan.IrfanView', installCmd: 'winget install --id IrfanSkiljan.IrfanView -e' },
        { manager: 'choco', packageId: 'irfanview', installCmd: 'choco install irfanview -y' }
      ]
    },
    rating: 4.7,
    downloads: '34M+',
    isTrending: false
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Digital music, podcast, and audio streaming freeware desktop player giving access to millions of songs worldwide.',
    category: 'media',
    website: 'https://www.spotify.com/',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Spotify.Spotify', installCmd: 'winget install --id Spotify.Spotify -e' },
        { manager: 'choco', packageId: 'spotify', installCmd: 'choco install spotify -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'spotify', installCmd: 'brew install --cask spotify' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.spotify.Client', installCmd: 'flatpak install flathub com.spotify.Client -y' },
        { manager: 'snap', packageId: 'spotify', installCmd: 'sudo snap install spotify' }
      ]
    },
    rating: 4.8,
    downloads: '110M+',
    isTrending: true
  },
  {
    id: 'foobar2000',
    name: 'foobar2000',
    description: 'Advanced freeware audio player known for its highly modular layout, gapless playback, and lossless format support.',
    category: 'media',
    website: 'https://www.foobar2000.org/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'PeterPawlowski.foobar2000', installCmd: 'winget install --id PeterPawlowski.foobar2000 -e' },
        { manager: 'choco', packageId: 'foobar2000', installCmd: 'choco install foobar2000 -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'foobar2000', installCmd: 'brew install --cask foobar2000' }
      ]
    },
    rating: 4.8,
    downloads: '19M+',
    isTrending: false
  },
  {
    id: 'kdenlive',
    name: 'Kdenlive',
    description: 'Full-featured freeware and open-source non-linear video editor supporting multi-track timeline editing and effects.',
    category: 'media',
    website: 'https://kdenlive.org/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'KDE.Kdenlive', installCmd: 'winget install --id KDE.Kdenlive -e' },
        { manager: 'choco', packageId: 'kdenlive', installCmd: 'choco install kdenlive -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'kdenlive', installCmd: 'brew install --cask kdenlive' }
      ],
      linux: [
        { manager: 'apt', packageId: 'kdenlive', installCmd: 'sudo apt update && sudo apt install -y kdenlive' },
        { manager: 'flatpak', packageId: 'org.kde.kdenlive', installCmd: 'flatpak install flathub org.kde.kdenlive -y' }
      ]
    },
    rating: 4.7,
    downloads: '9.4M',
    isTrending: false
  },
  {
    id: 'protonvpn',
    name: 'Proton VPN',
    description: 'High-speed Swiss security freeware VPN application that safeguards privacy with an unlimited free data tier.',
    category: 'security',
    website: 'https://protonvpn.com/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'ProtonTechnologies.ProtonVPN', installCmd: 'winget install --id ProtonTechnologies.ProtonVPN -e' },
        { manager: 'choco', packageId: 'protonvpn', installCmd: 'choco install protonvpn -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'protonvpn', installCmd: 'brew install --cask protonvpn' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.protonvpn.www', installCmd: 'flatpak install flathub com.protonvpn.www -y' }
      ]
    },
    rating: 4.8,
    downloads: '24M+',
    isTrending: true
  },
  {
    id: 'malwarebytes',
    name: 'Malwarebytes Free',
    description: 'Trusted freeware anti-malware and spyware scanner that detects and removes ransomware, trojans, and adware.',
    category: 'security',
    website: 'https://www.malwarebytes.com/',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Malwarebytes.Malwarebytes', installCmd: 'winget install --id Malwarebytes.Malwarebytes -e' },
        { manager: 'choco', packageId: 'malwarebytes', installCmd: 'choco install malwarebytes -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'malwarebytes', installCmd: 'brew install --cask malwarebytes' }
      ]
    },
    rating: 4.7,
    downloads: '42M+',
    isTrending: false
  },
  {
    id: 'veracrypt',
    name: 'VeraCrypt',
    description: 'Audited freeware disk encryption software for creating encrypted virtual disks and securing full partitions.',
    category: 'security',
    website: 'https://www.veracrypt.fr/',
    license: 'Freeware (Apache-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'IDRIX.VeraCrypt', installCmd: 'winget install --id IDRIX.VeraCrypt -e' },
        { manager: 'choco', packageId: 'veracrypt', installCmd: 'choco install veracrypt -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'veracrypt', installCmd: 'brew install --cask veracrypt' }
      ],
      linux: [
        { manager: 'apt', packageId: 'veracrypt', installCmd: 'sudo apt update && sudo apt install -y veracrypt' }
      ]
    },
    rating: 4.8,
    downloads: '11M+',
    isTrending: false
  },
  {
    id: 'tor-browser',
    name: 'Tor Browser',
    description: 'Privacy-hardened freeware web browser that routes traffic through the distributed Tor anonymity network.',
    category: 'security',
    website: 'https://www.torproject.org/',
    license: 'Freeware (BSD-3-Clause)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'TorProject.TorBrowser', installCmd: 'winget install --id TorProject.TorBrowser -e' },
        { manager: 'choco', packageId: 'tor-browser', installCmd: 'choco install tor-browser -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'tor-browser', installCmd: 'brew install --cask tor-browser' }
      ],
      linux: [
        { manager: 'apt', packageId: 'torbrowser-launcher', installCmd: 'sudo apt update && sudo apt install -y torbrowser-launcher' },
        { manager: 'flatpak', packageId: 'org.torproject.torbrowser-launcher', installCmd: 'flatpak install flathub org.torproject.torbrowser-launcher -y' }
      ]
    },
    rating: 4.8,
    downloads: '19M+',
    isTrending: false
  },

  // --- EXPANDED FREEWARE CATALOG ---
  {
    id: 'opera',
    name: 'Opera Browser',
    description: 'Feature-rich freeware web browser with built-in ad blocker, workspace tab islands, battery saver, and integrated free VPN.',
    category: 'internet',
    website: 'https://www.opera.com/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Opera.Opera', installCmd: 'winget install --id Opera.Opera -e' },
        { manager: 'choco', packageId: 'opera', installCmd: 'choco install opera -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'opera', installCmd: 'brew install --cask opera' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.opera.Opera', installCmd: 'flatpak install flathub com.opera.Opera -y' },
        { manager: 'snap', packageId: 'opera', installCmd: 'sudo snap install opera' }
      ]
    },
    rating: 4.6,
    downloads: '42M+',
    isTrending: false
  },
  {
    id: 'vivaldi',
    name: 'Vivaldi Browser',
    description: 'Ultra-customizable freeware web browser for power users featuring tab stacks, split-screen tiling, and built-in mail & calendar.',
    category: 'internet',
    website: 'https://vivaldi.com/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Vivaldi.Vivaldi', installCmd: 'winget install --id Vivaldi.Vivaldi -e' },
        { manager: 'choco', packageId: 'vivaldi', installCmd: 'choco install vivaldi -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'vivaldi', installCmd: 'brew install --cask vivaldi' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.vivaldi.Vivaldi', installCmd: 'flatpak install flathub com.vivaldi.Vivaldi -y' }
      ]
    },
    rating: 4.7,
    downloads: '14M+',
    isTrending: false
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Desktop',
    description: 'Official freeware desktop messaging and voice/video calling client with end-to-end encryption synchronized across devices.',
    category: 'internet',
    website: 'https://www.whatsapp.com/download',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: '9NKSQGP7F2NH', installCmd: 'winget install --id 9NKSQGP7F2NH -e' },
        { manager: 'choco', packageId: 'whatsapp', installCmd: 'choco install whatsapp -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'whatsapp', installCmd: 'brew install --cask whatsapp' }
      ]
    },
    rating: 4.7,
    downloads: '75M+',
    isTrending: true
  },
  {
    id: 'signal',
    name: 'Signal Desktop',
    description: 'Non-profit, privacy-first freeware messenger offering state-of-the-art end-to-end encrypted chats, voice, and video calls.',
    category: 'internet',
    website: 'https://signal.org/',
    license: 'Freeware (AGPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'OpenWhisperSystems.Signal', installCmd: 'winget install --id OpenWhisperSystems.Signal -e' },
        { manager: 'choco', packageId: 'signal', installCmd: 'choco install signal -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'signal', installCmd: 'brew install --cask signal' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.signal.Signal', installCmd: 'flatpak install flathub org.signal.Signal -y' },
        { manager: 'snap', packageId: 'signal-desktop', installCmd: 'sudo snap install signal-desktop' }
      ]
    },
    rating: 4.9,
    downloads: '32M+',
    isTrending: true
  },
  {
    id: 'cyberduck',
    name: 'Cyberduck',
    description: 'Freeware cloud storage and file transfer browser for FTP, SFTP, WebDAV, Amazon S3, Google Drive, and Backblaze B2.',
    category: 'internet',
    website: 'https://cyberduck.io/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Iterate.Cyberduck', installCmd: 'winget install --id Iterate.Cyberduck -e' },
        { manager: 'choco', packageId: 'cyberduck', installCmd: 'choco install cyberduck -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'cyberduck', installCmd: 'brew install --cask cyberduck' }
      ]
    },
    rating: 4.7,
    downloads: '11M+',
    isTrending: false
  },
  {
    id: 'fdm',
    name: 'Free Download Manager',
    description: 'Multi-platform freeware download accelerator and manager supporting HTTP/HTTPS, FTP, and BitTorrent streams.',
    category: 'internet',
    website: 'https://www.freedownloadmanager.org/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'SoftDeluxe.FreeDownloadManager', installCmd: 'winget install --id SoftDeluxe.FreeDownloadManager -e' },
        { manager: 'choco', packageId: 'freedownloadmanager', installCmd: 'choco install freedownloadmanager -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'free-download-manager', installCmd: 'brew install --cask free-download-manager' }
      ],
      linux: [
        { manager: 'apt', packageId: 'freedownloadmanager', installCmd: 'sudo apt update && sudo apt install -y wget' }
      ]
    },
    rating: 4.6,
    downloads: '17M+',
    isTrending: false
  },
  {
    id: 'sublime-text',
    name: 'Sublime Text 4',
    description: 'Lightning-fast, cross-platform code and text editor featuring Goto Anything, multiple selections, and GPU rendering.',
    category: 'development',
    website: 'https://www.sublimetext.com/',
    license: 'Freeware (Evaluation)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'SublimeHQ.SublimeText.4', installCmd: 'winget install --id SublimeHQ.SublimeText.4 -e' },
        { manager: 'choco', packageId: 'sublimetext4', installCmd: 'choco install sublimetext4 -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'sublime-text', installCmd: 'brew install --cask sublime-text' }
      ],
      linux: [
        { manager: 'snap', packageId: 'sublime-text', installCmd: 'sudo snap install sublime-text --classic' },
        { manager: 'flatpak', packageId: 'com.sublimetext.three', installCmd: 'flatpak install flathub com.sublimetext.three -y' }
      ]
    },
    rating: 4.8,
    downloads: '36M+',
    isTrending: true
  },
  {
    id: 'vscodium',
    name: 'VSCodium',
    description: '100% open-source, telemetry-free freeware binary distribution of Visual Studio Code built directly from MIT-licensed source.',
    category: 'development',
    website: 'https://vscodium.com/',
    license: 'Freeware (MIT)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'VSCodium.VSCodium', installCmd: 'winget install --id VSCodium.VSCodium -e' },
        { manager: 'choco', packageId: 'vscodium', installCmd: 'choco install vscodium -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'vscodium', installCmd: 'brew install --cask vscodium' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.vscodium.codium', installCmd: 'flatpak install flathub com.vscodium.codium -y' },
        { manager: 'snap', packageId: 'codium', installCmd: 'sudo snap install codium --classic' }
      ]
    },
    rating: 4.8,
    downloads: '9.8M',
    isTrending: false
  },
  {
    id: 'android-studio',
    name: 'Android Studio',
    description: 'Official freeware Integrated Development Environment (IDE) for Google Android app development, emulation, and APK profiling.',
    category: 'development',
    website: 'https://developer.android.com/studio',
    license: 'Freeware (Apache-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Google.AndroidStudio', installCmd: 'winget install --id Google.AndroidStudio -e' },
        { manager: 'choco', packageId: 'androidstudio', installCmd: 'choco install androidstudio -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'android-studio', installCmd: 'brew install --cask android-studio' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.google.AndroidStudio', installCmd: 'flatpak install flathub com.google.AndroidStudio -y' },
        { manager: 'snap', packageId: 'android-studio', installCmd: 'sudo snap install android-studio --classic' }
      ]
    },
    rating: 4.7,
    downloads: '29M+',
    isTrending: false
  },
  {
    id: 'heidisql',
    name: 'HeidiSQL',
    description: 'Lightweight, fast freeware SQL GUI client for managing MariaDB, MySQL, Microsoft SQL, PostgreSQL, and SQLite databases.',
    category: 'development',
    website: 'https://www.heidisql.com/',
    license: 'Freeware (GPL-2.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'HeidiSQL.HeidiSQL', installCmd: 'winget install --id HeidiSQL.HeidiSQL -e' },
        { manager: 'choco', packageId: 'heidisql', installCmd: 'choco install heidisql -y' }
      ]
    },
    rating: 4.8,
    downloads: '13M+',
    isTrending: false
  },
  {
    id: 'mobaxterm',
    name: 'MobaXterm Home Edition',
    description: 'Enhanced freeware terminal for Windows with an embedded X11 server, tabbed SSH client, SFTP browser, and network utilities.',
    category: 'development',
    website: 'https://mobaxterm.mobatek.net/',
    license: 'Freeware (Home Edition)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Mobatek.MobaXterm', installCmd: 'winget install --id Mobatek.MobaXterm -e' },
        { manager: 'choco', packageId: 'mobaxterm', installCmd: 'choco install mobaxterm -y' }
      ]
    },
    rating: 4.8,
    downloads: '15M+',
    isTrending: false
  },
  {
    id: 'nmap',
    name: 'Nmap & Zenmap',
    description: 'Industry-standard freeware network discovery, port scanning, and security auditing utility for system administrators.',
    category: 'development',
    website: 'https://nmap.org/',
    license: 'Freeware (NPSL)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Insecure.Nmap', installCmd: 'winget install --id Insecure.Nmap -e' },
        { manager: 'choco', packageId: 'nmap', installCmd: 'choco install nmap -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'nmap', installCmd: 'brew install nmap' }
      ],
      linux: [
        { manager: 'apt', packageId: 'nmap', installCmd: 'sudo apt update && sudo apt install -y nmap' }
      ]
    },
    rating: 4.9,
    downloads: '27M+',
    isTrending: false
  },
  {
    id: 'pdfgear',
    name: 'PDFgear',
    description: 'Full-featured freeware PDF editor, reader, converter, merger, and OCR utility with zero watermarks or sign-up requirements.',
    category: 'productivity',
    website: 'https://www.pdfgear.com/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'PDFgear.PDFgear', installCmd: 'winget install --id PDFgear.PDFgear -e' }
      ],
      macos: [
        { manager: 'brew', packageId: 'pdfgear', installCmd: 'brew install --cask pdfgear' }
      ]
    },
    rating: 4.9,
    downloads: '11M+',
    isTrending: true
  },
  {
    id: 'okular',
    name: 'Okular Document Viewer',
    description: 'Universal cross-platform freeware document viewer developed by KDE supporting PDF annotations, ePub, DjVu, and Markdown.',
    category: 'productivity',
    website: 'https://okular.kde.org/',
    license: 'Freeware (GPL-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'KDE.Okular', installCmd: 'winget install --id KDE.Okular -e' },
        { manager: 'choco', packageId: 'okular', installCmd: 'choco install okular -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'okular', installCmd: 'brew install --cask okular' }
      ],
      linux: [
        { manager: 'apt', packageId: 'okular', installCmd: 'sudo apt update && sudo apt install -y okular' },
        { manager: 'flatpak', packageId: 'org.kde.okular', installCmd: 'flatpak install flathub org.kde.okular -y' }
      ]
    },
    rating: 4.7,
    downloads: '8.4M+',
    isTrending: false
  },
  {
    id: 'joplin',
    name: 'Joplin',
    description: 'Open-source freeware Markdown note-taking and to-do application with end-to-end encrypted synchronization and web clipper.',
    category: 'productivity',
    website: 'https://joplinapp.org/',
    license: 'Freeware (AGPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Joplin.Joplin', installCmd: 'winget install --id Joplin.Joplin -e' },
        { manager: 'choco', packageId: 'joplin', installCmd: 'choco install joplin -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'joplin', installCmd: 'brew install --cask joplin' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'net.cozic.joplin_desktop', installCmd: 'flatpak install flathub net.cozic.joplin_desktop -y' },
        { manager: 'snap', packageId: 'joplin-desktop', installCmd: 'sudo snap install joplin-desktop' }
      ]
    },
    rating: 4.8,
    downloads: '10M+',
    isTrending: false
  },
  {
    id: 'anki',
    name: 'Anki',
    description: 'Powerful, intelligent spaced-repetition flashcard freeware program that makes remembering concepts and languages effortless.',
    category: 'productivity',
    website: 'https://apps.ankiweb.net/',
    license: 'Freeware (AGPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Anki.Anki', installCmd: 'winget install --id Anki.Anki -e' },
        { manager: 'choco', packageId: 'anki', installCmd: 'choco install anki -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'anki', installCmd: 'brew install --cask anki' }
      ],
      linux: [
        { manager: 'apt', packageId: 'anki', installCmd: 'sudo apt update && sudo apt install -y anki' },
        { manager: 'flatpak', packageId: 'net.ankiweb.Anki', installCmd: 'flatpak install flathub net.ankiweb.Anki -y' }
      ]
    },
    rating: 4.9,
    downloads: '15M+',
    isTrending: true
  },
  {
    id: 'zotero',
    name: 'Zotero',
    description: 'Freeware personal research assistant to collect, organize, annotate PDFs, cite publications, and share bibliographies.',
    category: 'productivity',
    website: 'https://www.zotero.org/',
    license: 'Freeware (AGPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'DigitalScholar.Zotero', installCmd: 'winget install --id DigitalScholar.Zotero -e' },
        { manager: 'choco', packageId: 'zotero', installCmd: 'choco install zotero -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'zotero', installCmd: 'brew install --cask zotero' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.zotero.Zotero', installCmd: 'flatpak install flathub org.zotero.Zotero -y' }
      ]
    },
    rating: 4.8,
    downloads: '9.2M+',
    isTrending: false
  },
  {
    id: 'todoist',
    name: 'Todoist',
    description: 'Clean, cross-platform freeware task manager and to-do list organizer with natural language date parsing and project boards.',
    category: 'productivity',
    website: 'https://todoist.com/',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Doist.Todoist', installCmd: 'winget install --id Doist.Todoist -e' }
      ],
      macos: [
        { manager: 'brew', packageId: 'todoist', installCmd: 'brew install --cask todoist' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.todoist.Todoist', installCmd: 'flatpak install flathub com.todoist.Todoist -y' },
        { manager: 'snap', packageId: 'todoist', installCmd: 'sudo snap install todoist' }
      ]
    },
    rating: 4.7,
    downloads: '18M+',
    isTrending: false
  },
  {
    id: 'windirstat',
    name: 'WinDirStat',
    description: 'Classic freeware disk usage statistics viewer and treemap cleanup tool for analyzing storage consumption on Windows.',
    category: 'utilities',
    website: 'https://windirstat.net/',
    license: 'Freeware (GPL-2.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'WinDirStat.WinDirStat', installCmd: 'winget install --id WinDirStat.WinDirStat -e' },
        { manager: 'choco', packageId: 'windirstat', installCmd: 'choco install windirstat -y' }
      ]
    },
    rating: 4.8,
    downloads: '23M+',
    isTrending: false
  },
  {
    id: 'sharex',
    name: 'ShareX',
    description: 'Feature-packed freeware screen capture, GIF/video screen recorder, OCR, color picker, and automated workflow tool.',
    category: 'utilities',
    website: 'https://getsharex.com/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'ShareX.ShareX', installCmd: 'winget install --id ShareX.ShareX -e' },
        { manager: 'choco', packageId: 'sharex', installCmd: 'choco install sharex -y' }
      ]
    },
    rating: 4.9,
    downloads: '19M+',
    isTrending: true
  },
  {
    id: 'autohotkey',
    name: 'AutoHotkey',
    description: 'Powerful freeware automation scripting language for Windows allowing custom keyboard shortcuts, macros, and text expansion.',
    category: 'utilities',
    website: 'https://www.autohotkey.com/',
    license: 'Freeware (GPL-2.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'AutoHotkey.AutoHotkey', installCmd: 'winget install --id AutoHotkey.AutoHotkey -e' },
        { manager: 'choco', packageId: 'autohotkey', installCmd: 'choco install autohotkey -y' }
      ]
    },
    rating: 4.8,
    downloads: '20M+',
    isTrending: false
  },
  {
    id: 'treesize-free',
    name: 'TreeSize Free',
    description: 'High-speed freeware disk space manager that scans drives via Master File Table (MFT) to pinpoint large folders.',
    category: 'utilities',
    website: 'https://www.jam-software.com/treesize_free',
    license: 'Freeware (Proprietary)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'JAMSoftware.TreeSize.Free', installCmd: 'winget install --id JAMSoftware.TreeSize.Free -e' },
        { manager: 'choco', packageId: 'treesizefree', installCmd: 'choco install treesizefree -y' }
      ]
    },
    rating: 4.8,
    downloads: '16M+',
    isTrending: false
  },
  {
    id: 'crystaldiskinfo',
    name: 'CrystalDiskInfo',
    description: 'Essential HDD/SSD and NVMe health monitoring freeware utility that inspects S.M.A.R.T. attributes and drive temperatures.',
    category: 'utilities',
    website: 'https://crystalmark.info/en/software/crystaldiskinfo/',
    license: 'Freeware (MIT)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'CrystalDewWorld.CrystalDiskInfo', installCmd: 'winget install --id CrystalDewWorld.CrystalDiskInfo -e' },
        { manager: 'choco', packageId: 'crystaldiskinfo', installCmd: 'choco install crystaldiskinfo -y' }
      ]
    },
    rating: 4.9,
    downloads: '25M+',
    isTrending: true
  },
  {
    id: 'crystaldiskmark',
    name: 'CrystalDiskMark',
    description: 'Industry-standard freeware storage benchmark utility to measure sequential and random read/write speeds of SSDs and drives.',
    category: 'utilities',
    website: 'https://crystalmark.info/en/software/crystaldiskmark/',
    license: 'Freeware (MIT)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'CrystalDewWorld.CrystalDiskMark', installCmd: 'winget install --id CrystalDewWorld.CrystalDiskMark -e' },
        { manager: 'choco', packageId: 'crystaldiskmark', installCmd: 'choco install crystaldiskmark -y' }
      ]
    },
    rating: 4.9,
    downloads: '28M+',
    isTrending: false
  },
  {
    id: 'recuva',
    name: 'Recuva',
    description: 'Reliable freeware file recovery utility capable of restoring accidentally deleted files from hard drives, USBs, and SD cards.',
    category: 'utilities',
    website: 'https://www.ccleaner.com/recuva',
    license: 'Freeware (Proprietary)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Piriform.Recuva', installCmd: 'winget install --id Piriform.Recuva -e' },
        { manager: 'choco', packageId: 'recuva', installCmd: 'choco install recuva -y' }
      ]
    },
    rating: 4.5,
    downloads: '31M+',
    isTrending: false
  },
  {
    id: 'speccy',
    name: 'Speccy',
    description: 'Fast, lightweight system information freeware utility providing detailed statistics on every piece of hardware in your PC.',
    category: 'utilities',
    website: 'https://www.ccleaner.com/speccy',
    license: 'Freeware (Proprietary)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Piriform.Speccy', installCmd: 'winget install --id Piriform.Speccy -e' },
        { manager: 'choco', packageId: 'speccy', installCmd: 'choco install speccy -y' }
      ]
    },
    rating: 4.6,
    downloads: '24M+',
    isTrending: false
  },
  {
    id: 'teamviewer',
    name: 'TeamViewer',
    description: 'Comprehensive freeware remote access, remote desktop control, and cross-platform troubleshooting software for personal use.',
    category: 'utilities',
    website: 'https://www.teamviewer.com/',
    license: 'Freeware (Personal Use)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'TeamViewer.TeamViewer', installCmd: 'winget install --id TeamViewer.TeamViewer -e' },
        { manager: 'choco', packageId: 'teamviewer', installCmd: 'choco install teamviewer -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'teamviewer', installCmd: 'brew install --cask teamviewer' }
      ],
      linux: [
        { manager: 'apt', packageId: 'teamviewer', installCmd: 'sudo apt update && sudo apt install -y wget' }
      ]
    },
    rating: 4.6,
    downloads: '65M+',
    isTrending: false
  },
  {
    id: 'rustdesk',
    name: 'RustDesk',
    description: 'Open-source, zero-configuration freeware remote desktop application built in Rust as a self-hostable TeamViewer alternative.',
    category: 'utilities',
    website: 'https://rustdesk.com/',
    license: 'Freeware (AGPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'RustDesk.RustDesk', installCmd: 'winget install --id RustDesk.RustDesk -e' },
        { manager: 'choco', packageId: 'rustdesk', installCmd: 'choco install rustdesk -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'rustdesk', installCmd: 'brew install --cask rustdesk' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.rustdesk.RustDesk', installCmd: 'flatpak install flathub com.rustdesk.RustDesk -y' }
      ]
    },
    rating: 4.9,
    downloads: '14M+',
    isTrending: true
  },
  {
    id: 'xnviewmp',
    name: 'XnView MP',
    description: 'Versatile and fast freeware photo viewer, image manager, and batch converter supporting over 500 image formats.',
    category: 'design',
    website: 'https://www.xnview.com/en/xnviewmp/',
    license: 'Freeware (Personal Use)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'XnSoft.XnViewMP', installCmd: 'winget install --id XnSoft.XnViewMP -e' },
        { manager: 'choco', packageId: 'xnviewmp', installCmd: 'choco install xnviewmp -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'xnviewmp', installCmd: 'brew install --cask xnviewmp' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.xnview.XnViewMP', installCmd: 'flatpak install flathub com.xnview.XnViewMP -y' }
      ]
    },
    rating: 4.8,
    downloads: '12M+',
    isTrending: false
  },
  {
    id: 'sweethome3d',
    name: 'Sweet Home 3D',
    description: 'Freeware interior design application that helps you draw floor plans, arrange furniture, and preview results in 3D.',
    category: 'design',
    website: 'https://www.sweethome3d.com/',
    license: 'Freeware (GPL-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'eTeks.SweetHome3D', installCmd: 'winget install --id eTeks.SweetHome3D -e' },
        { manager: 'choco', packageId: 'sweethome3d', installCmd: 'choco install sweethome3d -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'sweet-home3d', installCmd: 'brew install --cask sweet-home3d' }
      ],
      linux: [
        { manager: 'apt', packageId: 'sweethome3d', installCmd: 'sudo apt update && sudo apt install -y sweethome3d' },
        { manager: 'flatpak', packageId: 'com.sweethome3d.Sweethome3d', installCmd: 'flatpak install flathub com.sweethome3d.Sweethome3d -y' }
      ]
    },
    rating: 4.6,
    downloads: '8.7M+',
    isTrending: false
  },
  {
    id: 'scribus',
    name: 'Scribus',
    description: 'Open-source freeware desktop publishing (DTP) and page layout program designed for press-ready PDF and print creation.',
    category: 'design',
    website: 'https://www.scribus.net/',
    license: 'Freeware (GPL-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Scribus.Scribus', installCmd: 'winget install --id Scribus.Scribus -e' },
        { manager: 'choco', packageId: 'scribus', installCmd: 'choco install scribus -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'scribus', installCmd: 'brew install --cask scribus' }
      ],
      linux: [
        { manager: 'apt', packageId: 'scribus', installCmd: 'sudo apt update && sudo apt install -y scribus' },
        { manager: 'flatpak', packageId: 'net.scribus.Scribus', installCmd: 'flatpak install flathub net.scribus.Scribus -y' }
      ]
    },
    rating: 4.5,
    downloads: '6.1M+',
    isTrending: false
  },
  {
    id: 'aimp',
    name: 'AIMP Audio Player',
    description: 'High-fidelity freeware audio player featuring 32-bit sound processing, 20-band equalizer, internet radio capture, and tag editor.',
    category: 'media',
    website: 'https://www.aimp.ru/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'AIMP.AIMP', installCmd: 'winget install --id AIMP.AIMP -e' },
        { manager: 'choco', packageId: 'aimp', installCmd: 'choco install aimp -y' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'ru.aimp.AIMP', installCmd: 'flatpak install flathub ru.aimp.AIMP -y' }
      ]
    },
    rating: 4.8,
    downloads: '21M+',
    isTrending: false
  },
  {
    id: 'mediainfo',
    name: 'MediaInfo',
    description: 'Convenient freeware utility displaying detailed technical and tag metadata for video and audio containers (codec, bitrate, fps).',
    category: 'media',
    website: 'https://mediaarea.net/en/MediaInfo',
    license: 'Freeware (BSD-2-Clause)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'MediaArea.MediaInfo.GUI', installCmd: 'winget install --id MediaArea.MediaInfo.GUI -e' },
        { manager: 'choco', packageId: 'mediainfo', installCmd: 'choco install mediainfo -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'mediainfo', installCmd: 'brew install --cask mediainfo' }
      ],
      linux: [
        { manager: 'apt', packageId: 'mediainfo-gui', installCmd: 'sudo apt update && sudo apt install -y mediainfo-gui' },
        { manager: 'flatpak', packageId: 'net.mediaarea.MediaInfo', installCmd: 'flatpak install flathub net.mediaarea.MediaInfo -y' }
      ]
    },
    rating: 4.8,
    downloads: '13M+',
    isTrending: false
  },
  {
    id: 'plex',
    name: 'Plex Desktop',
    description: 'Sleek freeware media player and streaming client for organizing personal video/music collections and watching free live TV.',
    category: 'media',
    website: 'https://www.plex.tv/',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Plex.Plex', installCmd: 'winget install --id Plex.Plex -e' },
        { manager: 'choco', packageId: 'plex', installCmd: 'choco install plex -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'plex', installCmd: 'brew install --cask plex' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'tv.plex.PlexDesktop', installCmd: 'flatpak install flathub tv.plex.PlexDesktop -y' },
        { manager: 'snap', packageId: 'plex-desktop', installCmd: 'sudo snap install plex-desktop' }
      ]
    },
    rating: 4.7,
    downloads: '33M+',
    isTrending: false
  },
  {
    id: 'cryptomator',
    name: 'Cryptomator',
    description: 'Open-source freeware client-side encryption tool that secures files stored in cloud services like Google Drive, Dropbox, and OneDrive.',
    category: 'security',
    website: 'https://cryptomator.org/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Skymatic.Cryptomator', installCmd: 'winget install --id Skymatic.Cryptomator -e' },
        { manager: 'choco', packageId: 'cryptomator', installCmd: 'choco install cryptomator -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'cryptomator', installCmd: 'brew install --cask cryptomator' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.cryptomator.Cryptomator', installCmd: 'flatpak install flathub org.cryptomator.Cryptomator -y' }
      ]
    },
    rating: 4.8,
    downloads: '6.8M+',
    isTrending: true
  },
  {
    id: 'mullvad-browser',
    name: 'Mullvad Browser',
    description: 'Privacy-focused freeware web browser engineered in collaboration with the Tor Project to minimize tracking and fingerprinting.',
    category: 'security',
    website: 'https://mullvad.net/en/browser',
    license: 'Freeware (MPL-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'MullvadVPN.MullvadBrowser', installCmd: 'winget install --id MullvadVPN.MullvadBrowser -e' },
        { manager: 'choco', packageId: 'mullvad-browser', installCmd: 'choco install mullvad-browser -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'mullvad-browser', installCmd: 'brew install --cask mullvad-browser' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'net.mullvad.MullvadBrowser', installCmd: 'flatpak install flathub net.mullvad.MullvadBrowser -y' }
      ]
    },
    rating: 4.8,
    downloads: '5.4M+',
    isTrending: false
  },
  {
    id: 'glasswire',
    name: 'GlassWire Firewall',
    description: 'Visual freeware network security monitor and firewall that graphs real-time bandwidth activity and alerts on new connections.',
    category: 'security',
    website: 'https://www.glasswire.com/',
    license: 'Freeware (Freemium)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'GlassWire.GlassWire', installCmd: 'winget install --id GlassWire.GlassWire -e' },
        { manager: 'choco', packageId: 'glasswire', installCmd: 'choco install glasswire -y' }
      ]
    },
    rating: 4.6,
    downloads: '12M+',
    isTrending: false
  },

  // --- OFFICE USES & WORKPLACE FREEWARE SUITE ---
  {
    id: 'onlyoffice-desktop',
    name: 'ONLYOFFICE Desktop Editors',
    description: 'Comprehensive freeware office suite for word documents, spreadsheets, presentations, and fillable PDF forms with 100% MS Office compatibility.',
    category: 'productivity',
    website: 'https://www.onlyoffice.com/desktop.aspx',
    license: 'Freeware (AGPL-3.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'ONLYOFFICE.DesktopEditors', installCmd: 'winget install --id ONLYOFFICE.DesktopEditors -e' },
        { manager: 'choco', packageId: 'onlyoffice', installCmd: 'choco install onlyoffice -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'onlyoffice', installCmd: 'brew install --cask onlyoffice' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.onlyoffice.desktopeditors', installCmd: 'flatpak install flathub org.onlyoffice.desktopeditors -y' },
        { manager: 'snap', packageId: 'onlyoffice-desktopeditors', installCmd: 'sudo snap install onlyoffice-desktopeditors' }
      ]
    },
    rating: 4.8,
    downloads: '22M+',
    isTrending: true
  },
  {
    id: 'wps-office',
    name: 'WPS Office Free',
    description: 'All-in-one freeware office suite featuring Writer, Spreadsheets, Presentation, and built-in PDF toolkit with tabbed document workspace.',
    category: 'productivity',
    website: 'https://www.wps.com/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Kingsoft.WPSOffice', installCmd: 'winget install --id Kingsoft.WPSOffice -e' },
        { manager: 'choco', packageId: 'wps-office-free', installCmd: 'choco install wps-office-free -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'wpsoffice', installCmd: 'brew install --cask wpsoffice' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.wps.Office', installCmd: 'flatpak install flathub com.wps.Office -y' },
        { manager: 'snap', packageId: 'wps-office', installCmd: 'sudo snap install wps-office' }
      ]
    },
    rating: 4.7,
    downloads: '85M+',
    isTrending: true
  },
  {
    id: 'softmaker-freeoffice',
    name: 'SoftMaker FreeOffice',
    description: 'High-speed office freeware suite (TextMaker, PlanMaker, Presentations) engineered for seamless native DOCX, XLSX, and PPTX editing.',
    category: 'productivity',
    website: 'https://www.freeoffice.com/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'SoftMaker.FreeOffice.2021', installCmd: 'winget install --id SoftMaker.FreeOffice.2021 -e' },
        { manager: 'choco', packageId: 'freeoffice', installCmd: 'choco install freeoffice -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'freeoffice', installCmd: 'brew install --cask freeoffice' }
      ],
      linux: [
        { manager: 'apt', packageId: 'softmaker-freeoffice-2021', installCmd: 'sudo apt update && sudo apt install -y libreoffice' }
      ]
    },
    rating: 4.7,
    downloads: '11M+',
    isTrending: false
  },
  {
    id: 'apache-openoffice',
    name: 'Apache OpenOffice',
    description: 'Classic freeware and open-source office software suite for word processing, spreadsheets, office presentations, vector drawing, and databases.',
    category: 'productivity',
    website: 'https://www.openoffice.org/',
    license: 'Freeware (Apache-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Apache.OpenOffice', installCmd: 'winget install --id Apache.OpenOffice -e' },
        { manager: 'choco', packageId: 'openoffice', installCmd: 'choco install openoffice -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'openoffice', installCmd: 'brew install --cask openoffice' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'org.openoffice.OpenOffice', installCmd: 'flatpak install flathub org.openoffice.OpenOffice -y' }
      ]
    },
    rating: 4.5,
    downloads: '60M+',
    isTrending: false
  },
  {
    id: 'foxit-pdf-reader',
    name: 'Foxit PDF Reader',
    description: 'Enterprise-ready office freeware PDF reader for viewing, annotating, form filling, DocuSign integration, and digital signature verification.',
    category: 'productivity',
    website: 'https://www.foxit.com/pdf-reader/',
    license: 'Freeware (Proprietary)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Foxit.FoxitReader', installCmd: 'winget install --id Foxit.FoxitReader -e' },
        { manager: 'choco', packageId: 'foxitreader', installCmd: 'choco install foxitreader -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'foxitreader', installCmd: 'brew install --cask foxitreader' }
      ]
    },
    rating: 4.7,
    downloads: '52M+',
    isTrending: true
  },
  {
    id: 'pdf24-creator',
    name: 'PDF24 Creator',
    description: 'Swiss-army office freeware PDF utility with virtual PDF printer, document merger, compressor, OCR text recognition, and watermarking.',
    category: 'productivity',
    website: 'https://tools.pdf24.org/en/creator',
    license: 'Freeware (Enterprise & Office Free)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'geeksoftwareGmbH.PDF24Creator', installCmd: 'winget install --id geeksoftwareGmbH.PDF24Creator -e' },
        { manager: 'choco', packageId: 'pdf24', installCmd: 'choco install pdf24 -y' }
      ]
    },
    rating: 4.9,
    downloads: '26M+',
    isTrending: true
  },
  {
    id: 'naps2-scanner',
    name: 'NAPS2 Office Document Scanner',
    description: 'Streamlined office document scanning freeware supporting WIA/TWAIN scanners, batch duplex scanning, and multi-language OCR to searchable PDF.',
    category: 'productivity',
    website: 'https://www.naps2.com/',
    license: 'Freeware (GPL-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Cyanfish.NAPS2', installCmd: 'winget install --id Cyanfish.NAPS2 -e' },
        { manager: 'choco', packageId: 'naps2', installCmd: 'choco install naps2 -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'naps2', installCmd: 'brew install --cask naps2' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.naps2.Naps2', installCmd: 'flatpak install flathub com.naps2.Naps2 -y' }
      ]
    },
    rating: 4.9,
    downloads: '14M+',
    isTrending: false
  },
  {
    id: 'drawio-desktop',
    name: 'Draw.io Desktop (diagrams.net)',
    description: 'Security-first offline office diagramming freeware for flowcharts, org charts, BPMN workflows, UML, and network architecture diagrams.',
    category: 'productivity',
    website: 'https://www.drawio.com/',
    license: 'Freeware (Apache-2.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'JGraph.Draw', installCmd: 'winget install --id JGraph.Draw -e' },
        { manager: 'choco', packageId: 'drawio', installCmd: 'choco install drawio -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'drawio', installCmd: 'brew install --cask drawio' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.jgraph.drawio.desktop', installCmd: 'flatpak install flathub com.jgraph.drawio.desktop -y' },
        { manager: 'snap', packageId: 'drawio', installCmd: 'sudo snap install drawio' }
      ]
    },
    rating: 4.9,
    downloads: '19M+',
    isTrending: true
  },
  {
    id: 'xmind',
    name: 'Xmind Office Mind Mapping',
    description: 'Full-featured office mind mapping, brainstorming, organizational chart, and fishbone strategy planning freeware for business teams.',
    category: 'productivity',
    website: 'https://xmind.app/',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Xmind.Xmind', installCmd: 'winget install --id Xmind.Xmind -e' },
        { manager: 'choco', packageId: 'xmind', installCmd: 'choco install xmind -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'xmind', installCmd: 'brew install --cask xmind' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'net.xmind.XMind', installCmd: 'flatpak install flathub net.xmind.XMind -y' },
        { manager: 'snap', packageId: 'xmind', installCmd: 'sudo snap install xmind' }
      ]
    },
    rating: 4.7,
    downloads: '15M+',
    isTrending: false
  },
  {
    id: 'gnucash',
    name: 'GnuCash Office Accounting',
    description: 'Professional double-entry office accounting, small-business bookkeeping, customer invoicing, payroll, and financial reporting freeware.',
    category: 'productivity',
    website: 'https://www.gnucash.org/',
    license: 'Freeware (GPL-2.0+)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'GnuCash.GnuCash', installCmd: 'winget install --id GnuCash.GnuCash -e' },
        { manager: 'choco', packageId: 'gnucash', installCmd: 'choco install gnucash -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'gnucash', installCmd: 'brew install --cask gnucash' }
      ],
      linux: [
        { manager: 'apt', packageId: 'gnucash', installCmd: 'sudo apt update && sudo apt install -y gnucash' },
        { manager: 'flatpak', packageId: 'org.gnucash.GnuCash', installCmd: 'flatpak install flathub org.gnucash.GnuCash -y' }
      ]
    },
    rating: 4.6,
    downloads: '9.5M+',
    isTrending: false
  },
  {
    id: 'projectlibre',
    name: 'ProjectLibre',
    description: 'Open-source office project management freeware replacing Microsoft Project with Gantt charts, WBS,PERT charts, and resource costing.',
    category: 'productivity',
    website: 'https://www.projectlibre.com/',
    license: 'Freeware (CPAL-1.0)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'ProjectLibre.ProjectLibre', installCmd: 'winget install --id ProjectLibre.ProjectLibre -e' },
        { manager: 'choco', packageId: 'projectlibre', installCmd: 'choco install projectlibre -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'projectlibre', installCmd: 'brew install --cask projectlibre' }
      ],
      linux: [
        { manager: 'snap', packageId: 'projectlibre', installCmd: 'sudo snap install projectlibre' }
      ]
    },
    rating: 4.5,
    downloads: '7.2M+',
    isTrending: false
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Essential office workplace collaboration, video conferencing, enterprise chat, and shared document workspace application.',
    category: 'internet',
    website: 'https://www.microsoft.com/en-us/microsoft-teams/group-chat-software',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Microsoft.Teams', installCmd: 'winget install --id Microsoft.Teams -e' },
        { manager: 'choco', packageId: 'microsoft-teams', installCmd: 'choco install microsoft-teams -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'microsoft-teams', installCmd: 'brew install --cask microsoft-teams' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.github.IsmaelMartinez.teams_for_linux', installCmd: 'flatpak install flathub com.github.IsmaelMartinez.teams_for_linux -y' },
        { manager: 'snap', packageId: 'teams-for-linux', installCmd: 'sudo snap install teams-for-linux' }
      ]
    },
    rating: 4.6,
    downloads: '110M+',
    isTrending: true
  },
  {
    id: 'em-client',
    name: 'eM Client Office Mail',
    description: 'Modern office email, calendar, tasks, contacts, and notes desktop client supporting Exchange, Office 365, Google Workspace, and PGP.',
    category: 'internet',
    website: 'https://www.emclient.com/',
    license: 'Freeware (Personal / Free Tier)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'eMClient.eMClient', installCmd: 'winget install --id eMClient.eMClient -e' },
        { manager: 'choco', packageId: 'em-client', installCmd: 'choco install em-client -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'emclient', installCmd: 'brew install --cask emclient' }
      ]
    },
    rating: 4.7,
    downloads: '10M+',
    isTrending: false
  },
  {
    id: 'grammarly-desktop',
    name: 'Grammarly Desktop',
    description: 'Cross-application office writing assistant for business emails, proposals, and reports with instant grammar, spelling, and tone suggestions.',
    category: 'productivity',
    website: 'https://www.grammarly.com/desktop',
    license: 'Freeware (Freemium)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Grammarly.Grammarly', installCmd: 'winget install --id Grammarly.Grammarly -e' },
        { manager: 'choco', packageId: 'grammarly-for-windows', installCmd: 'choco install grammarly-for-windows -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'grammarly-desktop', installCmd: 'brew install --cask grammarly-desktop' }
      ]
    },
    rating: 4.7,
    downloads: '38M+',
    isTrending: true
  },
  {
    id: 'ditto-clipboard',
    name: 'Ditto Office Clipboard Manager',
    description: 'Essential office productivity extension to the Windows clipboard that saves, searches, and pastes dozens of copied text snippets and tables.',
    category: 'utilities',
    website: 'https://ditto-cp.sourceforge.io/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Ditto.Ditto', installCmd: 'winget install --id Ditto.Ditto -e' },
        { manager: 'choco', packageId: 'ditto', installCmd: 'choco install ditto -y' }
      ]
    },
    rating: 4.8,
    downloads: '13M+',
    isTrending: false
  },
  {
    id: 'microsoft-powertoys',
    name: 'Microsoft PowerToys',
    description: 'Official Microsoft office workstation utilities including FancyZones multi-monitor window snapping, Text Extractor OCR, and Awake.',
    category: 'utilities',
    website: 'https://learn.microsoft.com/en-us/windows/powertoys/',
    license: 'Freeware (MIT)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Microsoft.PowerToys', installCmd: 'winget install --id Microsoft.PowerToys -e' },
        { manager: 'choco', packageId: 'powertoys', installCmd: 'choco install powertoys -y' }
      ]
    },
    rating: 4.9,
    downloads: '48M+',
    isTrending: true
  },

  // --- CORPORATE OFFICE LICENSED & ENTERPRISE COMMERCIAL SOFTWARE ---
  {
    id: 'microsoft-365-enterprise',
    name: 'Microsoft 365 Apps for Enterprise (Office 365)',
    description: 'Industry-standard licensed corporate office suite including Word, Excel, PowerPoint, Outlook, OneNote, Access, and OneDrive for Business.',
    category: 'productivity',
    website: 'https://www.microsoft.com/en-us/microsoft-365/enterprise',
    license: 'Commercial License (Corporate / Enterprise)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Microsoft.Office', installCmd: 'winget install --id Microsoft.Office -e' },
        { manager: 'choco', packageId: 'office365business', installCmd: 'choco install office365business -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'microsoft-office', installCmd: 'brew install --cask microsoft-office' }
      ]
    },
    rating: 4.9,
    downloads: '250M+',
    isTrending: true
  },
  {
    id: 'adobe-acrobat-pro',
    name: 'Adobe Acrobat Pro DC (Corporate License)',
    description: 'Full licensed corporate PDF solution for editing PDFs, legal redaction, Bates numbering, OCR scanning, contract comparison, and Adobe Sign.',
    category: 'productivity',
    website: 'https://www.adobe.com/acrobat/acrobat-pro.html',
    license: 'Commercial License (Corporate / Subscription)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Adobe.Acrobat.Pro', installCmd: 'winget install --id Adobe.Acrobat.Pro -e' },
        { manager: 'choco', packageId: 'adobe-acrobat-pro', installCmd: 'choco install adobereader -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'adobe-acrobat-pro', installCmd: 'brew install --cask adobe-acrobat-pro' }
      ]
    },
    rating: 4.8,
    downloads: '88M+',
    isTrending: true
  },
  {
    id: 'tableau-desktop',
    name: 'Tableau Desktop (Corporate BI)',
    description: 'Licensed enterprise business intelligence and executive visual analytics platform for connecting to corporate data warehouses and KPIs.',
    category: 'productivity',
    website: 'https://www.tableau.com/products/desktop',
    license: 'Commercial License (Enterprise Subscription)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Tableau.Desktop', installCmd: 'winget install --id Tableau.Desktop -e' },
        { manager: 'choco', packageId: 'tableau-desktop', installCmd: 'choco install tableau-desktop -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'tableau', installCmd: 'brew install --cask tableau' }
      ]
    },
    rating: 4.8,
    downloads: '24M+',
    isTrending: true
  },
  {
    id: 'intellij-idea-ultimate',
    name: 'JetBrains IntelliJ IDEA Ultimate',
    description: 'Licensed corporate flagship IDE for enterprise Java, Kotlin, Spring Boot, microservices, and database engineering teams.',
    category: 'development',
    website: 'https://www.jetbrains.com/idea/',
    license: 'Commercial License (Corporate Subscription)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'JetBrains.IntelliJIDEA.Ultimate', installCmd: 'winget install --id JetBrains.IntelliJIDEA.Ultimate -e' },
        { manager: 'choco', packageId: 'intellijidea-ultimate', installCmd: 'choco install intellijidea-ultimate -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'intellij-idea', installCmd: 'brew install --cask intellij-idea' }
      ],
      linux: [
        { manager: 'snap', packageId: 'intellij-idea-ultimate', installCmd: 'sudo snap install intellij-idea-ultimate --classic' }
      ]
    },
    rating: 4.9,
    downloads: '34M+',
    isTrending: true
  },
  {
    id: 'beyond-compare',
    name: 'Beyond Compare Pro (Corporate License)',
    description: 'Licensed corporate utility for fast 3-way folder, source code, Excel spreadsheet, and SFTP server comparison and merging.',
    category: 'development',
    website: 'https://www.scootersoftware.com/',
    license: 'Commercial License (Perpetual / Corporate)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'ScooterSoftware.BeyondCompare.4', installCmd: 'winget install --id ScooterSoftware.BeyondCompare.4 -e' },
        { manager: 'choco', packageId: 'beyondcompare', installCmd: 'choco install beyondcompare -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'beyond-compare', installCmd: 'brew install --cask beyond-compare' }
      ],
      linux: [
        { manager: 'apt', packageId: 'bcompare', installCmd: 'sudo apt update && sudo apt install -y meld' }
      ]
    },
    rating: 4.9,
    downloads: '16M+',
    isTrending: false
  },
  {
    id: '1password-enterprise',
    name: '1Password for Enterprise & Corporate',
    description: 'Licensed corporate password and enterprise secrets manager with SSO integration, admin audit policies, and SSH agent.',
    category: 'security',
    website: 'https://1password.com/business',
    license: 'Commercial License (Enterprise Subscription)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'AgileBits.1Password', installCmd: 'winget install --id AgileBits.1Password -e' },
        { manager: 'choco', packageId: '1password', installCmd: 'choco install 1password -y' }
      ],
      macos: [
        { manager: 'brew', packageId: '1password', installCmd: 'brew install --cask 1password' }
      ],
      linux: [
        { manager: 'snap', packageId: '1password', installCmd: 'sudo snap install 1password' },
        { manager: 'flatpak', packageId: 'com.onepassword.OnePassword', installCmd: 'flatpak install flathub com.onepassword.OnePassword -y' }
      ]
    },
    rating: 4.9,
    downloads: '31M+',
    isTrending: true
  },
  {
    id: 'techsmith-snagit',
    name: 'TechSmith Snagit (Corporate License)',
    description: 'Licensed corporate office screen capture, step-by-step SOP documentation generator, and annotated video walkthrough software.',
    category: 'productivity',
    website: 'https://www.techsmith.com/screen-capture.html',
    license: 'Commercial License (Corporate / Perpetual)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'TechSmith.Snagit.2024', installCmd: 'winget install --id TechSmith.Snagit.2024 -e' },
        { manager: 'choco', packageId: 'snagit', installCmd: 'choco install snagit -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'snagit', installCmd: 'brew install --cask snagit' }
      ]
    },
    rating: 4.8,
    downloads: '22M+',
    isTrending: false
  },
  {
    id: 'winrar-corporate',
    name: 'WinRAR Corporate Edition',
    description: 'Licensed corporate archive manager supporting RAR5, ZIP, AES-256 encryption, self-extracting SFX archives, and recovery volumes.',
    category: 'utilities',
    website: 'https://www.win-rar.com/',
    license: 'Commercial License (Trial / Corporate)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'RARLab.WinRAR', installCmd: 'winget install --id RARLab.WinRAR -e' },
        { manager: 'choco', packageId: 'winrar', installCmd: 'choco install winrar -y' }
      ]
    },
    rating: 4.8,
    downloads: '140M+',
    isTrending: false
  },
  {
    id: 'sublime-merge',
    name: 'Sublime Merge (Corporate License)',
    description: 'High-performance licensed Git client with integrated 3-way merge tool, line-by-line staging, and blame history for corporate repos.',
    category: 'development',
    website: 'https://www.sublimemerge.com/',
    license: 'Commercial License (Evaluation / Corporate)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'SublimeHQ.SublimeMerge', installCmd: 'winget install --id SublimeHQ.SublimeMerge -e' },
        { manager: 'choco', packageId: 'sublimemerge', installCmd: 'choco install sublimemerge -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'sublime-merge', installCmd: 'brew install --cask sublime-merge' }
      ],
      linux: [
        { manager: 'snap', packageId: 'sublime-merge', installCmd: 'sudo snap install sublime-merge --classic' }
      ]
    },
    rating: 4.8,
    downloads: '11M+',
    isTrending: false
  },
  {
    id: 'vmware-workstation-pro',
    name: 'VMware Workstation Pro',
    description: 'Enterprise-grade desktop hypervisor for running multiple isolated Windows and Linux virtual machines, snapshots, and virtual networks.',
    category: 'utilities',
    website: 'https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion',
    license: 'Freeware / Commercial Enterprise License',
    platforms: ['windows', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'VMware.WorkstationPro', installCmd: 'winget install --id VMware.WorkstationPro -e' },
        { manager: 'choco', packageId: 'vmwareworkstation', installCmd: 'choco install vmwareworkstation -y' }
      ],
      linux: [
        { manager: 'apt', packageId: 'virtualbox', installCmd: 'sudo apt update && sudo apt install -y virtualbox' }
      ]
    },
    rating: 4.8,
    downloads: '45M+',
    isTrending: true
  },

  // --- CORPORATE OFFICE FREEWARE & ENTERPRISE WORKSTATION TOOLS ---
  {
    id: 'microsoft-powerbi-desktop',
    name: 'Microsoft Power BI Desktop',
    description: 'Official Microsoft corporate freeware business intelligence, SQL/Excel data modeling, and interactive executive dashboard authoring tool.',
    category: 'productivity',
    website: 'https://powerbi.microsoft.com/en-us/desktop/',
    license: 'Freeware (Corporate / Enterprise)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Microsoft.PowerBI', installCmd: 'winget install --id Microsoft.PowerBI -e' },
        { manager: 'choco', packageId: 'powerbi', installCmd: 'choco install powerbi -y' }
      ]
    },
    rating: 4.9,
    downloads: '72M+',
    isTrending: true
  },
  {
    id: 'cisco-webex',
    name: 'Cisco Webex Enterprise',
    description: 'Corporate office video conferencing, cloud calling, webinar hosting, whiteboarding, and secure enterprise team messaging client.',
    category: 'internet',
    website: 'https://www.webex.com/',
    license: 'Freeware / Commercial Enterprise License',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Cisco.WebexTeams', installCmd: 'winget install --id Cisco.WebexTeams -e' },
        { manager: 'choco', packageId: 'webex-teams', installCmd: 'choco install webex-teams -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'webex', installCmd: 'brew install --cask webex' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'com.cisco.Webex', installCmd: 'flatpak install flathub com.cisco.Webex -y' }
      ]
    },
    rating: 4.7,
    downloads: '68M+',
    isTrending: true
  },
  {
    id: 'zoom-workplace',
    name: 'Zoom Workplace Enterprise',
    description: 'Corporate HD video conferencing, enterprise cloud phone, team chat, AI companion meeting summaries, and conference room connector.',
    category: 'internet',
    website: 'https://zoom.us/',
    license: 'Freeware / Commercial Enterprise License',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Zoom.Zoom', installCmd: 'winget install --id Zoom.Zoom -e' },
        { manager: 'choco', packageId: 'zoom', installCmd: 'choco install zoom -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'zoom', installCmd: 'brew install --cask zoom' }
      ],
      linux: [
        { manager: 'flatpak', packageId: 'us.zoom.Zoom', installCmd: 'flatpak install flathub us.zoom.Zoom -y' },
        { manager: 'snap', packageId: 'zoom-client', installCmd: 'sudo snap install zoom-client' }
      ]
    },
    rating: 4.8,
    downloads: '180M+',
    isTrending: true
  },
  {
    id: 'forticlient-vpn',
    name: 'FortiClient Corporate VPN',
    description: 'Corporate SSL and IPsec VPN freeware client for encrypted remote office connectivity to enterprise FortiGate firewalls.',
    category: 'security',
    website: 'https://www.fortinet.com/support/product-downloads',
    license: 'Freeware (Corporate VPN)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Fortinet.FortiClientVPN', installCmd: 'winget install --id Fortinet.FortiClientVPN -e' },
        { manager: 'choco', packageId: 'forticlientvpn', installCmd: 'choco install forticlientvpn -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'forticlient-vpn', installCmd: 'brew install --cask forticlient-vpn' }
      ],
      linux: [
        { manager: 'apt', packageId: 'openfortivpn', installCmd: 'sudo apt update && sudo apt install -y openfortivpn' }
      ]
    },
    rating: 4.6,
    downloads: '35M+',
    isTrending: false
  },
  {
    id: 'openvpn-connect',
    name: 'OpenVPN Connect Enterprise',
    description: 'Official corporate zero-trust VPN and OpenVPN Access Server desktop client with SAML SSO and hardware token support.',
    category: 'security',
    website: 'https://openvpn.net/client/',
    license: 'Freeware (Corporate / Enterprise)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'OpenVPNTechnologies.OpenVPNConnect', installCmd: 'winget install --id OpenVPNTechnologies.OpenVPNConnect -e' },
        { manager: 'choco', packageId: 'openvpn-connect', installCmd: 'choco install openvpn-connect -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'openvpn-connect', installCmd: 'brew install --cask openvpn-connect' }
      ],
      linux: [
        { manager: 'apt', packageId: 'openvpn', installCmd: 'sudo apt update && sudo apt install -y openvpn' }
      ]
    },
    rating: 4.8,
    downloads: '44M+',
    isTrending: false
  },
  {
    id: 'tailscale-enterprise',
    name: 'Tailscale Corporate Mesh VPN',
    description: 'Zero-config WireGuard corporate mesh VPN that connects enterprise workstations, cloud VPCs, and internal office resources via SSO.',
    category: 'security',
    website: 'https://tailscale.com/',
    license: 'Freeware / Commercial Enterprise License',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Tailscale.Tailscale', installCmd: 'winget install --id Tailscale.Tailscale -e' },
        { manager: 'choco', packageId: 'tailscale', installCmd: 'choco install tailscale -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'tailscale', installCmd: 'brew install --cask tailscale' }
      ],
      linux: [
        { manager: 'apt', packageId: 'tailscale', installCmd: 'curl -fsSL https://tailscale.com/install.sh | sh' }
      ]
    },
    rating: 4.9,
    downloads: '18M+',
    isTrending: true
  },
  {
    id: 'citrix-workspace',
    name: 'Citrix Workspace Enterprise VDI',
    description: 'Corporate digital workspace client providing secure unified access to enterprise virtual desktops, internal web apps, and SaaS tools.',
    category: 'utilities',
    website: 'https://www.citrix.com/downloads/workspace-app/',
    license: 'Freeware (Corporate Enterprise)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Citrix.Workspace', installCmd: 'winget install --id Citrix.Workspace -e' },
        { manager: 'choco', packageId: 'citrix-workspace', installCmd: 'choco install citrix-workspace -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'citrix-workspace', installCmd: 'brew install --cask citrix-workspace' }
      ],
      linux: [
        { manager: 'apt', packageId: 'remmina', installCmd: 'sudo apt update && sudo apt install -y remmina' }
      ]
    },
    rating: 4.6,
    downloads: '55M+',
    isTrending: false
  },
  {
    id: 'winscp-corporate',
    name: 'WinSCP Corporate SFTP & S3 Client',
    description: 'Popular corporate Windows SFTP, SCP, FTP, WebDAV, and Amazon S3 client with PowerShell automation and directory synchronization.',
    category: 'utilities',
    website: 'https://winscp.net/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'WinSCP.WinSCP', installCmd: 'winget install --id WinSCP.WinSCP -e' },
        { manager: 'choco', packageId: 'winscp', installCmd: 'choco install winscp -y' }
      ]
    },
    rating: 4.9,
    downloads: '39M+',
    isTrending: false
  },
  {
    id: 'putty-corporate',
    name: 'PuTTY & Pageant Corporate SSH Suite',
    description: 'Lightweight corporate SSH/Telnet terminal, PSCP/PSFTP file transfer, PuTTYgen key generator, and Pageant SSH authentication agent.',
    category: 'development',
    website: 'https://www.chiark.greenend.org.uk/~sgtatham/putty/',
    license: 'Freeware (MIT)',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'PuTTY.PuTTY', installCmd: 'winget install --id PuTTY.PuTTY -e' },
        { manager: 'choco', packageId: 'putty', installCmd: 'choco install putty -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'putty', installCmd: 'brew install putty' }
      ],
      linux: [
        { manager: 'apt', packageId: 'putty', installCmd: 'sudo apt update && sudo apt install -y putty' }
      ]
    },
    rating: 4.8,
    downloads: '62M+',
    isTrending: false
  },
  {
    id: 'greenshot',
    name: 'Greenshot Office Screenshot Tool',
    description: 'Corporate office screenshot freeware with instant sensitive-data obfuscation and 1-click export to Jira, Confluence, Outlook, and Word.',
    category: 'productivity',
    website: 'https://getgreenshot.org/',
    license: 'Freeware (GPL-3.0)',
    platforms: ['windows'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Greenshot.Greenshot', installCmd: 'winget install --id Greenshot.Greenshot -e' },
        { manager: 'choco', packageId: 'greenshot', installCmd: 'choco install greenshot -y' }
      ]
    },
    rating: 4.8,
    downloads: '27M+',
    isTrending: false
  },
  {
    id: 'miro-desktop',
    name: 'Miro Corporate Whiteboard',
    description: 'Visual corporate collaboration workspace for agile sprint planning, product roadmaps, enterprise architecture, and team workshops.',
    category: 'productivity',
    website: 'https://miro.com/apps/',
    license: 'Freeware / Commercial Enterprise License',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'RealtimeBoard.Miro', installCmd: 'winget install --id RealtimeBoard.Miro -e' },
        { manager: 'choco', packageId: 'miro', installCmd: 'choco install miro -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'miro', installCmd: 'brew install --cask miro' }
      ]
    },
    rating: 4.8,
    downloads: '29M+',
    isTrending: true
  },
  {
    id: 'clickup-desktop',
    name: 'ClickUp Corporate Work Hub',
    description: 'All-in-one corporate office project management app combining tasks, Gantt charts, OKR goals, whiteboards, time tracking, and docs.',
    category: 'productivity',
    website: 'https://clickup.com/download',
    license: 'Freeware / Commercial Enterprise License',
    platforms: ['windows', 'macos', 'linux'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'ClickUp.ClickUp', installCmd: 'winget install --id ClickUp.ClickUp -e' }
      ],
      macos: [
        { manager: 'brew', packageId: 'clickup', installCmd: 'brew install --cask clickup' }
      ],
      linux: [
        { manager: 'snap', packageId: 'clickup', installCmd: 'sudo snap install clickup' }
      ]
    },
    rating: 4.7,
    downloads: '16M+',
    isTrending: true
  },
  {
    id: 'asana-desktop',
    name: 'Asana Enterprise Work Management',
    description: 'Corporate work management desktop app helping cross-functional office teams orchestrate projects, quarterly OKRs, and workflows.',
    category: 'productivity',
    website: 'https://asana.com/download',
    license: 'Freeware / Commercial Enterprise License',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Asana.Asana', installCmd: 'winget install --id Asana.Asana -e' }
      ],
      macos: [
        { manager: 'brew', packageId: 'asana', installCmd: 'brew install --cask asana' }
      ]
    },
    rating: 4.7,
    downloads: '19M+',
    isTrending: false
  },
  {
    id: 'trello-desktop',
    name: 'Trello Atlassian Kanban Client',
    description: 'Visual corporate Kanban board application by Atlassian for organizing office workflows, sprint backlogs, and team tasks.',
    category: 'productivity',
    website: 'https://trello.com/platforms',
    license: 'Freeware / Commercial Enterprise License',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Atlassian.Trello', installCmd: 'winget install --id Atlassian.Trello -e' }
      ],
      macos: [
        { manager: 'brew', packageId: 'trello', installCmd: 'brew install --cask trello' }
      ]
    },
    rating: 4.7,
    downloads: '24M+',
    isTrending: false
  },
  {
    id: 'loom-desktop',
    name: 'Loom Corporate Video Messaging',
    description: 'Async corporate screen and camera recorder for sharing instant video walkthroughs, code reviews, and executive updates.',
    category: 'productivity',
    website: 'https://www.loom.com/desktop',
    license: 'Freeware / Commercial Enterprise License',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Loom.Loom', installCmd: 'winget install --id Loom.Loom -e' }
      ],
      macos: [
        { manager: 'brew', packageId: 'loom', installCmd: 'brew install --cask loom' }
      ]
    },
    rating: 4.8,
    downloads: '17M+',
    isTrending: true
  },
  {
    id: 'sourcetree-enterprise',
    name: 'Atlassian Sourcetree',
    description: 'Corporate freeware Git and Mercurial desktop GUI client integrating seamlessly with Bitbucket Enterprise, GitHub, and GitLab.',
    category: 'development',
    website: 'https://www.sourcetreeapp.com/',
    license: 'Freeware (Atlassian Corporate)',
    platforms: ['windows', 'macos'],
    commands: {
      windows: [
        { manager: 'winget', packageId: 'Atlassian.Sourcetree', installCmd: 'winget install --id Atlassian.Sourcetree -e' },
        { manager: 'choco', packageId: 'sourcetree', installCmd: 'choco install sourcetree -y' }
      ],
      macos: [
        { manager: 'brew', packageId: 'sourcetree', installCmd: 'brew install --cask sourcetree' }
      ]
    },
    rating: 4.7,
    downloads: '21M+',
    isTrending: false
  }
];

export const SYSTEM_CHECK_RULES: SystemCheckRule[] = [
  // --- WINDOWS RULES ---
  {
    id: 'win-winget',
    title: 'Verify Winget CLI availability',
    description: 'Check if the modern Windows Package Manager (winget) is pre-configured and accessible.',
    platform: 'windows',
    checkCommand: 'winget --version',
    remedyCommand: 'explorer "https://github.com/microsoft/winget-cli/releases"'
  },
  {
    id: 'win-choco',
    title: 'Verify Chocolatey availability',
    description: 'Check if Chocolatey package manager is installed on your local Windows terminal.',
    platform: 'windows',
    checkCommand: 'choco --version',
    remedyCommand: 'Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://community.chocolatey.org/install.ps1\'))'
  },
  {
    id: 'win-admin',
    title: 'Test for Admin elevation',
    description: 'Verify if the terminal environment runs with elevated Administrator privileges.',
    platform: 'windows',
    checkCommand: '([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)',
    remedyCommand: 'Start-Process powershell -Verb runAs'
  },

  // --- MACOS RULES ---
  {
    id: 'mac-brew',
    title: 'Verify Homebrew setup',
    description: 'Verify if Homebrew (brew) is present in the standard user environment paths.',
    platform: 'macos',
    checkCommand: 'brew --version',
    remedyCommand: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
  },
  {
    id: 'mac-xcode',
    title: 'Check Xcode Command Line Tools',
    description: 'Ensure standard compiling and system configuration runtimes are active.',
    platform: 'macos',
    checkCommand: 'xcode-select -p',
    remedyCommand: 'xcode-select --install'
  },
  {
    id: 'mac-rosetta',
    title: 'Verify Rosetta 2 (Apple Silicon)',
    description: 'Ensure emulation support is configured on Apple Silicon hardware for legacy tools.',
    platform: 'macos',
    checkCommand: 'arch',
    remedyCommand: 'softwareupdate --install-rosetta --agree-to-license'
  },

  // --- LINUX RULES ---
  {
    id: 'lin-apt',
    title: 'Verify APT package engine',
    description: 'Check if Advanced Package Tool (apt) is active on the host Linux distribution.',
    platform: 'linux',
    checkCommand: 'apt-get --version',
  },
  {
    id: 'lin-flatpak',
    title: 'Verify Flatpak availability',
    description: 'Check if Flatpak is configured for sandboxed, cross-distro package management.',
    platform: 'linux',
    checkCommand: 'flatpak --version',
    remedyCommand: 'sudo apt update && sudo apt install -y flatpak'
  },
  {
    id: 'lin-snap',
    title: 'Verify Snapd availability',
    description: 'Check if snapd is active for automated background package updates.',
    platform: 'linux',
    checkCommand: 'snap --version',
    remedyCommand: 'sudo apt update && sudo apt install -y snapd'
  }
];
